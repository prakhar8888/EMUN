"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  CalendarDays,
  Users,
  Building2,
  MessageSquare,
  Mail,
  UserPlus,
  UserCog,
  Settings,
  LogOut,
  ArrowRight,
} from "lucide-react";

import ProtectedRoute from "../../components/common/ProtectedRoute";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export default function AdminPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const isAdmin = user?.role === "ADMIN";

  const handleLogout = () => {
    logout();
    router.push(isAdmin ? "/enigma-secretariat-portal" : "/staff-portal-access");
  };

  const allCards = [
    {
      title: "Manage Events",
      description: "Create, edit, and organize upcoming MUN conferences and diplomatic sessions.",
      icon: CalendarDays,
      route: "/admin/events",
      permission: "canManageEvents",
    },
    {
      title: "Registrations",
      description: "Review delegate registrations and participant submissions.",
      icon: Users,
      route: "/admin/registrations",
      permission: "canManageRegistrations",
    },
    {
      title: "Committee Control",
      description: "Manage committees, agendas, and background guides.",
      icon: Building2,
      route: "/admin/committees",
      permission: "canManageCommittees",
    },
    {
      title: "Feedback Review",
      description: "Monitor delegate feedback and improve conference experience.",
      icon: MessageSquare,
      route: "/admin/feedback",
      permission: "canManageFeedback",
    },
    {
      title: "Contact Dispatches",
      description: "View and manage messages submitted through the public Connect page.",
      icon: Mail,
      route: "/admin/connect",
      permission: "canManageContact",
    },
    {
      title: "Create Staff Account",
      description: "Submit a new staff access request with a specific permission set.",
      icon: UserPlus,
      route: "/admin/staff",
      permission: "canCreateStaff",
    },
    {
      title: "Staff Management",
      description: "Approve pending requests, adjust permissions, and revoke access.",
      icon: UserCog,
      route: "/admin/staff-management",
      permission: "canCreateStaff",
    },
  ];

  const dashboardCards = isAdmin
    ? allCards
    : allCards.filter((card) => user?.[card.permission] === true);

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="relative min-h-screen overflow-hidden pt-28 pb-24 px-6">

        <AnimatedBackground />

        <div className="relative z-10 max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-16"
          >
            <div>
              <div className="inline-flex items-center gap-3 glass px-5 py-3 rounded-full mb-6">
                <ShieldCheck className="w-5 h-5 text-[#C9A227]" />
                <span className="text-sm uppercase tracking-[0.2em] text-[#C8CDD5]">
                  Administrative Control Center
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black tracking-[-0.05em] leading-[0.95] mb-5">
                Welcome,
                <span className="gradient-text ml-3">{user?.fullName}</span>
              </h1>

              <p className="text-[#C8CDD5] text-lg max-w-2xl leading-relaxed">
                Manage conferences, registrations, committees, and diplomatic operations
                through the secure Enigma MUN administrative dashboard.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/admin/settings")}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#161616] border border-[#2C2C2C] hover:border-[#C9A227]/40 transition-all duration-300 text-[#C8CDD5] hover:text-[#F5F2E8] font-medium"
              >
                <Settings className="w-5 h-5" />
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#5C1F24]/15 border border-[#7A263A] hover:bg-[#5C1F24]/25 transition-all duration-300 text-[#C97A87] font-medium"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="rounded-3xl p-8 border border-[#2A2A2A] bg-[#111111]">
              <p className="text-[#7D8793] uppercase tracking-[0.15em] text-sm mb-4">Role</p>
              <h2 className="text-4xl font-black text-[#F5F2E8]">{user?.role}</h2>
            </div>

            <div className="rounded-3xl p-8 border border-[#2A2A2A] bg-[#111111]">
              <p className="text-[#7D8793] uppercase tracking-[0.15em] text-sm mb-4">Security Status</p>
              <h2 className="text-4xl font-black text-[#3FA07A]">Active</h2>
            </div>

            <div className="rounded-3xl p-8 border border-[#2A2A2A] bg-[#111111]">
              <p className="text-[#7D8793] uppercase tracking-[0.15em] text-sm mb-4">Access Level</p>
              <h2 className="text-4xl font-black text-[#F5F2E8]">{isAdmin ? "Full" : "Limited"}</h2>
            </div>
          </motion.div>

          {dashboardCards.length === 0 ? (
            <div className="rounded-[32px] border border-[#2A2A2A] bg-[#111111] p-12 text-center">
              <ShieldCheck className="w-14 h-14 text-[#7D8793] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#F5F2E8] mb-2">No Modules Assigned Yet</h3>
              <p className="text-[#7D8793] max-w-md mx-auto">
                Your account doesn't have access to any modules yet. Contact
                an administrator to have permissions assigned to your account.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {dashboardCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.06 }}
                    onClick={() => router.push(card.route)}
                    className="group relative rounded-[32px] p-8 border border-[#2A2A2A] bg-[#111111] cursor-pointer overflow-hidden hover:border-[#C9A227]/40 transition-all duration-500"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#C9A227]/[0.04] to-[#0D1B2A]/15" />

                    <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#C9A227] to-[#D4AF37] mb-8 shadow-2xl">
                      <Icon className="w-10 h-10 text-[#090909]" />
                    </div>

                    <div className="relative z-10">
                      <h2 className="text-2xl font-black mb-4 text-[#F5F2E8]">{card.title}</h2>
                      <p className="text-[#C8CDD5] leading-relaxed mb-8">{card.description}</p>

                      <div className="inline-flex items-center gap-3 text-[#D4AF37] font-medium">
                        Access Module
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                      </div>
                    </div>
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
