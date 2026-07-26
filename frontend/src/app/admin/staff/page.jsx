"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Globe,
  Building2,
  ShieldCheck,
  Loader2,
  ArrowLeft,
  UserPlus,
  Eye,
  EyeOff,
  Briefcase,
  Check,
  X,
  Phone,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import ProtectedRoute from "../../../components/common/ProtectedRoute";
import { useRouter } from "next/navigation";
import { apiRequest, API_ENDPOINTS } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import AnimatedBackground from "@/components/common/AnimatedBackground";

const PERMISSION_OPTIONS = [
  { key: "canManageEvents", label: "Manage Events", description: "Create, edit, and publish conferences." },
  { key: "canManageRegistrations", label: "Registrations", description: "Review and approve delegate applications." },
  { key: "canManageCommittees", label: "Committee Control", description: "Manage committees and background guides." },
  { key: "canManageFeedback", label: "Feedback Review", description: "Monitor delegate feedback submissions." },
  { key: "canManageContact", label: "Contact Dispatches", description: "View messages from the Connect page." },
  { key: "canCreateStaff", label: "Create Staff Account", description: "Add and manage other staff accounts." },
];

function getAuthToken() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  return token && token.trim().length > 0 ? token : null;
}

export default function CreateStaffPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    institute: "",
    country: "",
    designation: "",
  });

  const [permissions, setPermissions] = useState({
    canManageEvents: false,
    canManageRegistrations: false,
    canManageCommittees: false,
    canManageFeedback: false,
    canManageContact: false,
    canCreateStaff: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState(null);

  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
  };
  const passwordIsValid =
    passwordChecks.length &&
    passwordChecks.uppercase &&
    passwordChecks.lowercase &&
    passwordChecks.number;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePermission = (key) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      institute: "",
      country: "",
      designation: "",
    });
    setPermissions({
      canManageEvents: false,
      canManageRegistrations: false,
      canManageCommittees: false,
      canManageFeedback: false,
      canManageContact: false,
      canCreateStaff: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!passwordIsValid) {
      setError("Please meet all password requirements before submitting.");
      return;
    }

    const token = getAuthToken();

    if (!isAuthenticated || !token) {
      setPopup({
        type: "error",
        title: "Session Expired",
        message:
          "Your login session has expired or could not be found. Please log in again to continue creating staff accounts.",
        action: "relogin",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await apiRequest(API_ENDPOINTS.AUTH.SIGNUP, {
        method: "POST",
        body: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          university: formData.institute,
          country: formData.country,
          role: "SECRETARIAT",
          designation: formData.designation,
          requestedPermissions: permissions,
        },
        token,
      });

      setPopup({
        type: "success",
        title: "Staff Request Created",
        message: `${formData.fullName}'s account has been created and is pending approval. Visit Staff Management to activate their access.`,
      });

      resetForm();
    } catch (err) {
      console.error("Create Staff Error:", err);

      const isAuthError =
        err.message?.toLowerCase().includes("not authorized") ||
        err.message?.toLowerCase().includes("token");

      setPopup({
        type: "error",
        title: isAuthError ? "Session Expired" : "Request Failed",
        message: isAuthError
          ? "Your login session has expired. Please log in again."
          : err.message || "Something went wrong while creating this staff account. Please try again.",
        action: isAuthError ? "relogin" : null,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const PasswordRule = ({ passed, label }) => (
    <div className={`flex items-center gap-1.5 text-xs ${passed ? "text-[#8FCBAE]" : "text-[#7D8793]"}`}>
      {passed ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
      {label}
    </div>
  );

  return (
    <ProtectedRoute adminOnly={true} requiredPermission="canCreateStaff">
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-24">
        <AnimatedBackground />

        <AnimatePresence>
          {popup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm px-6"
              onClick={() => setPopup(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md glass rounded-[2rem] p-8 md:p-10 text-center shadow-2xl"
              >
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                    popup.type === "success"
                      ? "bg-gradient-to-br from-[#1B4332] to-[#234F41]"
                      : "bg-gradient-to-br from-[#5C1F24] to-[#7A263A]"
                  }`}
                >
                  {popup.type === "success" ? (
                    <CheckCircle2 className="w-10 h-10 text-[#8FCBAE]" />
                  ) : (
                    <AlertCircle className="w-10 h-10 text-[#C97A87]" />
                  )}
                </div>

                <h2 className="text-2xl font-black text-[#F5F2E8] mb-3">
                  {popup.title}
                </h2>

                <p className="text-[#C8CDD5] leading-relaxed mb-8">
                  {popup.message}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  {popup.type === "success" && (
                    <button
                      onClick={() => router.push("/admin/staff-management")}
                      className="flex-1 py-3.5 rounded-xl btn-gradient font-semibold"
                    >
                      Go to Staff Management
                    </button>
                  )}

                  {popup.action === "relogin" ? (
                    <button
                      onClick={() => router.push("/admin-login")}
                      className="flex-1 py-3.5 rounded-xl btn-gradient font-semibold"
                    >
                      Log In Again
                    </button>
                  ) : (
                    <button
                      onClick={() => setPopup(null)}
                      className={`flex-1 py-3.5 rounded-xl font-semibold border transition-colors ${
                        popup.type === "success"
                          ? "border-[#2C2C2C] bg-[#161616] text-[#C8CDD5] hover:bg-[#1A1A1A]"
                          : "btn-gradient"
                      }`}
                    >
                      {popup.type === "success" ? "Add Another" : "Try Again"}
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-3xl"
        >
          <button
            onClick={() => router.push("/admin")}
            className="inline-flex items-center gap-2 text-[#7D8793] hover:text-[#C9A227] transition-colors text-sm font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Command Center
          </button>

          <div className="glass rounded-[32px] p-8 md:p-12 shadow-2xl">

            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#C9A227] to-[#D4AF37] mb-6 shadow-xl">
                <UserPlus className="w-10 h-10 text-[#090909]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-[-0.04em] mb-4 text-[#F5F2E8]">
                Create Staff Account
              </h1>
              <p className="text-[#C8CDD5] text-lg leading-relaxed">
                New accounts start as pending. Approve them from Staff Management
                to activate access with the final permission set.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl border border-[#7A263A] bg-[#5C1F24]/15 px-5 py-4 text-[#C97A87]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-3 text-sm uppercase tracking-[0.15em] text-[#7D8793]">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7D8793]" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#161616] border border-[#2C2C2C] focus:border-[#C9A227] focus:outline-none text-[#F5F2E8] placeholder:text-[#7D8793]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-3 text-sm uppercase tracking-[0.15em] text-[#7D8793]">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7D8793]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="staff@enigmamun.org"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#161616] border border-[#2C2C2C] focus:border-[#C9A227] focus:outline-none text-[#F5F2E8] placeholder:text-[#7D8793]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-3 text-sm uppercase tracking-[0.15em] text-[#7D8793]">
                  Contact Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7D8793]" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#161616] border border-[#2C2C2C] focus:border-[#C9A227] focus:outline-none text-[#F5F2E8] placeholder:text-[#7D8793]"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-3 text-sm uppercase tracking-[0.15em] text-[#7D8793]">
                  Temporary Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7D8793]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter a temporary password"
                    required
                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-[#161616] border border-[#2C2C2C] focus:border-[#C9A227] focus:outline-none text-[#F5F2E8] placeholder:text-[#7D8793]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D8793] hover:text-[#C9A227] transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {formData.password.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#161616] border border-[#2C2C2C]">
                    <PasswordRule passed={passwordChecks.length} label="8+ characters" />
                    <PasswordRule passed={passwordChecks.uppercase} label="One uppercase letter" />
                    <PasswordRule passed={passwordChecks.lowercase} label="One lowercase letter" />
                    <PasswordRule passed={passwordChecks.number} label="One number" />
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-3 text-sm uppercase tracking-[0.15em] text-[#7D8793]">
                  Designation (Optional)
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7D8793]" />
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="e.g. Technical Team, Academics Council, Delegate Affairs"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#161616] border border-[#2C2C2C] focus:border-[#C9A227] focus:outline-none text-[#F5F2E8] placeholder:text-[#7D8793]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-3 text-sm uppercase tracking-[0.15em] text-[#7D8793]">
                    Institute (Optional)
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7D8793]" />
                    <input
                      type="text"
                      name="institute"
                      value={formData.institute}
                      onChange={handleChange}
                      placeholder="Institute name"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#161616] border border-[#2C2C2C] focus:border-[#C9A227] focus:outline-none text-[#F5F2E8] placeholder:text-[#7D8793]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-3 text-sm uppercase tracking-[0.15em] text-[#7D8793]">
                    Country (Optional)
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7D8793]" />
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#161616] border border-[#2C2C2C] focus:border-[#C9A227] focus:outline-none text-[#F5F2E8] placeholder:text-[#7D8793]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-3 text-sm uppercase tracking-[0.15em] text-[#7D8793]">
                  Requested Module Access
                </label>
                <p className="text-xs text-[#7D8793] mb-4">
                  Select the modules this person needs. You can adjust the final
                  set again when approving their account.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PERMISSION_OPTIONS.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => togglePermission(option.key)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        permissions[option.key]
                          ? "border-[#C9A227] bg-[#C9A227]/10"
                          : "border-[#2C2C2C] bg-[#161616]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className={`font-semibold text-sm ${permissions[option.key] ? "text-[#F5F2E8]" : "text-[#C8CDD5]"}`}>
                          {option.label}
                        </p>
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                          permissions[option.key] ? "bg-[#C9A227] border-[#C9A227]" : "border-[#2C2C2C]"
                        }`}>
                          {permissions[option.key] && (
                            <ShieldCheck className="w-3.5 h-3.5 text-[#090909]" />
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-[#7D8793]">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl btn-gradient font-semibold text-lg shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Creating Request...</>
                ) : (
                  <><ShieldCheck className="w-5 h-5" /> Submit Staff Request</>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
