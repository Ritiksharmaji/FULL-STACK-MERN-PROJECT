import React, { createContext, useState, useEffect } from "react";

import { registerUser, loginUser } from "../services/api";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");


  useEffect(() => {
    console.log(`AuthContext useEffect executed`);
    console.log(`token in AuthCOntext:${token}`);
    // console.log(`User details in AuthContext:${user}`);
    console.log(`User details in AuthContext: ${JSON.stringify(user, null, 2)}`);


    // if (token) {
    //   localStorage.setItem("token", token);
    //   localStorage.setItem("user", JSON.stringify(user));
      
    // } 
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
    else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);  


  const register = async (newUser) => {
    try {
      // console.log(`New User in register function: ${newUser}`);
      // console.log(`New User in register function: ${newUser.username}, 
      //   ${newUser.email}, ${newUser.password}`);
      console.log(`New User in register function: ${JSON.stringify(newUser, null, 2)}`);

      const { data } = await registerUser(newUser);
      console.log(data.message);
      return data.message;
      
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      return false;
    }
  };


  const login = async (credentials) => {
    try {
      const { data } = await loginUser(credentials);
      console.log(`response from login: ${data}`);
      console.log(`response from token: ${data.token}`);

      // setToken(data.token);

      if (data.token) {
        setToken(data.token);
      }

      // setUser({
      //   username: data.user.username,
      //   email: data.user.email,
      //   id: data.user._id,
      //   password: data.user.password,
      // });
      setUser({
        username: data.user.username,
        email: data.user.email,
        id: data.user._id,
        password: data.user.password, // password is not a good idea to store in state
      });
      
      return data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };



  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;