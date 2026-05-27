"use client";

import { motion } from "framer-motion";

import {
  BookOpen,
  Target,
  Shield,
  Landmark,
  Globe,
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Academic Excellence",
      description:
        "We maintain rigorous standards of debate, diplomacy, research, and policy drafting inspired by real United Nations procedures.",
      icon: <BookOpen className="w-7 h-7 text-violet-400" />,
    },

    {
      title: "Diplomatic Integrity",
      description:
        "Every delegate is encouraged to embrace collaboration, respect, and international cooperation across diverse perspectives.",
      icon: <Shield className="w-7 h-7 text-cyan-400" />,
    },

    {
      title: "Global Perspective",
      description:
        "We empower future leaders to analyze geopolitical realities beyond borders and think on a truly international scale.",
      icon: <Globe className="w-7 h-7 text-pink-400" />,
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
              Diplomacy • Leadership • Global Collaboration
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
            Building the Future of{" "}

            <span className="gradient-text">
              Global Diplomacy
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
            MUNSphere is a premier international platform empowering
            students, diplomats, and future leaders through immersive
            Model United Nations experiences and strategic global dialogue.
          </motion.p>
        </div>
      </section>

      {/* =========================
          MISSION SECTION
      ========================== */}
      <section className="section-padding px-6">

        <div className="container-custom">

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="
              glass
              rounded-[2rem]
              p-10
              md:p-16
              border
              border-white/10
              relative
              overflow-hidden
            "
          >

            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10" />

            <div className="relative z-10 text-center max-w-4xl mx-auto">

              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
                <Target className="w-10 h-10 text-violet-400" />
              </div>

              <h2 className="section-title mb-8">
                Our Mission
              </h2>

              <p className="text-2xl md:text-3xl text-slate-200 leading-relaxed font-light">
                “To cultivate globally aware leaders through diplomacy,
                strategic debate, critical thinking, and collaborative
                international problem-solving.”
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================
          HISTORY SECTION
      ========================== */}
      <section className="section-padding px-6">

        <div className="container-custom">

          <div className="grid lg:grid-cols-12 gap-16">

            {/* Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4"
            >

              <div className="sticky top-32">

                <p className="text-cyan-400 uppercase tracking-[0.25em] text-sm mb-4">
                  Our Legacy
                </p>

                <h2 className="section-title mb-6">
                  A Tradition of Excellence
                </h2>

                <div className="w-24 h-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
              </div>
            </motion.div>

            {/* Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="
                lg:col-span-8
                glass
                rounded-[2rem]
                p-10
                border
                border-white/10
              "
            >

              <div className="space-y-8 text-lg text-slate-300 leading-loose">

                <p>
                  MUNSphere was founded with the vision of creating an
                  elite diplomatic platform where students could experience
                  the intensity, complexity, and collaboration of global
                  governance systems.
                </p>

                <p>
                  Over the years, our conferences have evolved into
                  high-level simulations featuring crisis committees,
                  geopolitical debates, policy drafting, and strategic
                  international negotiations.
                </p>

                <p>
                  Today, MUNSphere continues to bridge the gap between
                  academic learning and real-world diplomacy by preparing
                  future leaders for international collaboration,
                  policymaking, and statesmanship.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================
          CORE VALUES
      ========================== */}
      <section className="section-padding px-6">

        <div className="container-custom">

          <div className="text-center mb-20">

            <p className="text-cyan-400 uppercase tracking-[0.25em] text-sm mb-4">
              What Defines Us
            </p>

            <h2 className="section-title">
              Core Values
            </h2>

            <p className="section-subtitle mx-auto">
              Principles that shape every conference,
              debate, and diplomatic interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className="
                  glass
                  hover-card
                  rounded-[2rem]
                  p-8
                  border
                  border-white/10
                  relative
                  overflow-hidden
                "
              >

                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition duration-500" />

                <div className="relative z-10">

                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                    {value.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    {value.title}
                  </h3>

                  <p className="text-slate-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
