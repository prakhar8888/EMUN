/**
 * About Service
 * Handles API requests related to the platform's history, mission, and core values.
 */

import { BASE_URL } from "@/lib/api";

export const aboutService = {
  /**
   * Fetches the official about content for the frontend UI.
   */
  getAboutContent: async () => {
    try {
      // Appending '/about' directly to the BASE_URL based on your backend routes
      const response = await fetch(`${BASE_URL}/about`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to retrieve about content");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching about content:", error);
      throw error;
    }
  },

  /**
   * Optional: Update about content (typically restricted to Admin/Secretariat)
   */
  updateAboutContent: async (contentData) => {
    try {
      const response = await fetch(`${BASE_URL}/about`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contentData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to update about content");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating about content:", error);
      throw error;
    }
  }
};

export default aboutService;
