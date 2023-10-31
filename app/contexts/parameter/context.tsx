import * as React from "react";

type Action = { type: "set"; data: any } | { type: "decrement"; data: any };
type Dispatch = (action: Action) => void;
type Params = {
  param: any;
  data: any;
};
type State = {
  parameters: Params[];
};
type ParameterProviderProps = { children: React.ReactNode };

let initialState: Params[] = [];
let name = "parameters";

const ParameterStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function parameterReducer(state: State, action: Action) {
  switch (action.type) {
    case "set": {
      localStorage.setItem(name, JSON.stringify(action.data));
      return { parameters: action.data };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ParameterProvider({ children }: ParameterProviderProps) {
  const [state, dispatch] = React.useReducer(parameterReducer, {
    parameters: initialState,
  });

  React.useEffect(() => {
    let dataFromStorage = localStorage.getItem(name);

    if (dataFromStorage !== null) {
      initialState = JSON.parse(dataFromStorage);
      dispatch({ type: "set", data: initialState });
    }
  }, []);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <ParameterStateContext.Provider value={value}>
      {children}
    </ParameterStateContext.Provider>
  );
}

function useParameters() {
  const context = React.useContext(ParameterStateContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { ParameterProvider, useParameters };
