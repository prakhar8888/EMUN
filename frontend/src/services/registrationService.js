import {
  apiRequest,
  API_ENDPOINTS,
} from "../lib/api";


// ======================================
// CREATE REGISTRATION
// ======================================

export const createRegistration =
  async (data) => {

    const token =
      localStorage.getItem(
        "token"
      );

    return apiRequest(
      API_ENDPOINTS.REGISTRATIONS.CREATE,
      {
        method: "POST",

        body: data,

        token,
      }
    );
  };


// ======================================
// GET MY REGISTRATIONS
// ======================================

export const getRegistrations =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    return apiRequest(
      API_ENDPOINTS.REGISTRATIONS.GET_ALL,
      {
        token,
      }
    );
  };


// ======================================
// GET SINGLE REGISTRATION
// ======================================

export const getRegistrationById =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      );

    return apiRequest(
      API_ENDPOINTS.REGISTRATIONS.GET_BY_ID(
        id
      ),
      {
        token,
      }
    );
  };


// ======================================
// DELETE REGISTRATION
// ======================================

export const deleteRegistration =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      );

    return apiRequest(
      API_ENDPOINTS.REGISTRATIONS.DELETE(
        id
      ),
      {
        method: "DELETE",

        token,
      }
    );
  };
