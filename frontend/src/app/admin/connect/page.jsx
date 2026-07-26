"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Trash2,
  User,
} from "lucide-react";

import ProtectedRoute from "../../../components/common/ProtectedRoute";
import { useRouter } from "next/navigation";
import { getAllContactMessages, deleteContactMessage } from "@/services/connectService";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export default function AdminConnectPage() {
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllContactMessages();
      setMessages(response?.data || []);
    } catch (err) {
      console.error("Fetch Contact Messages Error:", err);
      setError(err.message || "Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Delete the message from "${name}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await deleteContactMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Delete Message Error:", err);
      alert(err.message || "Failed to delete message.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <ProtectedRoute adminOnly={true} requiredPermission="canManageContact">
      <div className="relative min-h-screen overflow-hidden pt-28 pb-24 px-6">

        <AnimatedBackground />

        <div className="relative z-10 max-w-5xl mx-auto">

          <div className="mb-12">
            <button
              onClick={() => router.push("/admin")}
              className="inline-flex items-center gap-2 text-[#7D8793] hover:text-[#C9A227] transition-colors text-sm font-medium mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Command Center
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#C9A227] to-[#D4AF37] shadow-xl">
                <Mail className="w-8 h-8 text-[#090909]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#F5F2E8]">
                  Contact <span className="gradient-text">Dispatches</span>
                </h1>
                <p className="text-[#7D8793] text-sm md:text-base">
                  Messages submitted through the public Connect page.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-8 p-6 rounded-2xl bg-[#5C1F24]/15 border border-[#7A263A] flex items-center justify-between text-[#C97A87]">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
              <button onClick={fetchMessages} className="underline text-sm font-bold hover:text-[#F5F2E8]">
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center p-24 rounded-[32px] border border-[#2A2A2A] bg-[#111111]">
              <Loader2 className="w-10 h-10 animate-spin text-[#C9A227] mb-4" />
              <p className="text-[#7D8793] font-medium">Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-24 rounded-[32px] border border-[#2A2A2A] bg-[#111111] p-8">
              <Mail className="w-16 h-16 text-[#7D8793] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#F5F2E8] mb-2">No Messages Yet</h3>
              <p className="text-[#7D8793] max-w-md mx-auto">
                Dispatches submitted through the Connect page will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="rounded-3xl border border-[#2A2A2A] bg-[#111111] p-6 md:p-8 hover:border-[#C9A227]/30 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#C9A227]" />
                          <h2 className="text-lg font-bold text-[#F5F2E8]">
                            {msg.name}
                          </h2>
                        </div>
                        {msg.subject && (
                          <span className="text-xs uppercase tracking-wide text-[#C9A227] bg-[#C9A227]/10 px-3 py-1 rounded-full">
                            {msg.subject}
                          </span>
                        )}
                      </div>

                      <a
                        href={`mailto:${msg.email}`}
                        className="text-sm text-[#D4AF37] hover:text-[#F0D777] transition-colors block mb-4"
                      >
                        {msg.email}
                      </a>

                      <p className="text-[#C8CDD5] leading-relaxed bg-[#161616] border border-[#2C2C2C] rounded-2xl p-4">
                        {msg.message}
                      </p>

                      {msg.createdAt && (
                        <p className="text-xs text-[#7D8793] mt-3">
                          {new Date(msg.createdAt).toLocaleString()}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleDelete(msg.id, msg.name)}
                      disabled={deletingId === msg.id}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#5C1F24]/15 border border-[#7A263A] text-[#C97A87] hover:bg-[#5C1F24]/25 transition-all duration-300 font-medium text-sm disabled:opacity-40 shrink-0"
                    >
                      {deletingId === msg.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      Delete
                    </button>
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
