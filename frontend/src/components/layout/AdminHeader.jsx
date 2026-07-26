"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Settings, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    // Route back to the correct login page based on the account's
    // actual role, rather than a single hardcoded login URL.
    const isAdmin = user?.role?.toUpperCase() === "ADMIN";
    logout();
    router.push(isAdmin ? "/enigma-secretariat-portal" : "/staff-portal-access");
  };

  const isActive = (href) => pathname === href;

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 bg-[#111111]/90 backdrop-blur-2xl border-b border-[#2A2A2A]"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

        <Link href="/admin" className="flex items-center gap-3 shrink-0">
          <div className="relative w-11 h-11 shrink-0">
            <Image
              src="/logo.png"
              alt="Enigma MUN"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-lg font-black gradient-text leading-none">EnigmaMUN</p>
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#7D8793] mt-1">Admin Panel</p>
          </div>
        </Link>

        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/admin"
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive("/admin")
                  ? "bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-[#090909]"
                  : "text-[#C8CDD5] hover:bg-[#161616]"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>

            <Link
              href="/admin/settings"
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive("/admin/settings")
                  ? "bg-gradient-to-r from-[#C9A227] to-[#D4AF37] text-[#090909]"
                  : "text-[#C8CDD5] hover:bg-[#161616]"
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#161616] border border-[#2C2C2C]">
                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                <span className="text-sm text-[#C8CDD5]">{user?.fullName}</span>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5C1F24]/15 border border-[#7A263A] hover:bg-[#5C1F24]/25 transition-all text-[#C97A87] text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <div className="text-xs uppercase tracking-[0.2em] text-[#7D8793]">
              Administrative Access
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
