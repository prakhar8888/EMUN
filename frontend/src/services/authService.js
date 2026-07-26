"use client";

import {
  apiRequest,
  API_ENDPOINTS,
} from "../lib/api";

// ======================================
// LOGIN USER
// ======================================

export const loginUser = async ({
  email,
  password,
}) => {
  try {
    const response = await apiRequest(
      API_ENDPOINTS.AUTH.LOGIN,
      {
        method: "POST",
        body: {
          email,
          password,
        },
      }
    );

    return response;
  } catch (error) {
    console.error(
      "[AuthService] Login Error:",
      error?.message
    );

    throw new Error(
      error?.message ||
      "Login failed"
    );
  }
};

// ======================================
// SIGNUP USER
// ======================================

export const signupUser = async (
  formData
) => {
  try {
    const response = await apiRequest(
      API_ENDPOINTS.AUTH.SIGNUP,
      {
        method: "POST",
        body: formData,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "[AuthService] Signup Error:",
      error?.message
    );

    throw new Error(
      error?.message ||
      "Signup failed"
    );
  }
};

// ======================================
// GET CURRENT USER
// ======================================

export const getCurrentUser = async (
  token
) => {
  try {
    const response = await apiRequest(
      API_ENDPOINTS.AUTH.ME,
      {
        method: "GET",
        token,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "[AuthService] Get User Error:",
      error?.message
    );

    throw new Error(
      error?.message ||
      "Failed to load user"
    );
  }
};

// ======================================
// TOKEN HELPERS
// ======================================

export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(
    "token"
  );
};

export const setToken = (
  token
) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    "token",
    token
  );
};

export const removeToken = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(
    "token"
  );
};
