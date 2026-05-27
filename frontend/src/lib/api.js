/**
 * =========================================================
 * MUNSphere Central API Registry
 * =========================================================
 * Centralized backend communication layer.
 * Prevents hardcoded URLs across components.
 * Makes deployment & scaling easier.
 * =========================================================
 */


// =========================================================
// BASE API URL
// =========================================================

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";


// =========================================================
// GENERIC API REQUEST HELPER
// =========================================================

export async function apiRequest(
  endpoint,
  {
    method = "GET",
    body = null,
    token = null,
    headers = {},
  } = {}
) {

  try {

    const config = {

      method,

      headers: {
        "Content-Type":
          "application/json",

        ...headers,
      },

      cache: "no-store",
    };


    // ======================================
    // ATTACH JWT TOKEN
    // ======================================

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }


    // ======================================
    // ATTACH REQUEST BODY
    // ======================================

    if (body) {

      config.body =
        JSON.stringify(body);
    }


    // ======================================
    // API REQUEST
    // ======================================

    const response =
      await fetch(
        endpoint,
        config
      );


    // ======================================
    // PARSE RESPONSE
    // ======================================

    const data =
      await response.json();


    // ======================================
    // HANDLE ERRORS
    // ======================================

    if (!response.ok) {

      throw new Error(
        data.message ||
        "Something went wrong."
      );
    }


    return data;

  } catch (error) {

    console.error(
      "API Request Error:",
      error.message
    );

    throw error;
  }
}


// =========================================================
// API ENDPOINTS
// =========================================================

export const API_ENDPOINTS = {

  // ======================================
  // AUTH
  // ======================================

  AUTH: {

    LOGIN:
      `${API_BASE_URL}/auth/login`,

    SIGNUP:
      `${API_BASE_URL}/auth/signup`,

    ME:
      `${API_BASE_URL}/auth/me`,
  },


  // ======================================
  // FOUNDATION
  // ======================================

  FOUNDATION: {

    GET_ALL:
      `${API_BASE_URL}/foundation`,

    GET_BY_ID: (id) =>
      `${API_BASE_URL}/foundation/${id}`,
  },


  // ======================================
  // CHAMBERS
  // ======================================

  CHAMBERS: {

    GET_ALL:
      `${API_BASE_URL}/chambers`,

    GET_BY_ID: (id) =>
      `${API_BASE_URL}/chambers/${id}`,

    DOWNLOAD_GUIDE: (id) =>
      `${API_BASE_URL}/chambers/${id}/guide`,
  },


  // ======================================
  // EVENTS
  // ======================================

  EVENTS: {

    GET_ALL:
      `${API_BASE_URL}/events`,

    GET_BY_ID: (id) =>
      `${API_BASE_URL}/events/${id}`,

    GET_BY_DATE: (date) =>
      `${API_BASE_URL}/events?date=${date}`,
  },


  // ======================================
  // REGISTRATIONS
  // ======================================

  REGISTRATIONS: {

    CREATE:
      `${API_BASE_URL}/registrations`,

    GET_ALL:
      `${API_BASE_URL}/registrations`,

    GET_BY_ID: (id) =>
      `${API_BASE_URL}/registrations/${id}`,

    DELETE: (id) =>
      `${API_BASE_URL}/registrations/${id}`,
  },


  // ======================================
  // FEEDBACK
  // ======================================

  FEEDBACK: {

    SUBMIT:
      `${API_BASE_URL}/feedback`,

    GET_ALL:
      `${API_BASE_URL}/feedback`,
  },


  // ======================================
  // CONTACT
  // ======================================

  CONTACT: {

    SUBMIT_DISPATCH:
      `${API_BASE_URL}/contact`,
  },
};


// =========================================================
// QUERY STRING BUILDER
// =========================================================

export function buildQueryString(
  params = {}
) {

  const filteredParams =
    Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) =>

          value !== undefined &&
          value !== null &&
          value !== ""
      )
    );


  const query =
    new URLSearchParams(
      filteredParams
    ).toString();


  return query
    ? `?${query}`
    : "";
}
