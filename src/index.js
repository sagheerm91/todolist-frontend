import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./store/tokenStore";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <>
  <GoogleOAuthProvider 
  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
  <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
  </GoogleOAuthProvider>
    
  </>

  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
