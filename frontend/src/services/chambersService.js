/**
 * =========================================================
 * Chambers Service
 * =========================================================
 * Handles API requests related to:
 * - committees
 * - chambers
 * - background guides
 * =========================================================
 */

import { API_ENDPOINTS } from "../lib/api";

// Import auth service to get the token for protected admin routes
import { getToken } from "./authService";

export const chambersService = {
  // ======================================
  // GET ALL CHAMBERS (Public & Admin)
  // ======================================
  getAllChambers: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CHAMBERS.GET_ALL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to fetch chambers.");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching chambers:", error);
      throw error;
    }
  },

  // ======================================
  // GET CHAMBER BY ID (Public & Admin)
  // ======================================
  getChamberById: async (id) => {
    try {
      const response = await fetch(API_ENDPOINTS.CHAMBERS.GET_BY_ID(id), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Failed to fetch chamber with ID: ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching chamber ${id}:`, error);
      throw error;
    }
  },

  // ======================================
  // CREATE CHAMBER (Admin Only)
  // ======================================
  createChamber: async (chamberData) => {
    try {
      const response = await fetch(API_ENDPOINTS.CHAMBERS.GET_ALL, { // Assuming base URL is the same for POST
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(chamberData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to create chamber.");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating chamber:", error);
      throw error;
    }
  },

  // ======================================
  // UPDATE CHAMBER (Admin Only)
  // ======================================
  updateChamber: async (id, chamberData) => {
    try {
      const response = await fetch(API_ENDPOINTS.CHAMBERS.GET_BY_ID(id), { // ID endpoint is usually the PUT target
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(chamberData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to update chamber.");
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating chamber:", error);
      throw error;
    }
  },

  // ======================================
  // DELETE CHAMBER (Admin Only)
  // ======================================
  deleteChamber: async (id) => {
    try {
      const response = await fetch(API_ENDPOINTS.CHAMBERS.GET_BY_ID(id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to delete chamber.");
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting chamber:", error);
      throw error;
    }
  },

  // ======================================
  // DOWNLOAD GUIDE
  // ======================================
  downloadBackgroundGuide: async (id) => {
    try {
      const response = await fetch(API_ENDPOINTS.CHAMBERS.DOWNLOAD_GUIDE(id), {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Background guide download failed.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Background_Guide_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error(`Error downloading guide for chamber ${id}:`, error);
      throw error;
    }
  },
};

export default chambersService;
