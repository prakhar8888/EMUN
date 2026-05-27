"use client";

import { motion } from "framer-motion";

import {
  Award,
  BookOpen,
  Globe,
  Mail,
  ExternalLink,
} from "lucide-react";

export default function FoundationPage() {
  const founders = [
    {
      id: "f1",
      name: "Eleanor Sterling",
      title: "Secretary-General & Founder",
      bio:
        "Former UN Youth Ambassador with extensive experience in international relations and diplomatic crisis management. Eleanor established MUNSphere to bridge academic diplomacy with real-world geopolitical thinking.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      contact: "secgen@munsphere.org",
      specialty: "Global Security & Disarmament",
    },

    {
      id: "f2",
      name: "Arthur Pendelton",
      title: "Director of Academics",
      bio:
        "A distinguished scholar of International Law. Arthur oversees the academic rigor of all committee background guides and ensures authentic parliamentary procedure simulations.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      contact: "academics@munsphere.org",
      specialty: "International Human Rights Law",
    },

    {
      id: "f3",
      name: "Julian Vance",
      title: "Director of Delegate Affairs",
      bio:
        "Julian focuses on delegate training, accessibility, and premium conference experiences through strategic organizational planning and diplomatic engagement systems.",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      contact: "delegates@munsphere.org",
      specialty: "Economic & Social Development",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden pt-28 pb-24 px-6">

      {/* =========================
          BACKGROUND EFFECTS
      ========================== */}
      <div className="absolute inset-0 z-0">

        <div className="
          blur-circle
          blur-purple
          w-[450px]
          h-[450px]
          top-[-120px]
          left-[-120px]
        " />

        <div className="
          blur-circle
          blur-cyan
          w-[400px]
          h-[400px]
          bottom-[-120px]
          right-[-120px]
        " />

        <div className="
          absolute
          inset-0
          grid-background
          opacity-[0.03]
        " />
      </div>

      {/* =========================
          PAGE HEADER
      ========================== */}
      <div className="
        relative
        z-10
        max-w-6xl
        mx-auto
        text-center
        mb-24
      ">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            inline-flex
            items-center
            gap-3
            glass
            px-6
            py-4
            rounded-full
            border
            border-white/10
            mb-10
          "
        >
          <Award className="
            w-6
            h-6
            text-cyan-400
          " />

          <span className="
            text-sm
            uppercase
            tracking-[0.2em]
            text-slate-300
          ">
            Leadership & Secretariat
          </span>
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="
            text-5xl
            md:text-7xl
            xl:text-8xl
            font-black
            tracking-[-0.05em]
            leading-[0.95]
            mb-8
          "
        >
          <span className="gradient-text">
            The Foundation
          </span>
        </motion.h1>

        <motion.div
          initial={{
            opacity: 0,
            width: 0,
          }}
          animate={{
            opacity: 1,
            width: "120px",
          }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          className="
            h-[4px]
            rounded-full
            bg-gradient-to-r
            from-violet-500
            to-cyan-400
            mx-auto
            mb-8
          "
        />

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.3,
          }}
          className="
            max-w-3xl
            mx-auto
            text-lg
            md:text-2xl
            text-slate-300
            leading-relaxed
          "
        >
          Meet the visionary leadership behind MUNSphere.
          A collective of diplomats, strategists, and
          academic innovators shaping the next generation
          of global discourse.
        </motion.p>
      </div>

      {/* =========================
          FOUNDERS
      ========================== */}
      <div className="
        relative
        z-10
        max-w-7xl
        mx-auto
        space-y-16
      ">

        {founders.map((founder, index) => (

          <motion.div
            key={founder.id}
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: index * 0.15,
            }}
            className="
              glass
              hover-card
              border
              border-white/10
              rounded-[32px]
              overflow-hidden
              relative
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-10
              p-8
              lg:p-12
              items-center
            "
          >

            {/* Glow Overlay */}
            <div className="
              absolute
              inset-0
              bg-gradient-to-br
              from-violet-500/5
              to-cyan-500/5
              opacity-0
              hover:opacity-100
              transition-opacity
              duration-700
            " />

            {/* IMAGE */}
            <div className="
              relative
              z-10
              flex
              justify-center
            ">
              <div className="
                relative
                w-[320px]
                h-[320px]
                rounded-[32px]
                overflow-hidden
                border
                border-white/10
                shadow-2xl
              ">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    hover:scale-105
                  "
                />

                <div className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/40
                  via-transparent
                  to-transparent
                " />
              </div>
            </div>

            {/* CONTENT */}
            <div className="
              relative
              z-10
            ">

              <div className="
                inline-flex
                items-center
                gap-2
                mb-5
              ">
                <div className="
                  w-2
                  h-2
                  rounded-full
                  bg-cyan-400
                  pulse-glow
                " />

                <span className="
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-slate-400
                ">
                  Secretariat Leadership
                </span>
              </div>

              <h2 className="
                text-4xl
                font-black
                mb-3
              ">
                {founder.name}
              </h2>

              <h3 className="
                text-cyan-400
                uppercase
                tracking-[0.2em]
                text-sm
                font-semibold
                mb-8
              ">
                {founder.title}
              </h3>

              <p className="
                text-slate-300
                leading-relaxed
                text-lg
                mb-10
              ">
                {founder.bio}
              </p>

              {/* Expertise */}
              <div className="
                flex
                items-center
                gap-3
                mb-8
                glass
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
                w-fit
              ">
                <BookOpen className="
                  w-5
                  h-5
                  text-violet-400
                " />

                <span className="
                  text-slate-300
                  text-sm
                  uppercase
                  tracking-[0.15em]
                ">
                  {founder.specialty}
                </span>
              </div>

              {/* Actions */}
              <div className="
                flex
                flex-wrap
                items-center
                gap-4
              ">

                <a
                  href={`mailto:${founder.contact}`}
                  className="
                    inline-flex
                    items-center
                    gap-3
                    px-6
                    py-3
                    rounded-2xl
                    bg-gradient-to-r
                    from-violet-600
                    to-cyan-500
                    hover:scale-105
                    transition-all
                    duration-300
                    font-semibold
                    shadow-xl
                  "
                >
                  <Mail className="
                    w-5
                    h-5
                  " />

                  Contact
                </a>

                <a
                  href="#"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    px-6
                    py-3
                    rounded-2xl
                    glass
                    border
                    border-white/10
                    hover:border-cyan-400/40
                    hover:scale-105
                    transition-all
                    duration-300
                    text-slate-300
                  "
                >
                  <ExternalLink className="
                    w-5
                    h-5
                  " />

                  Profile
                </a>

                <a
                  href="#"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    px-6
                    py-3
                    rounded-2xl
                    glass
                    border
                    border-white/10
                    hover:border-violet-400/40
                    hover:scale-105
                    transition-all
                    duration-300
                    text-slate-300
                  "
                >
                  <Globe className="
                    w-5
                    h-5
                  " />

                  Global Work
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
