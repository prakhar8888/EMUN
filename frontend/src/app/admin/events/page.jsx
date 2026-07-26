"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  MapPin,
  Loader2,
  X,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";

import ProtectedRoute from "../../../components/common/ProtectedRoute";
import { useRouter } from "next/navigation";
import eventsService from "../../../services/eventsService";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export default function AdminEventsPage() {
  const router = useRouter();

  // ======================================
  // STATE MANAGEMENT
  // ======================================
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const initialFormState = {
    title: "",
    slug: "",
    description: "",
    location: "",
    highlight: "",
    startDate: "",
    endDate: "",
    bannerUrl: "",
    isPublished: true,
  };

  const [formData, setFormData] = useState(initialFormState);

  // ======================================
  // FETCH EVENTS ON LOAD
  // ======================================
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventsService.getAllEvents();
      if (response && response.success) {
        setEvents(response.data || []);
      } else {
        throw new Error(response.message || "Failed to fetch events");
      }
    } catch (err) {
      console.error("Fetch Events Error:", err);
      setError(err.message || "An error occurred while loading events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ======================================
  // FORM HELPERS
  // ======================================
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().slice(0, 10);
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: !editingEvent
        ? value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
        : prev.slug
    }));
  };

  const handleOpenCreate = () => {
    setEditingEvent(null);
    setFormData(initialFormState);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || "",
      slug: event.slug || "",
      description: event.description || "",
      location: event.location || "",
      highlight: event.highlight || "",
      startDate: formatDateForInput(event.startDate),
      endDate: formatDateForInput(event.endDate),
      bannerUrl: event.bannerUrl || "",
      isPublished: event.isPublished ?? true,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setFormData(initialFormState);
    setFormError(null);
  };

  // ======================================
  // CRUD ACTIONS
  // ======================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      setFormError("End date must be after start date.");
      return;
    }

    try {
      setSubmitting(true);
      let response;

      if (editingEvent) {
        response = await eventsService.updateEvent(editingEvent.id, formData);
      } else {
        response = await eventsService.createEvent(formData);
      }

      if (response && response.success) {
        await fetchEvents();
        handleCloseModal();
      } else {
        throw new Error(response.message || "Operation failed.");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      setFormError(err.message || "Failed to save event. Please verify your inputs.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (eventId, title) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`);
    if (!confirmed) return;

    try {
      const response = await eventsService.deleteEvent(eventId);
      if (response && response.success) {
        setEvents((prev) => prev.filter((event) => event.id !== eventId));
      } else {
        alert(response.message || "Failed to delete event.");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("An error occurred while deleting the event.");
    }
  };

  return (
    <ProtectedRoute adminOnly={true} requiredPermission="canManageEvents">
      <div className="relative min-h-screen overflow-hidden pb-24">

        <AnimatedBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <button
                onClick={() => router.push("/admin")}
                className="inline-flex items-center gap-2 text-[#7D8793] hover:text-[#C9A227] transition-colors text-sm font-medium mb-4"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Command Center
              </button>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#C9A227] to-[#D4AF37] shadow-xl">
                  <CalendarDays className="w-8 h-8 text-[#090909]" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#F5F2E8]">
                    Event <span className="gradient-text">Management</span>
                  </h1>
                  <p className="text-[#7D8793] text-sm md:text-base">
                    Create, edit, and organize upcoming MUN conferences and diplomatic schedules.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl btn-gradient font-bold transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Create New Event
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-8 p-6 rounded-2xl bg-[#5C1F24]/15 border border-[#7A263A] flex items-center justify-between text-[#C97A87]">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
              <button onClick={fetchEvents} className="underline text-sm font-bold hover:text-[#F5F2E8]">Retry</button>
            </div>
          )}

          {/* Events Grid / Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center p-24 rounded-[32px] border border-[#2A2A2A] bg-[#111111]">
              <Loader2 className="w-10 h-10 animate-spin text-[#C9A227] mb-4" />
              <p className="text-[#7D8793] font-medium">Loading conference events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-24 rounded-[32px] border border-[#2A2A2A] bg-[#111111] p-8">
              <CalendarDays className="w-16 h-16 text-[#7D8793] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#F5F2E8] mb-2">No Events Published Yet</h3>
              <p className="text-[#7D8793] max-w-md mx-auto mb-8">
                Your conference schedule is currently empty. Get started by creating your first Model United Nations event.
              </p>
              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#161616] hover:bg-[#1A1A1A] text-[#F5F2E8] font-bold border border-[#2C2C2C] transition-all"
              >
                <Plus className="w-5 h-5" /> Create First Event
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-[#2A2A2A] bg-[#111111] overflow-hidden flex flex-col justify-between hover:border-[#C9A227]/30 transition-all duration-300 group"
                >
                  <div className="p-6">
                    {/* Status Badge & Actions */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                        event.isPublished
                          ? "bg-[#1B4332]/20 border-[#234F41] text-[#8FCBAE]"
                          : "bg-[#B08D57]/10 border-[#B08D57]/30 text-[#B08D57]"
                      }`}>
                        {event.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        {event.isPublished ? "Published" : "Draft"}
                      </span>

                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenEdit(event)}
                          className="p-2 rounded-lg bg-[#161616] hover:bg-[#C9A227]/15 text-[#C8CDD5] hover:text-[#C9A227] transition-colors"
                          title="Edit Event"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id, event.title)}
                          className="p-2 rounded-lg bg-[#161616] hover:bg-[#5C1F24]/20 text-[#C8CDD5] hover:text-[#C97A87] transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Title & Slug */}
                    <h3 className="text-xl font-bold text-[#F5F2E8] mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-xs font-mono text-[#C9A227] mb-4">/{event.slug}</p>

                    {/* Description */}
                    <p className="text-[#C8CDD5] text-sm line-clamp-3 mb-6 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Footer Info */}
                  <div className="px-6 py-4 bg-[#0D0D0D] border-t border-[#2A2A2A] space-y-2 text-xs text-[#7D8793]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C9A227] shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-[#C9A227] shrink-0" />
                      <span>
                        {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>

        {/* ======================================
            CREATE / EDIT MODAL
        ====================================== */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-2xl glass rounded-3xl p-6 md:p-8 shadow-2xl my-8"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2A2A2A]">
                  <h2 className="text-2xl font-black text-[#F5F2E8]">
                    {editingEvent ? "Edit Conference Event" : "Create New Event"}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 rounded-full bg-[#161616] hover:bg-[#1A1A1A] text-[#7D8793] hover:text-[#F5F2E8] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {formError && (
                  <div className="mb-6 p-4 rounded-xl bg-[#5C1F24]/15 border border-[#7A263A] text-[#C97A87] text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#7D8793] mb-2">
                        Event Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={handleTitleChange}
                        placeholder="e.g. Enigma MUN Global Summit 2026"
                        className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#2C2C2C] text-[#F5F2E8] focus:outline-none focus:border-[#C9A227] transition-colors text-sm"
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#7D8793] mb-2">
                        URL Slug *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="enigmamun-global-summit-2026"
                        className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#2C2C2C] text-[#C8CDD5] font-mono text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7D8793] mb-2">
                      Location / Venue *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. UN Headquarters, Geneva (or Virtual)"
                      className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#2C2C2C] text-[#F5F2E8] focus:outline-none focus:border-[#C9A227] transition-colors text-sm"
                    />
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#7D8793] mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#2C2C2C] text-[#F5F2E8] focus:outline-none focus:border-[#C9A227] transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#7D8793] mb-2">
                        End Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#2C2C2C] text-[#F5F2E8] focus:outline-none focus:border-[#C9A227] transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Highlight */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7D8793] mb-2">
                      Highlight Tag (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.highlight}
                      onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                      placeholder="e.g. Flagship Conference, Limited Seats"
                      className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#2C2C2C] text-[#F5F2E8] focus:outline-none focus:border-[#C9A227] transition-colors text-sm"
                    />
                  </div>

                  {/* Banner URL */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7D8793] mb-2">
                      Banner Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.bannerUrl}
                      onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#2C2C2C] text-[#F5F2E8] focus:outline-none focus:border-[#C9A227] transition-colors text-sm"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7D8793] mb-2">
                      Description *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Provide detailed conference agendas, committee lists, and requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#2C2C2C] text-[#F5F2E8] focus:outline-none focus:border-[#C9A227] transition-colors text-sm resize-none"
                    />
                  </div>

                  {/* Published Toggle */}
                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="isPublished"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="w-5 h-5 rounded border-[#2C2C2C] text-[#C9A227] focus:ring-0 bg-[#161616] cursor-pointer"
                    />
                    <label htmlFor="isPublished" className="text-sm text-[#C8CDD5] font-medium cursor-pointer">
                      Publish event immediately to the public website
                    </label>
                  </div>

                  {/* Submit Actions */}
                  <div className="flex items-center justify-end gap-4 pt-6 border-t border-[#2A2A2A]">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-6 py-3 rounded-xl bg-[#161616] hover:bg-[#1A1A1A] text-[#C8CDD5] font-bold text-sm transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-gradient font-bold text-sm disabled:opacity-50"
                    >
                      {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                      {editingEvent ? "Save Changes" : "Create Event"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </ProtectedRoute>
  );
}
