"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ShieldCheck, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export default function SuperAdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (logout) {
        logout();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await login(email, password);

      if (!result.success) {
        setError(result.message || "Authentication failed. Please check your credentials.");
        setIsSubmitting(false);
        return;
      }

      // This entry point is exclusively for the ADMIN role. A valid
      // SECRETARIAT login is rejected here even though the password
      // was correct, and redirected to their own dedicated page.
      const role = result.user?.role?.toUpperCase();

      if (role === "ADMIN") {
        setTimeout(() => {
          router.push("/admin");
        }, 100);
      } else if (role === "SECRETARIAT") {
        logout();
        setError("Secretariat accounts should log in through the staff portal.");
        setIsSubmitting(false);
      } else {
        logout();
        setError("Access Denied. This account does not have administrative access.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("An unexpected error occurred during authentication.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-20">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-xl glass rounded-[32px] p-8 md:p-12 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#C9A227] to-[#D4AF37] mb-6 shadow-xl">
            <ShieldCheck className="w-10 h-10 text-[#090909]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-[-0.04em] mb-4 text-[#F5F2E8]">
            Super Admin Login
          </h1>
          <p className="text-[#C8CDD5] text-lg leading-relaxed">
            Exclusive, permanent access for the Enigma MUN Secretary-General.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-[#7A263A] bg-[#5C1F24]/15 px-5 py-4 text-[#C97A87]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-3 text-sm uppercase tracking-[0.15em] text-[#7D8793]">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7D8793]" />
              <input
                type="email"
                placeholder="admin@enigmamun.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#161616] border border-[#2C2C2C] focus:border-[#C9A227] focus:outline-none text-[#F5F2E8] placeholder:text-[#7D8793] transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm uppercase tracking-[0.15em] text-[#7D8793]">
                Admin Password
              </label>
              <Link
                href="/enigma-secretariat-portal/forgot-password"
                className="text-sm text-[#D4AF37] hover:text-[#F0D777] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7D8793]" />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#161616] border border-[#2C2C2C] focus:border-[#C9A227] focus:outline-none text-[#F5F2E8] placeholder:text-[#7D8793] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl btn-gradient font-semibold text-lg shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</>
            ) : (
              <><ShieldCheck className="w-5 h-5" /> Access Dashboard</>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
