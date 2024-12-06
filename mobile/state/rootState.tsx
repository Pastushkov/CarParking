import React, { createContext, useContext, useState } from "react";
import { Client } from "../types";
import { ProfileService } from "../services/profileService";

interface RootStateCtx {
  rootState: any;
  setRootState: (state: any) => void;
}

interface Props {
  children: React.ReactNode;
}

const RootStateContext = createContext<RootStateCtx | null>(null);

export const RootStateProvier = ({ children }: Props) => {
  const [rootState, setRootState] = useState({
    fetchMe: async () => {
      try {
        const { client, parkingSession } = await ProfileService.fetchMe();
        setRootState((state) => ({
          ...state,
          client,
          parkingSession,
        }));
      } catch (error) {}
    },
  });

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
