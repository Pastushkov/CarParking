import React, { createContext, useContext, useState } from "react";

interface RootStateCtx {
  rootState: any;
  setRootState: (state: any) => void;
}

interface Props {
  children: React.ReactNode;
}

const RootStateContext = createContext<RootStateCtx | null>(null);

export const RootStateProvier = ({ children }: Props) => {
  const [rootState, setRootState] = useState(null);

  return (
    <RootStateContext.Provider
      value={{
        rootState,
        setRootState,
      }}
    >
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootState = () => {
  const context = useContext(RootStateContext);
  if (!context) {
    throw new Error("error related to context");
  }
  return context;
};
