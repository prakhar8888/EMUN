/**
 * Events & Schedule Service
 * Handles API requests related to the conference itinerary, sessions, and timing.
 */

import { API_ENDPOINTS, buildQueryString } from "@/lib/api";

export const eventsService = {
  /**
   * Fetches all events, optionally filtered by provided parameters.
   * @param {Object} filters - Optional filters (e.g., { type: 'committee', venue: 'Main Hall' })
   */
  getAllEvents: async (filters = {}) => {
    try {
      const query = buildQueryString(filters);
      const response = await fetch(`${API_ENDPOINTS.EVENTS.GET_ALL}${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to fetch the conference schedule.");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  /**
   * Fetches events specifically scheduled for a given date.
   * @param {string} date - The date string (e.g., 'YYYY-MM-DD')
   */
  getEventsByDate: async (date) => {
    try {
      const response = await fetch(API_ENDPOINTS.EVENTS.GET_BY_DATE(date), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Failed to fetch events for date: ${date}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching events for ${date}:`, error);
      throw error;
    }
  }
};

export default eventsService;
