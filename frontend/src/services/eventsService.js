import { API_ENDPOINTS, buildQueryString, apiRequest } from "@/lib/api";
import { getToken } from "@/services/authService";

export const eventsService = {
  getAllEvents: async (filters = {}) => {
    // Ensure we are referencing the static string property correctly
    const endpoint = API_ENDPOINTS.EVENTS.GET_ALL;
    const query = buildQueryString(filters);
    return await apiRequest(`${endpoint}${query}`);
  },

  getEventBySlug: async (slug) => {
    // Ensure we are calling the function correctly
    return await apiRequest(API_ENDPOINTS.EVENTS.GET_BY_SLUG(slug));
  },

  createEvent: async (eventData) => {
    return await apiRequest(API_ENDPOINTS.EVENTS.CREATE, {
      method: "POST",
      token: getToken(),
      body: eventData,
    });
  },

  updateEvent: async (eventId, eventData) => {
    return await apiRequest(API_ENDPOINTS.EVENTS.UPDATE(eventId), {
      method: "PUT",
      token: getToken(),
      body: eventData,
    });
  },

  deleteEvent: async (eventId) => {
    return await apiRequest(API_ENDPOINTS.EVENTS.DELETE(eventId), {
      method: "DELETE",
      token: getToken(),
    });
  },
};

export default eventsService;
