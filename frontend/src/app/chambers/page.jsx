"use client";

import { motion } from "framer-motion";

import {
  Shield,
  Globe,
  Scale,
  Landmark,
  Briefcase,
  ChevronRight,
} from "lucide-react";

export default function ChambersPage() {
  const chambers = [
    {
      id: 1,
      name: "United Nations Security Council",
      agenda:
        "Addressing global conflicts, geopolitical instability, and international peacekeeping operations.",
      icon: <Shield className="w-8 h-8 text-violet-400" />,
      delegates: "15 Nations",
      category: "Security & Defense",
    },

    {
      id: 2,
      name: "World Health Organization",
      agenda:
        "Strengthening international healthcare systems and responding to future global health crises.",
      icon: <Globe className="w-8 h-8 text-cyan-400" />,
      delegates: "194 Member States",
      category: "Global Healthcare",
    },

    {
      id: 3,
      name: "UN Human Rights Council",
      agenda:
        "Protecting civil liberties, humanitarian law, and human rights in conflict regions.",
      icon: <Scale className="w-8 h-8 text-pink-400" />,
      delegates: "47 Nations",
      category: "Human Rights",
    },

    {
      id: 4,
      name: "International Court of Justice",
      agenda:
        "Resolving disputes between sovereign states under international legal frameworks.",
      icon: <Landmark className="w-8 h-8 text-amber-400" />,
      delegates: "Global Judiciary",
      category: "International Law",
    },

    {
      id: 5,
      name: "UN Economic & Social Council",
      agenda:
        "Driving sustainable development, economic cooperation, and social advancement worldwide.",
      icon: <Briefcase className="w-8 h-8 text-emerald-400" />,
      delegates: "54 Nations",
      category: "Economic Affairs",
    },
  ];

  return (
    <div className="relative overflow-hidden">

      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="relative pt-32 pb-24 px-6">

        {/* Background Effects */}
        <div className="absolute inset-0 z-0">

          <div className="blur-circle blur-purple w-[350px] h-[350px] top-0 left-0" />

          <div className="blur-circle blur-cyan w-[300px] h-[300px] bottom-0 right-0" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="
              inline-flex
              items-center
              gap-3
              glass
              px-6
              py-3
              rounded-full
              mb-8
            "
          >
            <Landmark className="w-5 h-5 text-violet-400" />

            <span className="text-sm text-slate-300 tracking-wide">
              Global Governance • Diplomacy • International Debate
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              mb-8
            "
          >
            Committees &{" "}

            <span className="gradient-text">
              Chambers
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="
              text-lg
              md:text-2xl
              text-slate-300
              max-w-3xl
              mx-auto
              leading-relaxed
            "
          >
            Engage in high-level international discussions through
            immersive committee simulations inspired by real-world
            United Nations bodies and global institutions.
          </motion.p>
        </div>
      </section>

      {/* =========================
          CHAMBERS GRID
      ========================== */}
      <section className="section-padding px-6">

        <div className="container-custom">

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {chambers.map((chamber, index) => (
              <motion.div
                key={chamber.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                whileHover={{ y: -10 }}
                className="
                  glass
                  hover-card
                  rounded-[2rem]
                  p-8
                  border
                  border-white/10
                  relative
                  overflow-hidden
                  group
                "
              >

                {/* Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Top */}
                <div className="relative z-10">

                  <div className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    mb-8
                  ">
                    {chamber.icon}
                  </div>

                  {/* Category */}
                  <p className="
                    text-cyan-400
                    text-sm
                    uppercase
                    tracking-[0.2em]
                    mb-4
                  ">
                    {chamber.category}
                  </p>

                  {/* Title */}
                  <h2 className="
                    text-2xl
                    font-bold
                    leading-snug
                    mb-5
                  ">
                    {chamber.name}
                  </h2>

                  {/* Agenda */}
                  <p className="
                    text-slate-300
                    leading-relaxed
                    mb-8
                  ">
                    {chamber.agenda}
                  </p>

                  {/* Bottom */}
                  <div className="
                    flex
                    items-center
                    justify-between
                    pt-6
                    border-t
                    border-white/10
                  ">

                    <div>
                      <p className="text-sm text-slate-400">
                        Representation
                      </p>

                      <p className="font-semibold">
                        {chamber.delegates}
                      </p>
                    </div>

                    <button
                      className="
                        flex
                        items-center
                        gap-2
                        px-5
                        py-3
                        rounded-xl
                        bg-gradient-to-r
                        from-violet-600
                        to-cyan-500
                        hover:scale-105
                        transition-all
                        duration-300
                        font-medium
                        shadow-lg
                      "
                    >
                      View

                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
