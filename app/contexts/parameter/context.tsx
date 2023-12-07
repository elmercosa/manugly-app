import * as React from "react";

type Action =
  | { type: "set"; data: any }
  | { type: "add"; data: any }
  | { type: "setIsSaving"; index: number }
  | { type: "setParamData"; title: any; key: any; index: number }
  | { type: "setIsValid"; index: number; isValid: boolean }
  | { type: "setIsValidated"; index: number; isValidated: boolean }
  | { type: "setError"; index: number; hasErrors: boolean }
  | { type: "remove"; index: number }
  | { type: "setValue"; index: number; value: any };
type Dispatch = (action: Action) => void;
export type ParamsType = {
  param: any;
  data: any;
  isValid: boolean;
  isValidated: boolean;
  isSaving: boolean;
  hasError: boolean;
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
    case "setIsSaving": {
      let params = state.parameters;
      if (params[action.index]) {
        params[action.index].isSaving = !params[action.index].isSaving;
      }
      return { parameters: params };
    }
    case "setParamData": {
      let params = state.parameters;
      if (params[action.index]) {
        params[action.index].data.title = action.title;
        params[action.index].data.key = action.key;
      }
      return { parameters: params };
    }
    case "setIsValid": {
      let params = state.parameters;
      if (params[action.index]) {
        params[action.index].isValid = action.isValid;
      }
      return { parameters: params };
    }
    case "setIsValidated": {
      let params = state.parameters;
      if (params[action.index]) {
        params[action.index].isValidated = action.isValidated;
      }
      return { parameters: params };
    }
    case "setError": {
      let params = state.parameters;
      if (params[action.index]) {
        params[action.index].hasError = action.hasErrors;
      }
      return { parameters: params };
    }
    case "remove": {
      return {
        parameters: state.parameters.filter(
          (value, index) => index != action.index,
        ),
      };
    }
    case "setValue": {
      let params = state.parameters;
      if (params[action.index]) {
        params[action.index].data.value = action.value;
      }
      return { parameters: params };
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
      // initialState = JSON.parse(dataFromStorage);
      // dispatch({ type: "set", data: initialState });
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
