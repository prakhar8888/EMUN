import { apiRequest, API_ENDPOINTS } from "../lib/api";

// ======================================
// GET CONNECT PAGE INFO (Public)
// ======================================
export const getConnectInfo = async () => {
  return apiRequest(API_ENDPOINTS.CONTACT.GET_INFO);
};

// ======================================
// SUBMIT CONTACT MESSAGE (Public)
// ======================================
export const submitContactMessage = async (formData) => {
  return apiRequest(API_ENDPOINTS.CONTACT.SUBMIT_DISPATCH, {
    method: "POST",
    body: formData,
  });
};

// ======================================
// GET ALL CONTACT MESSAGES (Admin)
// ======================================
export const getAllContactMessages = async () => {
  const token = localStorage.getItem("token");
  return apiRequest(API_ENDPOINTS.CONTACT.GET_ALL_MESSAGES, {
    token,
  });
};

// ======================================
// DELETE CONTACT MESSAGE (Admin)
// ======================================
export const deleteContactMessage = async (id) => {
  const token = localStorage.getItem("token");
  return apiRequest(API_ENDPOINTS.CONTACT.DELETE_MESSAGE(id), {
    method: "DELETE",
    token,
  });
};
