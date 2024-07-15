import { useContext, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const storeToken = async(token) => {
    return localStorage.setItem("token", token);
  };

  const storeUser = async(userInfo) => {
    return localStorage.setItem("user", JSON.stringify(userInfo));
  };

  const checkLogIn=()=>{
    // console.log("i am called");
    return localStorage.getItem("token") ? true :false;
  }


  const checkAdmin = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.isAdmin;
    }
    return false;
  };

  const LogoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ storeToken, LogoutUser, checkLogIn, storeUser, checkAdmin }}>
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
