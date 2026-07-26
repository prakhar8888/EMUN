"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Send, MessageSquare, CheckCircle2, Sparkles,
} from "lucide-react";

import { feedbackService } from "../../services/feedbackService";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [formData, setFormData] = useState({ name: "", comment: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      alert("Please select a rating before submission.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = { fullName: formData.name, message: formData.comment, rating: rating };
      await feedbackService.submitFeedback(payload);

      setIsSubmitted(true);
      setFormData({ name: "", comment: "" });
      setRating(0);

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error("Submission failed:", err);
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <section className="relative pt-32 pb-20 px-6">
        <AnimatedBackground />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full mb-8">
            <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm text-[#E5E7EB] tracking-wide">Delegate Insights • Conference Review • Experience Feedback</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-5xl md:text-7xl font-black leading-tight mb-8">
            Delegate <span className="gradient-text">Feedback</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }} className="text-lg md:text-2xl text-[#E5E7EB] max-w-3xl mx-auto leading-relaxed">
            Your insights help shape the future of Enigma MUN. Share your summit experience,
            committee observations, and recommendations with the Secretariat.
          </motion.p>
        </div>
      </section>

      <section className="relative section-padding px-6 pt-0">
        <div className="container-custom max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="glass rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/[0.02] to-[#5B21B6]/[0.06]" />

            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#0A192F]/95 backdrop-blur-xl z-30 flex flex-col items-center justify-center text-center px-8"
                >
                  <motion.div
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-24 h-24 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(212,175,55,0.35)]"
                  >
                    <CheckCircle2 className="w-12 h-12 text-[#0A192F]" />
                  </motion.div>

                  <h3 className="text-4xl font-black mb-4 text-[#F8F6F0]">Thank You</h3>
                  <p className="text-[#E5E7EB] max-w-md leading-relaxed">
                    Your feedback has been successfully recorded and forwarded to the Secretariat review panel.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#0F1F38] border border-[#D4AF37]/[0.18] mb-6">
                  <Sparkles className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <h2 className="text-4xl font-black mb-4 text-[#F8F6F0]">Share Your Experience</h2>
                <p className="text-[#E5E7EB] leading-relaxed">
                  Help us improve future conferences through constructive feedback and delegate insights.
                </p>
              </div>

              {error && (
                <div className="rounded-xl border border-[#6D071A] bg-[#6D071A]/15 px-5 py-4 text-[#E8A5A5] text-center">{error}</div>
              )}

              <div className="text-center">
                <label className="block text-sm uppercase tracking-[0.25em] text-[#E5E7EB] mb-6">Overall Conference Rating</label>
                <div className="flex justify-center gap-4 flex-wrap">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        key={starValue}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-12 h-12 transition-all duration-300 ${
                            starValue <= (hover || rating)
                              ? "fill-[#D4AF37] text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                              : "fill-transparent text-[#1F2937]"
                          }`}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-8 pt-8 border-t border-[#D4AF37]/[0.12]">
                <InputField label="Delegate Name (Optional)" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Anderson" />

                <div>
                  <label className="block text-sm uppercase tracking-[0.2em] text-[#E5E7EB] mb-3">Comments & Suggestions *</label>
                  <textarea
                    name="comment" value={formData.comment} onChange={handleInputChange} required rows="6"
                    placeholder="Share your thoughts on committees, organization, logistics, and overall summit experience..."
                    className="w-full rounded-2xl bg-[#0F1F38] border border-[#D4AF37]/[0.18] px-5 py-4 text-[#F8F6F0] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition resize-none"
                  />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full py-5 rounded-2xl btn-gradient font-semibold shadow-2xl flex items-center justify-center gap-3 disabled:opacity-60">
                {isSubmitting ? "Submitting Feedback..." : (<>Submit Feedback<Send className="w-5 h-5" /></>)}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function InputField({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm uppercase tracking-[0.2em] text-[#E5E7EB] mb-3">{label}</label>
      <input
        type="text" name={name} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full rounded-2xl bg-[#0F1F38] border border-[#D4AF37]/[0.18] px-5 py-4 text-[#F8F6F0] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition"
      />
    </div>
  );
}
