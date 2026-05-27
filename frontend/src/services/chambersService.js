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

import {
  API_ENDPOINTS,
} from "../lib/api";


// =========================================================
// CHAMBERS SERVICE
// =========================================================

export const chambersService = {

  // ======================================
  // GET ALL CHAMBERS
  // ======================================

  getAllChambers:
    async () => {

      try {

        const response =
          await fetch(
            API_ENDPOINTS.CHAMBERS.GET_ALL,
            {
              method: "GET",

              headers: {
                "Content-Type":
                  "application/json",
              },
            }
          );


        if (!response.ok) {

          const errorData =
            await response
              .json()
              .catch(
                () => null
              );

          throw new Error(
            errorData?.message ||

            "Failed to fetch chambers."
          );
        }


        return await response.json();

      } catch (error) {

        console.error(
          "Error fetching chambers:",
          error
        );

        throw error;
      }
    },


  // ======================================
  // GET CHAMBER BY ID
  // ======================================

  getChamberById:
    async (id) => {

      try {

        const response =
          await fetch(
            API_ENDPOINTS.CHAMBERS.GET_BY_ID(
              id
            ),
            {
              method: "GET",

              headers: {
                "Content-Type":
                  "application/json",
              },
            }
          );


        if (!response.ok) {

          const errorData =
            await response
              .json()
              .catch(
                () => null
              );

          throw new Error(

            errorData?.message ||

            `Failed to fetch chamber with ID: ${id}`
          );
        }


        return await response.json();

      } catch (error) {

        console.error(
          `Error fetching chamber ${id}:`,
          error
        );

        throw error;
      }
    },


  // ======================================
  // DOWNLOAD GUIDE
  // ======================================

  downloadBackgroundGuide:
    async (id) => {

      try {

        const response =
          await fetch(
            API_ENDPOINTS.CHAMBERS.DOWNLOAD_GUIDE(
              id
            ),
            {
              method: "GET",
            }
          );


        if (!response.ok) {

          throw new Error(
            "Background guide download failed."
          );
        }


        const blob =
          await response.blob();

        const url =
          window.URL.createObjectURL(
            blob
          );


        const a =
          document.createElement(
            "a"
          );

        a.href = url;

        a.download =
          `Background_Guide_${id}.pdf`;

        document.body.appendChild(
          a
        );

        a.click();

        a.remove();

        window.URL.revokeObjectURL(
          url
        );


        return true;

      } catch (error) {

        console.error(
          `Error downloading guide for chamber ${id}:`,
          error
        );

        throw error;
      }
    },
};


export default chambersService;
