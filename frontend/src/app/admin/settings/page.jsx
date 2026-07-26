"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  ShieldCheck,
  Loader2,
  ArrowLeft,
  Eye,
  EyeOff,
  Check,
  X,
  KeyRound,
  Settings,
  UserCog,
} from "lucide-react";

import ProtectedRoute from "../../../components/common/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiRequest, API_ENDPOINTS } from "@/lib/api";
import AnimatedBackground from "@/components/common/AnimatedBackground";

function getAuthToken() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  return token && token.trim().length > 0 ? token : null;
}

export default function AccountSettingsPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("password");

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="relative min-h-screen overflow-hidden pt-28 pb-24 px-6">
        <AnimatedBackground />

        <div className="relative z-10 max-w-2xl mx-auto">
          <button
            onClick={() => router.push("/admin")}
            className="inline-flex items-center gap-2 text-[#7D8793] hover:text-[#C9A227] transition-colors text-sm font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Command Center
          </button>

          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A227] to-[#D4AF37] mb-5">
              <Settings className="w-8 h-8 text-[#090909]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-[#F5F2E8] mb-3">
              Account <span className="gradient-text">Settings</span>
            </h1>
            <p className="text-[#C8CDD5]">
              Signed in as <span className="text-[#F5F2E8] font-medium">{user?.fullName}</span> ({user?.email})
            </p>
          </div>

          <div className="glass rounded-[32px] p-2 mb-6 flex gap-2">
            <button
              onClick={() => setActiveTab("password")}
              className={`flex-1 py-3 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === "password"
                  ? "bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-[#090909]"
                  : "text-[#C8CDD5] hover:bg-[#161616]"
              }`}
            >
              <Lock className="w-4 h-4" /> Change Password
            </button>
            <button
              onClick={() => setActiveTab("email")}
              className={`flex-1 py-3 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === "email"
                  ? "bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-[#090909]"
                  : "text-[#C8CDD5] hover:bg-[#161616]"
              }`}
            >
              <Mail className="w-4 h-4" /> Change Email
            </button>
          </div>

          <div className="glass rounded-[32px] p-8 md:p-10">
            <AnimatePresence mode="wait">
              {activeTab === "password" ? (
                <motion.div key="password" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ChangePasswordForm />
                </motion.div>
              ) : (
                <motion.div key="email" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ChangeEmailForm />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// ======================================
// CHANGE PASSWORD (uses forgot-password flow,
// since Anaadi is already proven to own the account
// by being logged in - we still verify via her
// current email + a fresh OTP for extra safety)
// ======================================
function ChangePasswordForm() {
  const { user } = useAuth();
  const [step, setStep] = useState("request"); // request -> otp -> newPassword -> done
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordChecks = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /\d/.test(newPassword),
  };
  const passwordIsValid =
    passwordChecks.length && passwordChecks.uppercase && passwordChecks.lowercase && passwordChecks.number;

  const PasswordRule = ({ passed, label }) => (
    <div className={`flex items-center gap-1.5 text-xs ${passed ? "text-[#8FCBAE]" : "text-[#7D8793]"}`}>
      {passed ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
      {label}
    </div>
  );

  const handleRequestOtp = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      await apiRequest(API_ENDPOINTS.AUTH.PASSWORD_RESET_REQUEST, {
        method: "POST",
        body: { email: user.email },
      });
      setStep("otp");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await apiRequest(API_ENDPOINTS.AUTH.PASSWORD_RESET_VERIFY, {
        method: "POST",
        body: { email: user.email, otp },
      });
      setResetToken(response.resetToken);
      setStep("newPassword");
    } catch (err) {
      setError(err.message || "Incorrect or expired code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    if (!passwordIsValid) {
      setError("Please meet all password requirements.");
      return;
    }
    setIsSubmitting(true);
    try {
      await apiRequest(API_ENDPOINTS.AUTH.PASSWORD_RESET_CONFIRM, {
        method: "POST",
        body: { resetToken, newPassword },
      });
      setStep("done");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "done") {
    return (
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5 bg-gradient-to-br from-[#1B4332] to-[#234F41]">
          <ShieldCheck className="w-8 h-8 text-[#8FCBAE]" />
        </div>
        <h2 className="text-xl font-bold text-[#F5F2E8] mb-2">Password Updated</h2>
        <p className="text-[#C8CDD5]">Your password has been changed successfully.</p>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-6 rounded-2xl border border-[#7A263A] bg-[#5C1F24]/15 px-5 py-4 text-[#C97A87]">
          {error}
        </div>
      )}

      {step === "request" && (
        <div className="text-center">
          <p className="text-[#C8CDD5] mb-6 leading-relaxed">
            For security, we'll send a verification code to your registered
            email (<span className="text-[#F5F2E8]">{user?.email}</span>)
            before you can set a new password.
          </p>
          <button
            onClick={handleRequestOtp}
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl btn-gradient font-semibold disabled:opacity-60 flex items-center justify-center gap-3"
          >
            {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending Code...</> : <><Mail className="w-5 h-5" /> Send Verification Code</>}
          </button>
        </div>
      )}

      {step === "otp" && (
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="text-center mb-2">
            <KeyRound className="w-10 h-10 text-[#C9A227] mx-auto mb-3" />
            <p className="text-[#C8CDD5]">Enter the 6-digit code sent to {user?.email}</p>
          </div>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            required
            className="w-full py-4 rounded-2xl bg-[#161616] border border-[#2C2C2C] focus:border-[#C9A227] focus:outline-none text-[#F5F2E8] text-center text-3xl tracking-[0.5em] font-bold"
          />
          <button
            type="submit"
            disabled={isSubmitting || otp.length !== 6}
            className="w-full py-4 rounded-2xl btn-gradient font-semibold disabled:opacity-60 flex items-center justify-center gap-3"
          >
            {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Verifying...</> : <><ShieldCheck className="w-5 h-5" /> Verify Code</>}
          </button>
        </form>
      )}

      {step === "newPassword" && (
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label className="block mb-3 text-sm uppercase tracking-[0.15em] text-[#7D8793]">New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7D8793]" />
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-[#161616] border border-[#2C2C2C] focus:border-[#C9A227] focus:outline-none text-[#F5F2E8] placeholder:text-[#7D8793]"
              />
              <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D8793] hover:text-[#C9A227]" tabIndex={-1}>
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {newPassword.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#161616] border border-[#2C2C2C]">
                <PasswordRule passed={passwordChecks.length} label="8+ characters" />
                <PasswordRule passed={passwordChecks.uppercase} label="One uppercase letter" />
                <PasswordRule passed={passwordChecks.lowercase} label="One lowercase letter" />
                <PasswordRule passed={passwordChecks.number} label="One number" />
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl btn-gradient font-semibold disabled:opacity-60 flex items-center justify-center gap-3"
          >
            {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Updating...</> : <><ShieldCheck className="w-5 h-5" /> Update Password</>}
          </button>
        </form>
      )}
    </div>
  );
}

// ======================================
// CHANGE EMAIL
// ======================================
function ChangeEmailForm() {
  const [step, setStep] = useState("newEmail"); // newEmail -> otp -> done
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequestChange = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const token = getAuthToken();
      await apiRequest(API_ENDPOINTS.AUTH.EMAIL_CHANGE_REQUEST, {
        method: "POST",
        body: { newEmail },
        token,
      });
      setStep("otp");
    } catch (err) {
      // Surfaces the exact "already registered to X" message from the backend
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmChange = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const token = getAuthToken();
      await apiRequest(API_ENDPOINTS.AUTH.EMAIL_CHANGE_CONFIRM, {
        method: "POST",
        body: { newEmail, otp },
        token,
      });
      setStep("done");
    } catch (err) {
      setError(err.message || "Incorrect or expired code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "done") {
    return (
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5 bg-gradient-to-br from-[#1B4332] to-[#234F41]">
          <ShieldCheck className="w-8 h-8 text-[#8FCBAE]" />
        </div>
        <h2 className="text-xl font-bold text-[#F5F2E8] mb-2">Email Updated</h2>
        <p className="text-[#C8CDD5]">
          Your email address has been changed to <span className="text-[#F5F2E8]">{newEmail}</span>.
          Use this new email the next time you log in.
        </p>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-6 rounded-2xl border border-[#7A263A] bg-[#5C1F24]/15 px-5 py-4 text-[#C97A87]">
          {error}
        </div>
      )}

      {step === "newEmail" && (
        <form onSubmit={handleRequestChange} className="space-y-6">
          <div>
            <label className="block mb-3 text-sm uppercase tracking-[0.15em] text-[#7D8793]">New Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7D8793]" />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="new-email@example.com"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#161616] border border-[#2C2C2C] focus:border-[#C9A227] focus:outline-none text-[#F5F2E8] placeholder:text-[#7D8793]"
              />
            </div>
            <p className="mt-2 text-xs text-[#7D8793]">
              We'll send a verification code to this new address to confirm you own it.
            </p>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl btn-gradient font-semibold disabled:opacity-60 flex items-center justify-center gap-3"
          >
            {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending Code...</> : <><Mail className="w-5 h-5" /> Send Verification Code</>}
          </button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleConfirmChange} className="space-y-6">
          <div className="text-center mb-2">
            <KeyRound className="w-10 h-10 text-[#C9A227] mx-auto mb-3" />
            <p className="text-[#C8CDD5]">Enter the 6-digit code sent to {newEmail}</p>
          </div>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            required
            className="w-full py-4 rounded-2xl bg-[#161616] border border-[#2C2C2C] focus:border-[#C9A227] focus:outline-none text-[#F5F2E8] text-center text-3xl tracking-[0.5em] font-bold"
          />
          <button
            type="submit"
            disabled={isSubmitting || otp.length !== 6}
            className="w-full py-4 rounded-2xl btn-gradient font-semibold disabled:opacity-60 flex items-center justify-center gap-3"
          >
            {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Confirming...</> : <><ShieldCheck className="w-5 h-5" /> Confirm Email Change</>}
          </button>
        </form>
      )}
    </div>
  );
}
