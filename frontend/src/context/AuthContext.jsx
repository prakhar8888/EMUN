"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  signupUser,
  getCurrentUser,
  getToken,
  setToken,
  removeToken,
} from "@/services/authService";

const AuthContext = createContext();


// ======================================
// AUTH PROVIDER
// ======================================
export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // ======================================
  // LOAD USER ON APP START
  // ======================================
  useEffect(() => {

    const loadUser = async () => {

      try {

        const token =
          getToken();

        if (!token) {
          setLoading(false);
          return;
        }

        const response =
          await getCurrentUser(
            token
          );

        setUser(
          response.user
        );

      } catch (error) {

        console.error(
          "[AuthContext] Load User Error:",
          error.message
        );

        removeToken();

        setUser(null);

      } finally {

        setLoading(false);
      }
    };

    loadUser();

  }, []);


  // ======================================
  // LOGIN
  // ======================================
  const login = async (
    email,
    password
  ) => {

    try {

      const response =
        await loginUser({
          email,
          password,
        });

      const {
        token,
        user,
      } = response;

      setToken(token);

      setUser(user);

      return {
        success: true,
        user,
      };

    } catch (error) {

      return {
        success: false,
        message:
          error.message ||
          "Login failed",
      };
    }
  };


  // ======================================
  // SIGNUP
  // ======================================
  const signup = async (
    formData
  ) => {

    try {

      const response =
        await signupUser(
          formData
        );

      const {
        token,
        user,
      } = response;

      setToken(token);

      setUser(user);

      return {
        success: true,
        user,
      };

    } catch (error) {

      return {
        success: false,
        message:
          error.message ||
          "Signup failed",
      };
    }
  };


  // ======================================
  // LOGOUT
  // ======================================
  const logout = () => {

    removeToken();

    setUser(null);
  };


  // ======================================
  // ROLE HELPERS
  // ======================================
  const isAdmin =
    user?.role === "ADMIN";

  const isSecretariat =
    user?.role === "SECRETARIAT";

  const isDelegate =
    user?.role === "DELEGATE";


  return (

    <AuthContext.Provider
      value={{

        user,
        setUser,

        loading,

        login,
        signup,
        logout,

        isAuthenticated:
          !!user,

        isAdmin,
        isSecretariat,
        isDelegate,

      }}
    >

      {children}

    </AuthContext.Provider>
  );
};


// ======================================
// USE AUTH
// ======================================
export const useAuth = () =>
  useContext(AuthContext);
