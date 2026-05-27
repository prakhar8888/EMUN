/**
 * Connect & Dispatch Service
 * Handles API requests for formal contact submissions, inquiries, and dispatch messages to the Secretariat.
 */

import { API_ENDPOINTS } from "@/lib/api";

export const connectService = {
  /**
   * Submits a formal dispatch/contact form to the backend.
   * @param {Object} dispatchData - The form data (name, email, subject, message, department, etc.)
   */
  submitDispatch: async (dispatchData) => {
    try {
      const response = await fetch(API_ENDPOINTS.CONTACT.SUBMIT_DISPATCH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dispatchData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to submit your dispatch. Please try again later.");
      }

      return await response.json();
    } catch (error) {
      console.error("Error submitting dispatch:", error);
      throw error;
    }
  }
};

export default connectService;
