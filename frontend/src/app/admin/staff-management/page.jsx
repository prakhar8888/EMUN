"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ArrowLeft,
  Loader2,
  AlertCircle,
  ShieldCheck,
  ShieldX,
  Clock,
  X,
  Mail,
  Phone,
  Briefcase,
  Building2,
} from "lucide-react";

import ProtectedRoute from "../../../components/common/ProtectedRoute";
import { useRouter } from "next/navigation";
import { apiRequest, API_ENDPOINTS } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import AnimatedBackground from "@/components/common/AnimatedBackground";

const PERMISSION_OPTIONS = [
  { key: "canManageEvents", label: "Manage Events" },
  { key: "canManageRegistrations", label: "Registrations" },
  { key: "canManageCommittees", label: "Committee Control" },
  { key: "canManageFeedback", label: "Feedback Review" },
  { key: "canManageContact", label: "Contact Dispatches" },
  { key: "canCreateStaff", label: "Create Staff Account" },
];

function getAuthToken() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  return token && token.trim().length > 0 ? token : null;
}

export default function StaffManagementPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [draftPermissions, setDraftPermissions] = useState({});
  const [processingId, setProcessingId] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);

  const handleAuthFailure = (err) => {
    const isAuthError =
      err.message?.toLowerCase().includes("not authorized") ||
      err.message?.toLowerCase().includes("token");

    if (isAuthError) {
      setSessionExpired(true);
      setError("Your login session has expired. Please log in again.");
      return true;
    }
    return false;
  };

  const fetchStaff = async () => {
    try {
      setLoading(true);
      setError(null);
      setSessionExpired(false);

      const token = getAuthToken();

      if (!isAuthenticated || !token) {
        setSessionExpired(true);
        setError("Your login session has expired. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await apiRequest(API_ENDPOINTS.AUTH.STAFF_LIST, {
        token,
      });
      setStaff(response?.data || []);
    } catch (err) {
      console.error("Fetch Staff Error:", err);
      if (!handleAuthFailure(err)) {
        setError(err.message || "Failed to load staff accounts.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  const startReview = (member) => {
    if (expandedId === member.id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(member.id);
    setDraftPermissions({
      canManageEvents: member.canManageEvents,
      canManageRegistrations: member.canManageRegistrations,
      canManageCommittees: member.canManageCommittees,
      canManageFeedback: member.canManageFeedback,
      canManageContact: member.canManageContact,
      canCreateStaff: member.canCreateStaff,
    });
  };

  const toggleDraftPermission = (key) => {
    setDraftPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApprove = async (id) => {
    const token = getAuthToken();

    if (!isAuthenticated || !token) {
      setSessionExpired(true);
      setError("Your login session has expired. Please log in again.");
      return;
    }

    try {
      setProcessingId(id);
      const response = await apiRequest(API_ENDPOINTS.AUTH.STAFF_APPROVE(id), {
        method: "PATCH",
        body: { permissions: draftPermissions },
        token,
      });
      showToast("success", response.message || "Staff account approved.");
      setExpandedId(null);
      await fetchStaff();
    } catch (err) {
      console.error("Approve Staff Error:", err);
      if (!handleAuthFailure(err)) {
        showToast("error", err.message || "Failed to approve staff account.");
      }
    } finally {
      setProcessingId(null);
    }
  };

  const handleRevoke = async (id, name) => {
    // Safety check mirrored on the backend too - a logged-in admin
    // can never revoke their own account through this UI, preventing
    // an accidental self-lockout.
    if (user?.id === id) {
      showToast("error", "You cannot revoke your own access.");
      return;
    }

    const confirmed = window.confirm(`Revoke access for ${name}? They will no longer be able to log in.`);
    if (!confirmed) return;

    const token = getAuthToken();

    if (!isAuthenticated || !token) {
      setSessionExpired(true);
      setError("Your login session has expired. Please log in again.");
      return;
    }

    try {
      setProcessingId(id);
      const response = await apiRequest(API_ENDPOINTS.AUTH.STAFF_REVOKE(id), {
        method: "PATCH",
        token,
      });
      showToast("success", response.message || "Access revoked.");
      await fetchStaff();
    } catch (err) {
      console.error("Revoke Staff Error:", err);
      if (!handleAuthFailure(err)) {
        showToast("error", err.message || "Failed to revoke access.");
      }
    } finally {
      setProcessingId(null);
    }
  };

  const statusBadge = (status) => {
    const map = {
      PENDING: { color: "text-[#B08D57] bg-[#B08D57]/10 border-[#B08D57]/30", icon: Clock, label: "Pending" },
      ACTIVE: { color: "text-[#8FCBAE] bg-[#1B4332]/20 border-[#234F41]", icon: ShieldCheck, label: "Active" },
      REVOKED: { color: "text-[#C97A87] bg-[#5C1F24]/15 border-[#7A263A]", icon: ShieldX, label: "Revoked" },
    };
    const cfg = map[status] || map.PENDING;
    const Icon = cfg.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}>
        <Icon className="w-3.5 h-3.5" />
        {cfg.label}
      </span>
    );
  };

  return (
    <ProtectedRoute adminOnly={true} requiredPermission="canCreateStaff">
      <div className="relative min-h-screen overflow-hidden pt-28 pb-24 px-6">
        <AnimatedBackground />

        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -30, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -30, x: "-50%" }}
              className={`fixed top-24 left-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl border shadow-2xl backdrop-blur-xl ${
                toast.type === "success"
                  ? "bg-[#1B4332]/90 border-[#234F41] text-[#E4F3EC]"
                  : "bg-[#5C1F24]/90 border-[#7A263A] text-[#F3DBE0]"
              }`}
            >
              <p className="text-sm">{toast.text}</p>
              <button onClick={() => setToast(null)} className="opacity-60 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {sessionExpired && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm px-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-md glass rounded-[2rem] p-8 md:p-10 text-center shadow-2xl"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-gradient-to-br from-[#5C1F24] to-[#7A263A]">
                  <AlertCircle className="w-10 h-10 text-[#C97A87]" />
                </div>

                <h2 className="text-2xl font-black text-[#F5F2E8] mb-3">
                  Session Expired
                </h2>

                <p className="text-[#C8CDD5] leading-relaxed mb-8">
                  Your login session has expired or could not be found. Please
                  log in again to continue managing staff accounts.
                </p>

                <button
                  onClick={() => router.push("/admin-login")}
                  className="w-full py-3.5 rounded-xl btn-gradient font-semibold"
                >
                  Log In Again
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                <Users className="w-8 h-8 text-[#090909]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#F5F2E8]">
                  Staff <span className="gradient-text">Management</span>
                </h1>
                <p className="text-[#7D8793] text-sm md:text-base">
                  Review pending requests, adjust permissions, and manage active staff.
                </p>
              </div>
            </div>
          </div>

          {error && !sessionExpired && (
            <div className="mb-8 p-6 rounded-2xl bg-[#5C1F24]/15 border border-[#7A263A] flex items-center justify-between text-[#C97A87]">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
              <button onClick={fetchStaff} className="underline text-sm font-bold hover:text-[#F5F2E8]">
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center p-24 rounded-[32px] border border-[#2A2A2A] bg-[#111111]">
              <Loader2 className="w-10 h-10 animate-spin text-[#C9A227] mb-4" />
              <p className="text-[#7D8793] font-medium">Loading staff accounts...</p>
            </div>
          ) : staff.length === 0 ? (
            <div className="text-center py-24 rounded-[32px] border border-[#2A2A2A] bg-[#111111] p-8">
              <Users className="w-16 h-16 text-[#7D8793] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#F5F2E8] mb-2">No Staff Accounts Yet</h3>
              <p className="text-[#7D8793] max-w-md mx-auto">
                Accounts created from "Create Staff Account" will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {staff.map((member) => {
                const isExpanded = expandedId === member.id;
                const isProcessing = processingId === member.id;
                const isSelf = user?.id === member.id;

                return (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-3xl border overflow-hidden ${
                      isSelf
                        ? "border-[#C9A227]/40 bg-[#111111]"
                        : "border-[#2A2A2A] bg-[#111111]"
                    }`}
                  >
                    <div className="p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h2 className="text-lg font-bold text-[#F5F2E8]">{member.fullName}</h2>
                          {statusBadge(member.staffStatus)}
                          <span className="text-xs uppercase tracking-wide text-[#C9A227] bg-[#C9A227]/10 px-2.5 py-1 rounded-full">
                            {member.role}
                          </span>
                          {isSelf && (
                            <span className="text-xs uppercase tracking-wide text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-2.5 py-1 rounded-full font-semibold">
                              This Is You
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#7D8793]">
                          <span className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" /> {member.email}
                          </span>
                          {member.phone && (
                            <span className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5" /> {member.phone}
                            </span>
                          )}
                          {member.university && (
                            <span className="flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5" /> {member.university}
                            </span>
                          )}
                          {member.designation && (
                            <span className="flex items-center gap-1.5">
                              <Briefcase className="w-3.5 h-3.5" /> {member.designation}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {member.role === "SECRETARIAT" && member.staffStatus !== "REVOKED" && (
                          <button
                            onClick={() => startReview(member)}
                            className="px-4 py-2.5 rounded-xl bg-[#161616] border border-[#2C2C2C] text-[#C8CDD5] hover:border-[#C9A227]/40 text-sm font-medium transition-all"
                          >
                            {member.staffStatus === "PENDING" ? "Review & Approve" : "Edit Permissions"}
                          </button>
                        )}

                        {/* Revoke button is completely hidden for your own account -
                            not just disabled, so there's no confusing greyed-out
                            button tempting a self-lockout attempt. */}
                        {member.staffStatus === "ACTIVE" && !isSelf && (
                          <button
                            onClick={() => handleRevoke(member.id, member.fullName)}
                            disabled={isProcessing}
                            className="px-4 py-2.5 rounded-xl bg-[#5C1F24]/15 border border-[#7A263A] text-[#C97A87] hover:bg-[#5C1F24]/25 text-sm font-medium transition-all disabled:opacity-40"
                          >
                            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Revoke Access"}
                          </button>
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 md:px-7 pb-7 pt-2 border-t border-[#2A2A2A]">
                            <p className="text-xs uppercase tracking-[0.15em] text-[#7D8793] mb-4 mt-4">
                              Module Access
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                              {PERMISSION_OPTIONS.map((option) => (
                                <button
                                  key={option.key}
                                  onClick={() => toggleDraftPermission(option.key)}
                                  className={`p-3 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between ${
                                    draftPermissions[option.key]
                                      ? "border-[#C9A227] bg-[#C9A227]/10 text-[#F5F2E8]"
                                      : "border-[#2C2C2C] bg-[#161616] text-[#C8CDD5]"
                                  }`}
                                >
                                  {option.label}
                                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                                    draftPermissions[option.key] ? "bg-[#C9A227] border-[#C9A227]" : "border-[#2C2C2C]"
                                  }`}>
                                    {draftPermissions[option.key] && <ShieldCheck className="w-3.5 h-3.5 text-[#090909]" />}
                                  </div>
                                </button>
                              ))}
                            </div>

                            <button
                              onClick={() => handleApprove(member.id)}
                              disabled={isProcessing}
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-gradient font-semibold text-sm disabled:opacity-60"
                            >
                              {isProcessing ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                              ) : (
                                <><ShieldCheck className="w-4 h-4" /> {member.staffStatus === "PENDING" ? "Approve with these permissions" : "Save changes"}</>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
