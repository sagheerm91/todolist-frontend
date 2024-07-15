import { useContext, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const storeToken = async(token) => {
    return localStorage.setItem("token", token);
  };

  const checkLogIn=()=>{
    // console.log("i am called");
    return localStorage.getItem("token") ? true :false;
  }

 

  const LogoutUser = () => {
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ storeToken, LogoutUser, checkLogIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const AuthContextValue = useContext(AuthContext);
  if (!AuthContextValue) {
    throw new Error("useAuth used outside of Provider");
  }
  return AuthContextValue;
};
