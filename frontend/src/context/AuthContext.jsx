"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

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
  // API BASE URL
  // ======================================

  const API_URL =
    "http://localhost:5000/api/v1/auth";


  // ======================================
  // LOAD USER ON APP START
  // ======================================

  useEffect(() => {

    const loadUser = async () => {

      try {

        const token =
          localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response =
          await axios.get(
            `${API_URL}/me`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setUser(response.data.user);

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

      const response =
        await axios.post(
          `${API_URL}/login`,
          {
            email,
            password,
          }
        );

      const {
        token,
        user,
      } = response.data;

      localStorage.setItem(
        "token",
        token
      );

      setUser(user);

      return {
        success: true,
      };

    } catch (error) {

      return {
        success: false,

        message:
          error.response?.data
            ?.message ||
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
        await axios.post(
          `${API_URL}/signup`,
          formData
        );

      const {
        token,
        user,
      } = response.data;

      localStorage.setItem(
        "token",
        token
      );

      setUser(user);

      return {
        success: true,
      };

    } catch (error) {

      return {
        success: false,

        message:
          error.response?.data
            ?.message ||
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

        login,
        signup,
        logout,

        loading,

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
