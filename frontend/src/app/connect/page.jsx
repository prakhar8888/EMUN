"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, MapPin, Phone, Send, Building2, CheckCircle2, AlertCircle, Loader2, X, ChevronDown,
} from "lucide-react";

import AnimatedBackground from "@/components/common/AnimatedBackground";
import { submitContactMessage } from "@/services/connectService";

const COUNTRIES = [
  { name: "India", code: "IN", dial: "+91" },
  { name: "United States", code: "US", dial: "+1" },
  { name: "United Kingdom", code: "GB", dial: "+44" },
  { name: "Canada", code: "CA", dial: "+1" },
  { name: "Australia", code: "AU", dial: "+61" },
  { name: "Germany", code: "DE", dial: "+49" },
  { name: "France", code: "FR", dial: "+33" },
  { name: "United Arab Emirates", code: "AE", dial: "+971" },
  { name: "Singapore", code: "SG", dial: "+65" },
  { name: "Japan", code: "JP", dial: "+81" },
].sort((a, b) => a.name.localeCompare(b.name));

const MAX_WORDS = 200;

export default function ConnectPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", dialCode: "+91", phone: "", subject: "", message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [isDialOpen, setIsDialOpen] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "message") {
      const words = value.trim().split(/\s+/).filter(Boolean);
      if (words.length > MAX_WORDS) {
        const trimmed = words.slice(0, MAX_WORDS).join(" ");
        setFormData((prev) => ({ ...prev, message: trimmed }));
        setWordCount(MAX_WORDS);
        return;
      }
      setWordCount(words.length);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await submitContactMessage({
        name: formData.name, email: formData.email, phone: `${formData.dialCode} ${formData.phone}`,
        subject: formData.subject, message: formData.message,
      });

      setToast({ type: "success", text: response.message || "Message transmitted successfully. The Secretariat will respond shortly." });
      setFormData({ name: "", email: "", dialCode: "+91", phone: "", subject: "", message: "" });
      setWordCount(0);
    } catch (error) {
      console.error("Contact Submission Error:", error);
      setToast({ type: "error", text: error.message || "Failed to send your message. Please try again." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToast(null), 5000);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -30, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -30, x: "-50%" }}
            transition={{ duration: 0.4 }}
            className={`fixed top-24 left-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl border shadow-2xl backdrop-blur-xl max-w-md ${toast.type === "success" ? "bg-[#065F46]/90 border-[#065F46]" : "bg-[#6D071A]/90 border-[#6D071A]"}`}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5 text-[#8FCBAE] shrink-0" /> : <AlertCircle className="w-5 h-5 text-[#E8A5A5] shrink-0" />}
            <p className={toast.type === "success" ? "text-[#E4F3EC] text-sm" : "text-[#F3DBE0] text-sm"}>{toast.text}</p>
            <button onClick={() => setToast(null)} className="ml-auto text-current opacity-60 hover:opacity-100"><X className="w-4 h-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative pt-32 pb-20 px-6">
        <AnimatedBackground />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full mb-8">
            <Mail className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm text-[#E5E7EB] tracking-wide">Secretariat • Communication</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Contact the <span className="gradient-text">Secretariat</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }} className="text-lg text-[#E5E7EB] max-w-2xl mx-auto leading-relaxed">
            Have a question or want to get in touch? Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </section>

      <section className="relative section-padding px-6">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 rounded-[2rem] p-8 border border-[#D4AF37]/[0.12] bg-[#112240] relative overflow-hidden lg:sticky lg:top-32"
            >
              <div className="absolute top-0 right-0 opacity-[0.04]"><Building2 className="w-40 h-40" /></div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#E6C77A] flex items-center justify-center mb-6">
                  <Building2 className="w-7 h-7 text-[#0A192F]" />
                </div>

                <h3 className="text-2xl font-bold mb-8 text-[#F8F6F0]">Secretary Headquarters</h3>

                <div className="space-y-6 text-[#E5E7EB]">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                    <div>Lucknow, Uttar Pradesh<br />India</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <span>+91 96969 04321</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <a href="mailto:secretariat@enigmamun.org" className="hover:text-[#E6C77A] transition-colors">secretariat@enigmamun.org</a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-3 glass rounded-[2rem] p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-3 text-[#F8F6F0]">Send a Dispatch</h2>
              <p className="text-[#E5E7EB] mb-8 leading-relaxed">Fill out the form and our Secretariat will get back to you.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput label="Full Name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Anderson" />
                  <FormInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-[#E5E7EB] mb-3 font-semibold">Phone Number</label>
                  <div className="flex gap-3">
                    <div className="relative shrink-0 w-28">
                      <button
                        type="button"
                        onClick={() => setIsDialOpen((p) => !p)}
                        className="w-full h-14 rounded-2xl bg-[#0F1F38] border border-[#D4AF37]/[0.18] text-[#F8F6F0] px-4 flex items-center justify-between focus:outline-none focus:border-[#D4AF37] transition-colors"
                      >
                        {formData.dialCode}
                        <ChevronDown className={`w-4 h-4 text-[#9CA3AF] transition-transform ${isDialOpen ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {isDialOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="absolute top-full left-0 mt-2 z-50 bg-[#112240] border border-[#D4AF37]/[0.15] rounded-2xl overflow-hidden shadow-2xl w-52"
                          >
                            {COUNTRIES.map((c) => (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => { setFormData((prev) => ({ ...prev, dialCode: c.dial })); setIsDialOpen(false); }}
                                className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-[#5B21B6]/15 transition-colors border-b border-[#D4AF37]/[0.08] last:border-b-0"
                              >
                                <span className="text-[#E5E7EB] text-sm">{c.name}</span>
                                <span className="text-[#D4AF37] text-sm">{c.dial}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="98765 43210"
                      className="flex-1 h-14 rounded-2xl bg-[#0F1F38] border border-[#D4AF37]/[0.18] text-[#F8F6F0] placeholder:text-[#9CA3AF] px-5 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <FormInput label="Subject" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="What is this about?" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs uppercase tracking-[0.2em] text-[#E5E7EB] font-semibold">Message</label>
                    <span className={`text-xs ${wordCount >= MAX_WORDS ? "text-[#E8A5A5]" : "text-[#9CA3AF]"}`}>{wordCount} / {MAX_WORDS} words</span>
                  </div>

                  <textarea
                    name="message" value={formData.message} onChange={handleInputChange} required rows="6" placeholder="Write your message..."
                    className="w-full rounded-2xl bg-[#0F1F38] border border-[#D4AF37]/[0.18] px-5 py-4 text-[#F8F6F0] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition resize-none"
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-8 py-4 rounded-2xl btn-gradient font-semibold flex items-center justify-center gap-3 disabled:opacity-60">
                  {isSubmitting ? (<><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>) : (<>Submit Dispatch<Send className="w-5 h-5" /></>)}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FormInput({ label, name, type = "text", value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-[#E5E7EB] mb-3 font-semibold">{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange} required placeholder={placeholder}
        className="w-full h-14 rounded-2xl bg-[#0F1F38] border border-[#D4AF37]/[0.18] px-5 text-[#F8F6F0] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition"
      />
    </div>
  );
}
