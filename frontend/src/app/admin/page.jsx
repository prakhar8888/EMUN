"use client";

import { motion } from "framer-motion";

import {
  ShieldCheck,
  CalendarDays,
  Users,
  Building2,
  MessageSquare,
  LogOut,
  ArrowRight,
} from "lucide-react";

import ProtectedRoute from "../../components/common/ProtectedRoute";

import { useAuth } from "../../context/AuthContext";

import { useRouter } from "next/navigation";

export default function AdminPage() {

  // ======================================
  // AUTH
  // ======================================

  const {
    user,
    logout,
  } = useAuth();


  // ======================================
  // ROUTER
  // ======================================

  const router = useRouter();


  // ======================================
  // HANDLE LOGOUT
  // ======================================

  const handleLogout = () => {

    logout();

    router.push("/login");
  };


  // ======================================
  // DASHBOARD CARDS
  // ======================================

  const dashboardCards = [

    {
      title: "Manage Events",

      description:
        "Create, edit, and organize upcoming MUN conferences and diplomatic sessions.",

      icon: CalendarDays,

      gradient:
        "from-violet-600 to-fuchsia-500",

      route: "/events",
    },

    {
      title: "Registrations",

      description:
        "Review delegate registrations and participant submissions.",

      icon: Users,

      gradient:
        "from-cyan-500 to-blue-500",

      route: "/register",
    },

    {
      title: "Chambers Control",

      description:
        "Manage committees, agendas, and chamber information.",

      icon: Building2,

      gradient:
        "from-emerald-500 to-teal-500",

      route: "/chambers",
    },

    {
      title: "Feedback Review",

      description:
        "Monitor delegate feedback and improve conference experience.",

      icon: MessageSquare,

      gradient:
        "from-orange-500 to-amber-500",

      route: "/feedback",
    },
  ];


  return (
    <ProtectedRoute adminOnly={true}>

      <div className="
        relative
        min-h-screen
        overflow-hidden
        pt-28
        pb-24
        px-6
      ">

        {/* =========================
            BACKGROUND EFFECTS
        ========================== */}

        <div className="
          absolute
          inset-0
          z-0
        ">

          {/* Purple Glow */}
          <div className="
            blur-circle
            blur-purple
            w-[420px]
            h-[420px]
            top-[-120px]
            left-[-120px]
          " />

          {/* Cyan Glow */}
          <div className="
            blur-circle
            blur-cyan
            w-[360px]
            h-[360px]
            bottom-[-120px]
            right-[-120px]
          " />

          {/* Grid */}
          <div className="
            absolute
            inset-0
            grid-background
            opacity-[0.03]
          " />

        </div>


        {/* =========================
            PAGE CONTENT
        ========================== */}

        <div className="
          relative
          z-10
          max-w-7xl
          mx-auto
        ">

          {/* =========================
              HEADER
          ========================== */}

          <motion.div

            initial={{
              opacity: 0,
              y: 30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.8,
            }}

            className="
              flex
              flex-col
              lg:flex-row
              items-start
              lg:items-center
              justify-between
              gap-8
              mb-16
            "
          >

            {/* LEFT */}

            <div>

              <div className="
                inline-flex
                items-center
                gap-3
                glass
                px-5
                py-3
                rounded-full
                border
                border-white/10
                mb-6
              ">

                <ShieldCheck className="
                  w-5
                  h-5
                  text-cyan-400
                " />

                <span className="
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-slate-300
                ">
                  Administrative Control Center
                </span>

              </div>


              <h1 className="
                text-5xl
                md:text-6xl
                font-black
                tracking-[-0.05em]
                leading-[0.95]
                mb-5
              ">

                Welcome,
                <span className="
                  gradient-text
                  ml-3
                ">
                  {user?.fullName}
                </span>

              </h1>


              <p className="
                text-slate-300
                text-lg
                max-w-2xl
                leading-relaxed
              ">

                Manage conferences, registrations,
                chambers, and diplomatic operations
                through the secure MUNSphere
                administrative dashboard.

              </p>
            </div>


            {/* RIGHT */}

            <button
              onClick={handleLogout}

              className="
                inline-flex
                items-center
                gap-3
                px-6
                py-4
                rounded-2xl
                bg-red-500/10
                border
                border-red-500/20
                hover:bg-red-500/20
                transition-all
                duration-300
                text-red-300
                font-medium
              "
            >

              <LogOut className="
                w-5
                h-5
              " />

              Logout

            </button>

          </motion.div>


          {/* =========================
              STATS
          ========================== */}

          <motion.div

            initial={{
              opacity: 0,
              y: 30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.8,
              delay: 0.1,
            }}

            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-6
              mb-16
            "
          >

            {/* USERS */}

            <div className="
              glass
              border
              border-white/10
              rounded-3xl
              p-8
            ">

              <p className="
                text-slate-400
                uppercase
                tracking-[0.15em]
                text-sm
                mb-4
              ">
                Role
              </p>

              <h2 className="
                text-4xl
                font-black
              ">
                {user?.role}
              </h2>

            </div>


            {/* STATUS */}

            <div className="
              glass
              border
              border-white/10
              rounded-3xl
              p-8
            ">

              <p className="
                text-slate-400
                uppercase
                tracking-[0.15em]
                text-sm
                mb-4
              ">
                Security Status
              </p>

              <h2 className="
                text-4xl
                font-black
                text-emerald-400
              ">
                Active
              </h2>

            </div>


            {/* ACCESS */}

            <div className="
              glass
              border
              border-white/10
              rounded-3xl
              p-8
            ">

              <p className="
                text-slate-400
                uppercase
                tracking-[0.15em]
                text-sm
                mb-4
              ">
                Access Level
              </p>

              <h2 className="
                text-4xl
                font-black
              ">
                Full
              </h2>

            </div>

          </motion.div>


          {/* =========================
              DASHBOARD GRID
          ========================== */}

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-8
          ">

            {dashboardCards.map(
              (
                card,
                index
              ) => {

                const Icon =
                  card.icon;

                return (

                  <motion.div
                    key={card.title}

                    initial={{
                      opacity: 0,
                      y: 40,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                    }}

                    transition={{
                      duration: 0.8,
                      delay:
                        index * 0.12,
                    }}

                    onClick={() =>
                      router.push(
                        card.route
                      )
                    }

                    className="
                      group
                      relative
                      glass
                      border
                      border-white/10
                      rounded-[32px]
                      p-8
                      cursor-pointer
                      overflow-hidden
                      hover:border-cyan-400/30
                      transition-all
                      duration-500
                    "
                  >

                    {/* Glow */}

                    <div className={`
                      absolute
                      inset-0
                      opacity-0
                      group-hover:opacity-10
                      transition-opacity
                      duration-500
                      bg-gradient-to-br
                      ${card.gradient}
                    `} />


                    {/* Icon */}

                    <div className={`
                      relative
                      z-10
                      inline-flex
                      items-center
                      justify-center
                      w-20
                      h-20
                      rounded-3xl
                      bg-gradient-to-br
                      ${card.gradient}
                      mb-8
                      shadow-2xl
                    `}>

                      <Icon className="
                        w-10
                        h-10
                        text-white
                      " />

                    </div>


                    {/* Content */}

                    <div className="
                      relative
                      z-10
                    ">

                      <h2 className="
                        text-3xl
                        font-black
                        mb-4
                      ">
                        {card.title}
                      </h2>

                      <p className="
                        text-slate-300
                        leading-relaxed
                        mb-8
                      ">
                        {card.description}
                      </p>


                      {/* Button */}

                      <div className="
                        inline-flex
                        items-center
                        gap-3
                        text-cyan-400
                        font-medium
                      ">

                        Access Module

                        <ArrowRight className="
                          w-5
                          h-5
                          transition-transform
                          duration-300
                          group-hover:translate-x-2
                        " />

                      </div>

                    </div>

                  </motion.div>
                );
              }
            )}

          </div>

        </div>
      </div>

    </ProtectedRoute>
  );
}
