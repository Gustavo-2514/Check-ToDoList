import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";

export const Context = createContext();

export default function ContextProvider({ children }) {
  const {
    authenticated,
    login,
    register,
    logout,
    createChecklist,
    updateChecklist,
    deleteChecklist,
    createTask,
    updateTask,
    updateDone,
    deleteTask,
  } = useAuth();
  return (
    <Context.Provider
      value={{
        authenticated,
        login,
        register,
        logout,
        createChecklist,
        updateChecklist,
        deleteChecklist,
        createTask,
        updateTask,
        updateDone,
        deleteTask,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useContextProvider = () => useContext(Context);
