"use client";

import { motion } from "framer-motion";

import {
  CalendarDays,
  Clock3,
  MapPin,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function EventsPage() {
  const events = [
    {
      id: 1,

      title: "Opening Ceremony",

      date: "12 June 2026",

      time: "09:00 AM",

      location: "Grand Assembly Hall",

      description:
        "The official inauguration of MUNSphere Global Summit featuring keynote speakers, diplomatic welcomes, and delegate introductions.",

      highlight: "Global Inauguration",
    },

    {
      id: 2,

      title: "Diplomatic Debate Session",

      date: "13 June 2026",

      time: "11:30 AM",

      location: "Security Council Chamber",

      description:
        "Delegates engage in high-level geopolitical discussions, negotiations, and committee simulations.",

      highlight: "Committee Simulation",
    },

    {
      id: 3,

      title: "International Crisis Committee",

      date: "13 June 2026",

      time: "04:00 PM",

      location: "Crisis Operations Center",

      description:
        "Real-time crisis simulations testing diplomacy, strategic thinking, and international cooperation under pressure.",

      highlight: "Live Crisis Simulation",
    },

    {
      id: 4,

      title: "Networking & Cultural Evening",

      date: "14 June 2026",

      time: "07:00 PM",

      location: "Diplomatic Lounge",

      description:
        "Delegates connect, collaborate, and engage in intercultural networking experiences and social diplomacy.",

      highlight: "Global Networking",
    },

    {
      id: 5,

      title: "Closing Ceremony",

      date: "15 June 2026",

      time: "05:00 PM",

      location: "Main Summit Auditorium",

      description:
        "Awards, recognitions, closing statements, and celebration of leadership, diplomacy, and collaboration.",

      highlight: "Awards & Recognition",
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
            <Sparkles className="w-5 h-5 text-violet-400" />

            <span className="text-sm text-slate-300 tracking-wide">
              Summit Schedule • Sessions • Diplomatic Experiences
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
            Summit{" "}

            <span className="gradient-text">
              Events
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
            Explore immersive committee sessions, global networking
            experiences, diplomatic simulations, and high-level
            summit activities across the conference timeline.
          </motion.p>
        </div>
      </section>

      {/* =========================
          EVENTS TIMELINE
      ========================== */}
      <section className="section-padding px-6">

        <div className="container-custom">

          <div className="relative">

            {/* Vertical Timeline Line */}
            <div className="
              absolute
              left-1/2
              top-0
              bottom-0
              hidden
              lg:block
              w-[2px]
              bg-gradient-to-b
              from-violet-500
              via-cyan-500
              to-transparent
              opacity-30
              -translate-x-1/2
            " />

            <div className="space-y-14">

              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12,
                  }}
                  className={`
                    relative
                    flex
                    flex-col
                    lg:flex-row
                    items-center
                    gap-8
                    ${
                      index % 2 === 0
                        ? "lg:flex-row"
                        : "lg:flex-row-reverse"
                    }
                  `}
                >

                  {/* Timeline Dot */}
                  <div className="
                    hidden
                    lg:flex
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-6
                    h-6
                    rounded-full
                    bg-gradient-to-r
                    from-violet-500
                    to-cyan-500
                    shadow-[0_0_30px_rgba(124,58,237,0.7)]
                    z-20
                  " />

                  {/* Card */}
                  <div className="lg:w-1/2">

                    <motion.div
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

                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />

                      <div className="relative z-10">

                        {/* Highlight Badge */}
                        <div className="
                          inline-flex
                          items-center
                          gap-2
                          px-4
                          py-2
                          rounded-full
                          bg-white/5
                          border
                          border-white/10
                          text-sm
                          text-cyan-400
                          mb-6
                        ">
                          <Sparkles className="w-4 h-4" />

                          {event.highlight}
                        </div>

                        {/* Title */}
                        <h2 className="
                          text-3xl
                          font-bold
                          mb-6
                          leading-tight
                        ">
                          {event.title}
                        </h2>

                        {/* Meta Info */}
                        <div className="
                          flex
                          flex-wrap
                          gap-5
                          text-sm
                          text-slate-300
                          mb-6
                        ">

                          <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-violet-400" />
                            {event.date}
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock3 className="w-4 h-4 text-cyan-400" />
                            {event.time}
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-pink-400" />
                            {event.location}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="
                          text-slate-300
                          leading-relaxed
                          mb-8
                        ">
                          {event.description}
                        </p>

                        {/* Button */}
                        <button
                          className="
                            flex
                            items-center
                            gap-3
                            px-6
                            py-4
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
                          Learn More

                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
