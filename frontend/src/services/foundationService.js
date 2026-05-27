/**
 * Foundation Service
 * Handles API requests related to the Secretariat, foundation members, and leadership profiles.
 */

import { API_ENDPOINTS } from "@/lib/api";

export const foundationService = {
  /**
   * Fetches all public profiles for the Foundation and Secretariat.
   */
  getAllProfiles: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.FOUNDATION.GET_ALL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to fetch foundation profiles.");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching foundation profiles:", error);
      throw error;
    }
  },

  /**
   * Fetches detailed information for a specific foundation member by their ID.
   * @param {string} id - The ID of the foundation member.
   */
  getProfileById: async (id) => {
    try {
      const response = await fetch(API_ENDPOINTS.FOUNDATION.GET_BY_ID(id), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Failed to fetch profile for ID: ${id}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching profile ${id}:`, error);
      throw error;
    }
  }
};

export default foundationService;
