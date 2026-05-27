"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  apiRequest,
  API_ENDPOINTS,
} from "../lib/api";

import {
  loginUser,
  signupUser,
} from "../services/authService";

const AuthContext =
  createContext();


// ======================================
// AUTH PROVIDER
// ======================================

export const AuthProvider = ({
  children,
}) => {

  // ======================================
  // STATES
  // ======================================

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // ======================================
  // LOAD CURRENT USER
  // ======================================

  useEffect(() => {

    const loadUser =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          // NO TOKEN
          if (!token) {

            setLoading(false);

            return;
          }

          // FETCH CURRENT USER
          const data =
            await apiRequest(
              `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/auth/me`,
              {
                token,
              }
            );

          setUser(data.user);

        } catch (error) {

          console.error(
            "Load User Error:",
            error
          );

          localStorage.removeItem(
            "token"
          );

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

      const data =
        await loginUser({
          email,
          password,
        });

      // STORE TOKEN
      localStorage.setItem(
        "token",
        data.token
      );

      // UPDATE USER
      setUser(data.user);

      return {
        success: true,
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

      const data =
        await signupUser(
          formData
        );

      // STORE TOKEN
      localStorage.setItem(
        "token",
        data.token
      );

      // UPDATE USER
      setUser(data.user);

      return {
        success: true,
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

    localStorage.removeItem(
      "token"
    );

    setUser(null);
  };


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
