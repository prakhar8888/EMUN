"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Star,
  CheckCircle2,
  Trash2,
  Mail,
  Clock,
} from "lucide-react";

import ProtectedRoute from "../../../components/common/ProtectedRoute";
import { useRouter } from "next/navigation";
import feedbackService from "../../../services/feedbackService";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export default function AdminFeedbackPage() {
  const router = useRouter();

  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await feedbackService.getAllFeedback();
      setFeedbackList(response?.data || []);
    } catch (err) {
      console.error("Fetch Feedback Error:", err);
      setError(err.message || "Failed to load feedback.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleMarkReviewed = async (id) => {
    try {
      setUpdatingId(id);
      await feedbackService.updateFeedbackStatus(id, "REVIEWED");
      setFeedbackList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "REVIEWED" } : item
        )
      );
    } catch (err) {
      console.error("Update Feedback Status Error:", err);
      alert(err.message || "Failed to update feedback status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feedback entry? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await feedbackService.deleteFeedback(id);
      setFeedbackList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete Feedback Error:", err);
      alert(err.message || "Failed to delete feedback.");
    } finally {
      setDeletingId(null);
    }
  };

  const StatusBadge = ({ status }) => {
    const isReviewed = status === "REVIEWED";
    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${
          isReviewed
            ? "bg-[#1B4332]/20 border-[#234F41] text-[#8FCBAE]"
            : "bg-[#B08D57]/10 border-[#B08D57]/30 text-[#B08D57]"
        }`}
      >
        {isReviewed ? (
          <CheckCircle2 className="w-3.5 h-3.5" />
        ) : (
          <Clock className="w-3.5 h-3.5" />
        )}
        {isReviewed ? "REVIEWED" : "PENDING"}
      </span>
    );
  };

  const StarDisplay = ({ rating }) => {
    if (!rating) return <span className="text-[#7D8793] text-sm">No rating</span>;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "fill-[#C9A227] text-[#C9A227]"
                : "fill-transparent text-[#2C2C2C]"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <ProtectedRoute adminOnly={true} requiredPermission="canManageFeedback">
      <div className="relative min-h-screen overflow-hidden pb-24">

        <AnimatedBackground />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28">

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
                  <MessageSquare className="w-8 h-8 text-[#090909]" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#F5F2E8]">
                    Feedback <span className="gradient-text">Review</span>
                  </h1>
                  <p className="text-[#7D8793] text-sm md:text-base">
                    Monitor delegate feedback and mark items as reviewed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-8 p-6 rounded-2xl bg-[#5C1F24]/15 border border-[#7A263A] flex items-center justify-between text-[#C97A87]">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
              <button onClick={fetchFeedback} className="underline text-sm font-bold hover:text-[#F5F2E8]">
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center p-24 rounded-[32px] border border-[#2A2A2A] bg-[#111111]">
              <Loader2 className="w-10 h-10 animate-spin text-[#C9A227] mb-4" />
              <p className="text-[#7D8793] font-medium">Loading feedback...</p>
            </div>
          ) : !error && feedbackList.length === 0 ? (
            <div className="text-center py-24 rounded-[32px] border border-[#2A2A2A] bg-[#111111] p-8">
              <MessageSquare className="w-16 h-16 text-[#7D8793] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#F5F2E8] mb-2">No Feedback Yet</h3>
              <p className="text-[#7D8793] max-w-md mx-auto">
                Delegate feedback submissions will appear here once received.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {feedbackList.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="rounded-3xl border border-[#2A2A2A] bg-[#111111] p-6 md:p-8 hover:border-[#C9A227]/30 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h2 className="text-lg font-bold text-[#F5F2E8]">
                          {item.fullName || "Anonymous Delegate"}
                        </h2>
                        <StatusBadge status={item.status} />
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-[#7D8793]">
                        {item.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#C9A227] shrink-0" />
                            <span>{item.email}</span>
                          </div>
                        )}
                        <StarDisplay rating={item.rating} />
                        {item.createdAt && (
                          <span className="text-[#7D8793]">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      <p className="text-[#C8CDD5] leading-relaxed bg-[#161616] border border-[#2C2C2C] rounded-2xl p-4">
                        {item.message}
                      </p>
                    </div>

                    <div className="flex lg:flex-col items-center lg:items-stretch gap-3 shrink-0">
                      <button
                        onClick={() => handleMarkReviewed(item.id)}
                        disabled={item.status === "REVIEWED" || updatingId === item.id}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B4332]/20 border border-[#234F41] text-[#8FCBAE] hover:bg-[#1B4332]/30 transition-all duration-300 font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {updatingId === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                        Mark Reviewed
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#5C1F24]/15 border border-[#7A263A] text-[#C97A87] hover:bg-[#5C1F24]/25 transition-all duration-300 font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
