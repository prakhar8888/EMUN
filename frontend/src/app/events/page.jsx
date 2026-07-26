"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Loader2, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import eventsService from "@/services/eventsService";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await eventsService.getAllEvents();
      const list = response?.data || [];
      setEvents(list.filter((ev) => ev.isPublished !== false));
    } catch (err) {
      console.error("Fetch Events Error:", err);
      setError(err.message || "Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDate = (date) => {
    if (!date) return "TBA";
    return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  };

  const isUpcoming = (startDate) => {
    if (!startDate) return false;
    return new Date(startDate) > new Date();
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      <section className="relative pt-32 pb-20 px-6 text-center">
        <AnimatedBackground />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full mb-8"
          >
            <CalendarDays className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm uppercase tracking-[0.2em] text-[#E5E7EB]">Conference Schedule</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-black tracking-[-0.05em] leading-[0.95] mb-8"
          >
            Upcoming <span className="gradient-text">Events</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-lg md:text-2xl text-[#E5E7EB] max-w-2xl mx-auto leading-relaxed"
          >
            Explore Enigma MUN's official conferences and diplomatic summits.
            Select an event below to view full details, dates, and venue information.
          </motion.p>
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
            <p className="text-[#E5E7EB]">Loading events...</p>
          </div>
        )}

        {!loading && error && (
          <div className="glass rounded-3xl p-10 text-center max-w-xl mx-auto">
            <AlertCircle className="w-10 h-10 text-[#991B1B] mx-auto mb-4" />
            <p className="text-[#D97B7B] mb-6">{error}</p>
            <button onClick={fetchEvents} className="px-6 py-3 rounded-xl btn-gradient font-semibold">Retry</button>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="glass rounded-3xl p-12 text-center max-w-xl mx-auto">
            <CalendarDays className="w-14 h-14 text-[#9CA3AF] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#F8F6F0] mb-2">No Events Scheduled Yet</h3>
            <p className="text-[#9CA3AF]">Check back soon for upcoming MUN conferences and summits.</p>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group relative h-full"
              >
                <Link
                  href={`/events/${event.slug}`}
                  className="flex flex-col h-full rounded-[2rem] overflow-hidden border border-[#D4AF37]/[0.12] bg-[#112240] hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-[0_25px_70px_rgba(0,0,0,0.5)]"
                >
                  <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-[#D4AF37]/0 to-[#1E1B4B]/0 group-hover:from-[#D4AF37]/[0.05] group-hover:to-[#5B21B6]/[0.06] transition-all duration-500 pointer-events-none z-10" />

                  <div className="relative h-52 overflow-hidden shrink-0">
                    <img
                      src={event.bannerUrl || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac"}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-black/10 to-transparent" />

                    {isUpcoming(event.startDate) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A192F]/70 backdrop-blur-md border border-[#D4AF37]/30"
                      >
                        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">Upcoming</span>
                      </motion.div>
                    )}
                  </div>

                  <div className="relative z-10 p-8 flex flex-col flex-1">
                    {event.highlight && (
                      <span className="inline-block text-xs font-semibold uppercase tracking-wide text-[#D4AF37] mb-3 w-fit">
                        {event.highlight}
                      </span>
                    )}

                    <h2 className="text-2xl font-bold text-[#F8F6F0] mb-3 group-hover:text-[#E6C77A] transition-colors">
                      {event.title}
                    </h2>

                    <p className="text-[#E5E7EB] text-sm leading-relaxed mb-6 line-clamp-2">{event.description}</p>

                    <div className="space-y-2 text-sm text-[#9CA3AF] mt-auto">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
                      </div>
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 text-[#E6C77A] font-semibold text-sm">
                      View Details
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
