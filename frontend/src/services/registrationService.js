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
// GET ALL REGISTRATIONS (ADMIN)
// ======================================
export const getAllRegistrations =
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
// UPDATE REGISTRATION STATUS (ADMIN)
// ======================================
// status must be "APPROVED" or "REJECTED"
export const updateRegistrationStatus =
  async (id, status) => {
    const token =
      localStorage.getItem(
        "token"
      );
    return apiRequest(
      API_ENDPOINTS.REGISTRATIONS.UPDATE_STATUS(
        id
      ),
      {
        method: "PATCH",
        body: { status },
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
