/**
 * Feedback Service
 * Handles API requests for submitting and retrieving delegate feedback.
 */

import { API_ENDPOINTS } from "@/lib/api";

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
      // In a fully authenticated app, you would attach your JWT token in these headers
      const response = await fetch(API_ENDPOINTS.FEEDBACK.GET_ALL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
  }
};

export default feedbackService;
