"use client";

import {
  useEffect,
  useState,
} from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  Users,
  Check,
  X,
  Clock,
  Loader2,
  Building2,
  Mail,
  GraduationCap,
  Globe,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

import ProtectedRoute from "../../../components/common/ProtectedRoute";
import { useRouter } from "next/navigation";

import {
  getAllRegistrations,
  updateRegistrationStatus,
} from "../../../services/registrationService";

import AnimatedBackground from "@/components/common/AnimatedBackground";

export default function AdminRegistrationsPage() {
  const router = useRouter();

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [emailWarning, setEmailWarning] = useState(null);

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllRegistrations();
      setRegistrations(response.data || []);
    } catch (err) {
      console.error("Load Registrations Error:", err);
      setError(err.message || "Failed to load registrations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  const handleStatusChange = async (id, status, delegateName) => {
    try {
      setUpdatingId(id);
      setEmailWarning(null);

      const response = await updateRegistrationStatus(id, status);

      setRegistrations((prev) =>
        prev.map((reg) =>
          reg.id === id ? { ...reg, status } : reg
        )
      );

      if (response && response.emailSent === false) {
        setEmailWarning(
          `Status updated for ${delegateName}, but the notification email could not be sent. ` +
          `This is expected until a verified sending domain is configured with Resend.`
        );
      }
    } catch (err) {
      console.error("Update Status Error:", err);
      alert(err.message || "Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      PENDING: "bg-[#B08D57]/10 text-[#B08D57] border-[#B08D57]/30",
      APPROVED: "bg-[#1B4332]/20 text-[#8FCBAE] border-[#234F41]",
      REJECTED: "bg-[#5C1F24]/15 text-[#C97A87] border-[#7A263A]",
    };
    return (
      <span
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${styles[status] || styles.PENDING}`}
      >
        {status === "PENDING" && <Clock className="w-4 h-4" />}
        {status === "APPROVED" && <Check className="w-4 h-4" />}
        {status === "REJECTED" && <X className="w-4 h-4" />}
        {status}
      </span>
    );
  };

  return (
    <ProtectedRoute adminOnly={true} requiredPermission="canManageRegistrations">
      <div className="relative min-h-screen overflow-hidden pt-28 pb-24 px-6">

        <AnimatedBackground />

        <div className="relative z-10 max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <button
              onClick={() => router.push("/admin")}
              className="inline-flex items-center gap-2 text-[#7D8793] hover:text-[#C9A227] transition-colors text-sm font-medium mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Command Center
            </button>

            <div className="inline-flex items-center gap-3 glass px-5 py-3 rounded-full mb-6">
              <Users className="w-5 h-5 text-[#C9A227]" />
              <span className="text-sm uppercase tracking-[0.2em] text-[#C8CDD5]">
                Delegate Registrations
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black tracking-[-0.05em] leading-[0.95] mb-5">
              Review
              <span className="gradient-text ml-3">Applications</span>
            </h1>

            <p className="text-[#C8CDD5] text-lg max-w-2xl leading-relaxed">
              Approve or reject delegate registrations for each committee.
            </p>
          </motion.div>

          <AnimatePresence>
            {emailWarning && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="rounded-2xl border border-[#B08D57]/30 bg-[#B08D57]/10 px-6 py-5 flex items-start gap-4 overflow-hidden"
              >
                <AlertTriangle className="w-6 h-6 text-[#B08D57] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-[#B08D57]">{emailWarning}</p>
                </div>
                <button
                  onClick={() => setEmailWarning(null)}
                  className="text-[#B08D57] hover:text-[#F5F2E8] transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-5">
              <Loader2 className="w-12 h-12 animate-spin text-[#C9A227]" />
              <p className="text-[#C8CDD5]">Loading registrations...</p>
            </div>
          )}

          {!loading && error && (
            <div className="glass rounded-3xl p-10 text-center">
              <p className="text-[#C97A87] text-lg">{error}</p>
            </div>
          )}

          {!loading && !error && registrations.length === 0 && (
            <div className="glass rounded-3xl p-12 text-center">
              <p className="text-[#C8CDD5] text-lg">No registrations yet.</p>
            </div>
          )}

          {!loading && !error && registrations.length > 0 && (
            <div className="space-y-6">
              {registrations.map((reg, index) => (
                <motion.div
                  key={reg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="rounded-[28px] p-8 border border-[#2A2A2A] bg-[#111111]"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-2xl font-bold text-[#F5F2E8]">
                          {reg.user?.fullName || "Unknown Delegate"}
                        </h2>
                        <StatusBadge status={reg.status} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#C8CDD5] text-sm">
                        <div className="flex items-center gap-3">
                          <Building2 className="w-4 h-4 text-[#C9A227] shrink-0" />
                          <span>
                            Committee:{" "}
                            <span className="text-[#F5F2E8]">
                              {reg.chamber?.name || "N/A"}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-[#C9A227] shrink-0" />
                          <span>{reg.user?.email || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <GraduationCap className="w-4 h-4 text-[#C9A227] shrink-0" />
                          <span>{reg.user?.university || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="w-4 h-4 text-[#C9A227] shrink-0" />
                          <span>
                            Portfolio:{" "}
                            <span className="text-[#F5F2E8]">
                              {reg.portfolio || "N/A"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      {updatingId === reg.id ? (
                        <div className="flex items-center gap-2 text-[#C8CDD5]">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Updating...
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleStatusChange(reg.id, "APPROVED", reg.user?.fullName || "this delegate")}
                            disabled={reg.status === "APPROVED"}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1B4332]/20 border border-[#234F41] text-[#8FCBAE] hover:bg-[#1B4332]/30 transition-all duration-300 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <Check className="w-5 h-5" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(reg.id, "REJECTED", reg.user?.fullName || "this delegate")}
                            disabled={reg.status === "REJECTED"}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#5C1F24]/15 border border-[#7A263A] text-[#C97A87] hover:bg-[#5C1F24]/25 transition-all duration-300 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <X className="w-5 h-5" />
                            Reject
                          </button>
                        </>
                      )}
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
