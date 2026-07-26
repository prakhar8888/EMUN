"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, MapPin, Loader2, Sparkles } from "lucide-react";
import eventsService from "@/services/eventsService";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await eventsService.getEventBySlug(slug);
        setEvent(response?.data || null);
      } catch (err) {
        console.error("Fetch Event Error:", err);
        setError(err.message || "Failed to load this event.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchEvent();
  }, [slug]);

  const formatDate = (date) => {
    if (!date) return "TBA";
    return new Date(date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  };

  const daysUntil = (startDate) => {
    if (!startDate) return null;
    const diff = Math.ceil((new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : null;
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
          <p className="text-[#E5E7EB]">Loading event...</p>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          <h1 className="text-3xl font-bold text-[#D97B7B] mb-4">Event Not Found</h1>
          <p className="text-[#E5E7EB] mb-8">{error || "The requested event does not exist."}</p>
          <button onClick={() => router.push("/events")} className="px-6 py-3 rounded-xl btn-gradient font-semibold">
            Back to Events
          </button>
        </div>
      </main>
    );
  }

  const daysLeft = daysUntil(event.startDate);

  return (
    <main className="relative min-h-screen pt-28 pb-24 px-6 overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => router.push("/events")}
          className="flex items-center gap-2 text-[#E5E7EB] hover:text-[#E6C77A] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative h-72 md:h-96 rounded-[2rem] overflow-hidden border border-[#D4AF37]/[0.12] mb-8"
        >
          <img
            src={event.bannerUrl || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac"}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-black/20 to-transparent" />

          {daysLeft && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0A192F]/70 backdrop-blur-md border border-[#D4AF37]/30"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm font-semibold text-[#D4AF37]">{daysLeft} {daysLeft === 1 ? "day" : "days"} to go</span>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass rounded-[2rem] p-8 md:p-12"
        >
          {event.highlight && (
            <span className="inline-block text-xs font-semibold uppercase tracking-wide text-[#D4AF37] mb-4">
              {event.highlight}
            </span>
          )}

          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6 text-[#F8F6F0]">{event.title}</h1>

          <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-[#D4AF37]/[0.12] text-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <span>{formatDate(event.startDate)} — {formatDate(event.endDate)}</span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#F8F6F0] mb-3">About This Event</h2>
            <p className="text-[#E5E7EB] leading-relaxed whitespace-pre-wrap">{event.description}</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
