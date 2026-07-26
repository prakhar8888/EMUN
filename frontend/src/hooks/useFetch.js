"use client";

import {
  useState,
  useCallback,
} from "react";

/**
 * =========================================================
 * Production-Ready useFetch Hook
 * =========================================================
 * Handles:
 * - Loading state
 * - Error handling
 * - JSON parsing
 * - Authorization headers
 * - Request cancellation
 * - REST helper methods
 */

export default function useFetch(
  defaultUrl = ""
) {

  const [data, setData] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  /**
   * =========================================================
   * MAIN EXECUTE FUNCTION
   * =========================================================
   */
  const execute = useCallback(
    async (
      endpoint = "",
      options = {}
    ) => {

      setIsLoading(true);

      setError(null);

      try {

        /* =========================
           BUILD FINAL URL
        ========================= */
        const url =
          endpoint.startsWith("http")
            ? endpoint
            : `${defaultUrl}${endpoint}`;

        /* =========================
           REQUEST HEADERS
        ========================= */
        const headers = {
          "Content-Type":
            "application/json",

          ...options.headers,
        };

        /* =========================
           AUTH TOKEN SUPPORT
        ========================= */
        // Matches the key name used everywhere else in the app
        // (AuthContext, apiRequest, all admin pages) - this was
        // previously "munsphere_token", a leftover key name that
        // nothing in the real login flow ever wrote to.
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem(
                "token"
              )
            : null;

        if (token) {
          headers.Authorization =
            `Bearer ${token}`;
        }

        /* =========================
           REQUEST CONFIG
        ========================= */
        const config = {
          method:
            options.method || "GET",

          headers,

          signal:
            options.signal,

          ...options,
        };

        /* =========================
           AUTO STRINGIFY BODY
        ========================= */
        if (
          options.body &&
          typeof options.body === "object"
        ) {
          config.body =
            JSON.stringify(options.body);
        }

        /* =========================
           FETCH REQUEST
        ========================= */
        const response =
          await fetch(url, config);

        /* =========================
           CONTENT TYPE CHECK
        ========================= */
        const contentType =
          response.headers.get(
            "content-type"
          );

        let responseData;

        if (
          contentType &&
          contentType.includes(
            "application/json"
          )
        ) {
          responseData =
            await response.json();
        }
        else {
          responseData =
            await response.text();
        }

        /* =========================
           HANDLE API ERRORS
        ========================= */
        if (!response.ok) {

          const errorMessage =
            responseData?.message ||
            responseData?.error ||
            `HTTP Error ${response.status}`;

          throw new Error(errorMessage);
        }

        /* =========================
           SUCCESS
        ========================= */
        setData(responseData);

        return {
          data: responseData,
          error: null,
        };

      }
      catch (err) {

        // Ignore abort errors
        if (
          err.name === "AbortError"
        ) {
          return;
        }

        const errorMessage =
          err instanceof Error
            ? err.message
            : "Unexpected error occurred.";

        console.error(
          "useFetch Error:",
          errorMessage
        );

        setError(errorMessage);

        return {
          data: null,
          error: errorMessage,
        };
      }
      finally {
        setIsLoading(false);
      }
    },
    [defaultUrl]
  );

  /* =========================================================
     REST HELPERS
  ========================================================= */

  const get = useCallback(
    (
      endpoint,
      options = {}
    ) =>
      execute(endpoint, {
        ...options,
        method: "GET",
      }),
    [execute]
  );

  const post = useCallback(
    (
      endpoint,
      body,
      options = {}
    ) =>
      execute(endpoint, {
        ...options,
        method: "POST",
        body,
      }),
    [execute]
  );

  const put = useCallback(
    (
      endpoint,
      body,
      options = {}
    ) =>
      execute(endpoint, {
        ...options,
        method: "PUT",
        body,
      }),
    [execute]
  );

  const del = useCallback(
    (
      endpoint,
      options = {}
    ) =>
      execute(endpoint, {
        ...options,
        method: "DELETE",
      }),
    [execute]
  );

  /* =========================================================
     RETURN API
  ========================================================= */
  return {
    data,

    isLoading,

    error,

    setError,

    setData,

    execute,

    get,

    post,

    put,

    del,
  };
}
