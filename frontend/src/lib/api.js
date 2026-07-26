/**
 * =========================================================
 * Enigma MUN Central API Registry
 * =========================================================
 * Centralized backend communication layer.
 * Prevents hardcoded URLs across components.
 * Makes deployment and scaling easier.
 * =========================================================
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return {};
    }
  }

  try {
    const text = await response.text();
    return text ? { message: text } : {};
  } catch {
    return {};
  }
}

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
        Accept: "application/json",
        ...headers,
      },
      cache: "no-store",
    };

    if (body !== null && body !== undefined) {
      config.headers["Content-Type"] = "application/json";
      config.body = JSON.stringify(body);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(endpoint, config);
    const data = await parseResponse(response);

    if (!response.ok) {
      throw new Error(
        data?.message || data?.error || "Something went wrong."
      );
    }

    return data;
  } catch (error) {
    console.error("API Request Error:", error?.message || error);
    throw error;
  }
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    ME: `${API_BASE_URL}/auth/me`,

    STAFF_LIST: `${API_BASE_URL}/auth/staff`,
    STAFF_APPROVE: (id) => `${API_BASE_URL}/auth/staff/${id}/approve`,
    STAFF_REVOKE: (id) => `${API_BASE_URL}/auth/staff/${id}/revoke`,

    // Password reset (3-step, public)
    PASSWORD_RESET_REQUEST: `${API_BASE_URL}/auth/password-reset/request`,
    PASSWORD_RESET_VERIFY: `${API_BASE_URL}/auth/password-reset/verify`,
    PASSWORD_RESET_CONFIRM: `${API_BASE_URL}/auth/password-reset/confirm`,

    // Email change (2-step, requires login)
    EMAIL_CHANGE_REQUEST: `${API_BASE_URL}/auth/email-change/request`,
    EMAIL_CHANGE_CONFIRM: `${API_BASE_URL}/auth/email-change/confirm`,
  },

  FOUNDATION: {
    GET_ALL: `${API_BASE_URL}/foundation`,
    GET_BY_ID: (id) => `${API_BASE_URL}/foundation/${id}`,
  },

  CHAMBERS: {
    GET_ALL: `${API_BASE_URL}/chambers`,
    GET_BY_ID: (id) => `${API_BASE_URL}/chambers/${id}`,
    DOWNLOAD_GUIDE: (id) => `${API_BASE_URL}/chambers/${id}/guide`,
  },

  EVENTS: {
    GET_ALL: `${API_BASE_URL}/events`,
    GET_BY_SLUG: (slug) => `${API_BASE_URL}/events/${slug}`,
    GET_BY_DATE: (date) => `${API_BASE_URL}/events?date=${encodeURIComponent(date)}`,
    CREATE: `${API_BASE_URL}/events`,
    UPDATE: (id) => `${API_BASE_URL}/events/${id}`,
    DELETE: (id) => `${API_BASE_URL}/events/${id}`,
  },

  REGISTRATIONS: {
    CREATE: `${API_BASE_URL}/registrations`,
    GET_MINE: `${API_BASE_URL}/registrations/my`,
    GET_ALL: `${API_BASE_URL}/registrations`,
    GET_BY_ID: (id) => `${API_BASE_URL}/registrations/${id}`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/registrations/${id}/status`,
    DELETE: (id) => `${API_BASE_URL}/registrations/${id}`,
  },

  FEEDBACK: {
    SUBMIT: `${API_BASE_URL}/feedback`,
    GET_ALL: `${API_BASE_URL}/feedback`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/feedback/${id}`,
    DELETE: (id) => `${API_BASE_URL}/feedback/${id}`,
  },

  CONTACT: {
    GET_INFO: `${API_BASE_URL}/connect`,
    SUBMIT_DISPATCH: `${API_BASE_URL}/connect/message`,
    GET_ALL_MESSAGES: `${API_BASE_URL}/connect/messages`,
    DELETE_MESSAGE: (id) => `${API_BASE_URL}/connect/messages/${id}`,
  },
};

export function buildQueryString(params = {}) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== ""
    )
  );

  const query = new URLSearchParams(filteredParams).toString();
  return query ? `?${query}` : "";
}
