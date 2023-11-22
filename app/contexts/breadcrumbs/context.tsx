import * as React from "react";

type Action = { type: "set"; data: any };
type Dispatch = (action: Action) => void;
type State = {
  breadcrumb: string;
};
type BreadcrumbProviderProps = { children: React.ReactNode };

let initialState: "Inicio";
let name = "breadcrumb";

const BreadcrumbStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function breadcrumbReducer(state: State, action: Action) {
  switch (action.type) {
    case "set": {
      return { breadcrumb: action.data };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

function BreadcrumbProvider({ children }: BreadcrumbProviderProps) {
  const [state, dispatch] = React.useReducer(breadcrumbReducer, {
    breadcrumb: initialState,
  });

  React.useEffect(() => {
    let dataFromStorage = localStorage.getItem(name);

    // if (dataFromStorage !== null) {
    //   initialState = JSON.parse(dataFromStorage);
    //   dispatch({ type: "set", data: initialState });
    // }
  }, []);
  const value = { state, dispatch };
  return (
    <BreadcrumbStateContext.Provider value={value}>
      {children}
    </BreadcrumbStateContext.Provider>
  );
}

function useBreadcrumb() {
  const context = React.useContext(BreadcrumbStateContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { BreadcrumbProvider, useBreadcrumb };
