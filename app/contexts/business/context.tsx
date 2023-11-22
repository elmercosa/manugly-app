import * as React from "react";

type Action = { type: "set"; data: any } | { type: "setBusinesses"; data: any };
type Dispatch = (action: Action) => void;
type State = {
  business: {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    colour: string;
    createdAt: string;
    updatedAt: string;
    ownerId: string;
  };
};
type BusinessProviderProps = { children: React.ReactNode };

let initialState = {
  id: "",
  name: "",
  address: "",
  phone: "",
  email: "",
  colour: "",
  createdAt: "",
  updatedAt: "",
  ownerId: "",
};

let name = "business";
let collection = "businesses";

const BusinessStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function businessReducer(state: State, action: Action) {
  switch (action.type) {
    case "set": {
      localStorage.setItem(name, JSON.stringify(action.data));
      return { business: action.data };
    }
    case "setBusinesses": {
      localStorage.setItem(collection, JSON.stringify(action.data));
      return { business: state.business };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function BusinessProvider({ children }: BusinessProviderProps) {
  const [state, dispatch] = React.useReducer(businessReducer, {
    business: initialState,
  });

  React.useEffect(() => {
    let businessFromStorage = localStorage.getItem(name);
    let businessesFromStorage = localStorage.getItem(collection);

    if (businessFromStorage !== null) {
      initialState = JSON.parse(businessFromStorage);
      dispatch({ type: "set", data: initialState });
    }

    if (businessesFromStorage !== null) {
      let businesses = JSON.parse(businessesFromStorage);
      dispatch({ type: "setBusinesses", data: businesses });
    }
  }, []);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <BusinessStateContext.Provider value={value}>
      {children}
    </BusinessStateContext.Provider>
  );
}

function useBusiness() {
  const context = React.useContext(BusinessStateContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { BusinessProvider, useBusiness };
