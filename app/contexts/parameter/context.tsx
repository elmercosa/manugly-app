import * as React from "react";

type Action = { type: "set"; data: any } | { type: "add"; data: any };
type Dispatch = (action: Action) => void;
export type ParamsType = {
  param: any;
  data: any;
  isValid: boolean;
  isValidated: boolean;
  isSaved: boolean;
};
type State = {
  parameters: ParamsType[];
};
type ParameterProviderProps = { children: React.ReactNode };

let initialState: ParamsType[] = [];
let name = "parameters";

const ParameterStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function parameterReducer(state: State, action: Action) {
  switch (action.type) {
    case "set": {
      return { parameters: action.data };
    }
    case "add": {
      let parameter: ParamsType = action.data;
      state.parameters.push(parameter);
      return { parameters: state.parameters };
    }
    default: {
      throw new Error(`Unhandled action type`);
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
