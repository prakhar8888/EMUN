/**
 * Feedback Service
 * Handles API requests for submitting, retrieving, updating, and deleting delegate feedback.
 */

import { API_ENDPOINTS } from "@/lib/api";
import { getToken } from "./authService";

export const feedbackService = {
  /**
   * Submits delegate feedback to the backend.
   * @param {Object} feedbackData - The feedback payload (e.g., name, rating, comment)
   */
  submitFeedback: async (feedbackData) => {
    try {
      const response = await fetch(API_ENDPOINTS.FEEDBACK.SUBMIT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to submit feedback. Please try again.");
      }

      return await response.json();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      throw error;
    }
  },

  /**
   * Fetches all feedback (Restricted to Admin / Secretariat).
   */
  getAllFeedback: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.FEEDBACK.GET_ALL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to fetch feedback.");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching feedback:", error);
      throw error;
    }
  },

  /**
   * Updates the status of a feedback entry, e.g. marking it as REVIEWED.
   * (Restricted to Admin / Secretariat)
   * @param {string|number} id - The feedback entry's ID.
   * @param {string} status - The new status (e.g. "REVIEWED", "PENDING").
   */
  updateFeedbackStatus: async (id, status) => {
    try {
      const response = await fetch(API_ENDPOINTS.FEEDBACK.UPDATE_STATUS(id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to update feedback status.");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating feedback status:", error);
      throw error;
    }
  },

  /**
   * Deletes a feedback entry. (Restricted to Admin / Secretariat)
   * @param {string|number} id - The feedback entry's ID.
   */
  deleteFeedback: async (id) => {
    try {
      const response = await fetch(API_ENDPOINTS.FEEDBACK.DELETE(id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to delete feedback.");
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting feedback:", error);
      throw error;
    }
  },
};

export default feedbackService;
