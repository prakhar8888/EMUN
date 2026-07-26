"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  Loader2,
  X,
  AlertCircle,
  FileText,
} from "lucide-react";

import ProtectedRoute from "../../../components/common/ProtectedRoute";
import { useRouter } from "next/navigation";
import chambersService from "../../../services/chambersService";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export default function AdminChambersPage() {
  const router = useRouter();

  const [chambers, setChambers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChamber, setEditingChamber] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const initialFormState = {
    name: "",
    slug: "",
    agenda: "",
    description: "",
    iconUrl: "",
    backgroundGuideUrl: "",
    isPublished: true,
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchChambers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await chambersService.getAllChambers();
      if (response && response.success) {
        setChambers(response.data || []);
      } else {
        throw new Error(response?.message || "Failed to fetch chambers");
      }
    } catch (err) {
      console.error("Fetch Chambers Error:", err);
      setError(err.message || "An error occurred while loading committees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChambers();
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: !editingChamber
        ? value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
        : prev.slug,
    }));
  };

  const handleOpenCreate = () => {
    setEditingChamber(null);
    setFormData(initialFormState);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (chamber) => {
    setEditingChamber(chamber);
    setFormData({
      name: chamber.name || "",
      slug: chamber.slug || "",
      agenda: chamber.agenda || "",
      description: chamber.description || "",
      iconUrl: chamber.iconUrl || "",
      backgroundGuideUrl: chamber.backgroundGuideUrl || "",
      isPublished: chamber.isPublished ?? true,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingChamber(null);
    setFormData(initialFormState);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    try {
      setSubmitting(true);
      let response;

      if (editingChamber) {
        response = await chambersService.updateChamber(editingChamber.id, formData);
      } else {
        response = await chambersService.createChamber(formData);
      }

      if (response && response.success) {
        await fetchChambers();
        handleCloseModal();
      } else {
        throw new Error(response?.message || "Operation failed.");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      setFormError(err.message || "Failed to save committee. Please verify your inputs.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (chamberId, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      const response = await chambersService.deleteChamber(chamberId);
      if (response && response.success) {
        setChambers((prev) => prev.filter((c) => c.id !== chamberId));
      } else {
        alert(response?.message || "Failed to delete committee.");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert(err.message || "An error occurred while deleting the committee.");
    }
  };

  return (
    <ProtectedRoute adminOnly={true} requiredPermission="canManageCommittees">
      <div className="relative min-h-screen overflow-hidden pb-24">

        <AnimatedBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28">

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
                  <Building2 className="w-8 h-8 text-[#090909]" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#F5F2E8]">
                    Committee <span className="gradient-text">Control</span>
                  </h1>
                  <p className="text-[#7D8793] text-sm md:text-base">
                    Manage committees, agendas, and background guides.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl btn-gradient font-bold transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Create New Committee
            </button>
          </div>

          {error && (
            <div className="mb-8 p-6 rounded-2xl bg-[#5C1F24]/15 border border-[#7A263A] flex items-center justify-between text-[#C97A87]">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
              <button onClick={fetchChambers} className="underline text-sm font-bold hover:text-[#F5F2E8]">
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center p-24 rounded-[32px] border border-[#2A2A2A] bg-[#111111]">
              <Loader2 className="w-10 h-10 animate-spin text-[#C9A227] mb-4" />
              <p className="text-[#7D8793] font-medium">Loading committees...</p>
            </div>
          ) : chambers.length === 0 ? (
            <div className="text-center py-24 rounded-[32px] border border-[#2A2A2A] bg-[#111111] p-8">
              <Building2 className="w-16 h-16 text-[#7D8793] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#F5F2E8] mb-2">No Committees Yet</h3>
              <p className="text-[#7D8793] max-w-md mx-auto mb-8">
                Get started by creating your first committee.
              </p>
              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#161616] hover:bg-[#1A1A1A] text-[#F5F2E8] font-bold border border-[#2C2C2C] transition-all"
              >
                <Plus className="w-5 h-5" /> Create First Committee
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chambers.map((chamber) => (
                <motion.div
                  key={chamber.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-[#2A2A2A] bg-[#111111] overflow-hidden flex flex-col justify-between hover:border-[#C9A227]/30 transition-all duration-300 group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                          chamber.isPublished
                            ? "bg-[#1B4332]/20 border-[#234F41] text-[#8FCBAE]"
                            : "bg-[#B08D57]/10 border-[#B08D57]/30 text-[#B08D57]"
                        }`}
                      >
                        {chamber.isPublished ? "Published" : "Draft"}
                      </span>

                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenEdit(chamber)}
                          className="p-2 rounded-lg bg-[#161616] hover:bg-[#C9A227]/15 text-[#C8CDD5] hover:text-[#C9A227] transition-colors"
                          title="Edit Committee"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(chamber.id, chamber.name)}
                          className="p-2 rounded-lg bg-[#161616] hover:bg-[#5C1F24]/20 text-[#C8CDD5] hover:text-[#C97A87] transition-colors"
                          title="Delete Committee"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#F5F2E8] mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {chamber.name}
                    </h3>
                    <p className="text-xs font-mono text-[#C9A227] mb-4">/{chamber.slug}</p>

                    <p className="text-[#C8CDD5] text-sm line-clamp-3 mb-4 leading-relaxed">
                      {chamber.agenda}
                    </p>

                    {chamber.backgroundGuideUrl && (
                      <div className="flex items-center gap-2 text-xs text-[#7D8793]">
                        <FileText className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                        <span>Background guide attached</span>
                      </div>
                    )}
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
                    {editingChamber ? "Edit Committee" : "Create New Committee"}
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
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#7D8793] mb-2">
                        Committee Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleNameChange}
                        placeholder="e.g. United Nations Security Council"
                        className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#2C2C2C] text-[#F5F2E8] focus:outline-none focus:border-[#C9A227] transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#7D8793] mb-2">
                        URL Slug *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="unsc"
                        className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#2C2C2C] text-[#C8CDD5] font-mono text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7D8793] mb-2">
                      Agenda *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.agenda}
                      onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                      placeholder="e.g. Addressing global cyber warfare threats"
                      className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#2C2C2C] text-[#F5F2E8] focus:outline-none focus:border-[#C9A227] transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7D8793] mb-2">
                      Icon Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.iconUrl}
                      onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
                      placeholder="https://cdn-icons-png.flaticon.com/..."
                      className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#2C2C2C] text-[#F5F2E8] focus:outline-none focus:border-[#C9A227] transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7D8793] mb-2">
                      Background Guide URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.backgroundGuideUrl}
                      onChange={(e) => setFormData({ ...formData, backgroundGuideUrl: e.target.value })}
                      placeholder="https://example.com/background-guide.pdf"
                      className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#2C2C2C] text-[#F5F2E8] focus:outline-none focus:border-[#C9A227] transition-colors text-sm"
                    />
                    <p className="mt-2 text-xs text-[#7D8793]">
                      Paste a direct link to a hosted PDF (e.g. Cloudinary, Google Drive share link).
                      Direct file upload is not yet supported.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7D8793] mb-2">
                      Description *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Provide a detailed description of this committee..."
                      className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#2C2C2C] text-[#F5F2E8] focus:outline-none focus:border-[#C9A227] transition-colors text-sm resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="isPublished"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="w-5 h-5 rounded border-[#2C2C2C] text-[#C9A227] focus:ring-0 bg-[#161616] cursor-pointer"
                    />
                    <label htmlFor="isPublished" className="text-sm text-[#C8CDD5] font-medium cursor-pointer">
                      Publish committee immediately to the public website
                    </label>
                  </div>

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
                      {editingChamber ? "Save Changes" : "Create Committee"}
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
