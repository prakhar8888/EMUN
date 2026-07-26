"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Landmark, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import chambersService from "@/services/chambersService";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export default function ChambersPage() {
  const [chambers, setChambers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchChambers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await chambersService.getAllChambers();
      const list = response?.data || [];
      setChambers(list.filter((c) => c.isPublished !== false));
    } catch (err) {
      console.error("Fetch Chambers Error:", err);
      setError(err.message || "Failed to load committees. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChambers();
  }, []);

  return (
    <div className="relative overflow-hidden">
      <section className="relative pt-32 pb-24 px-6">
        <AnimatedBackground />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full mb-8"
          >
            <Landmark className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm text-[#E5E7EB] tracking-wide">
              Global Governance • Diplomacy • International Debate
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-black leading-tight mb-8"
          >
            Committees & <span className="gradient-text">Chambers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-lg md:text-2xl text-[#E5E7EB] max-w-3xl mx-auto leading-relaxed"
          >
            Engage in high-level international discussions through
            immersive committee simulations inspired by real-world
            United Nations bodies and global institutions.
          </motion.p>
        </div>
      </section>

      <section className="relative section-padding px-6">
        <div className="container-custom">

          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
              <p className="text-[#E5E7EB]">Loading committees...</p>
            </div>
          )}

          {!loading && error && (
            <div className="glass rounded-3xl p-10 text-center max-w-xl mx-auto">
              <AlertCircle className="w-10 h-10 text-[#991B1B] mx-auto mb-4" />
              <p className="text-[#D97B7B] mb-6">{error}</p>
              <button onClick={fetchChambers} className="px-6 py-3 rounded-xl btn-gradient font-semibold">
                Retry
              </button>
            </div>
          )}

          {!loading && !error && chambers.length === 0 && (
            <div className="glass rounded-3xl p-12 text-center max-w-xl mx-auto">
              <Landmark className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#F8F6F0] mb-2">No Committees Yet</h3>
              <p className="text-[#9CA3AF]">Committees will appear here once they are published.</p>
            </div>
          )}

          {!loading && !error && chambers.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {chambers.map((chamber, index) => (
                <motion.div
                  key={chamber.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  whileHover={{ y: -10 }}
                  className="hover-card rounded-[2rem] p-8 border border-[#D4AF37]/[0.12] bg-[#112240] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/[0.03] to-[#5B21B6]/[0.06] opacity-0 group-hover:opacity-100 transition duration-500" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#0A192F] border border-[#D4AF37]/[0.15] flex items-center justify-center mb-8 overflow-hidden">
                      {chamber.iconUrl ? (
                        <img src={chamber.iconUrl} alt={chamber.name} className="w-9 h-9 object-contain" />
                      ) : (
                        <Landmark className="w-8 h-8 text-[#D4AF37]" />
                      )}
                    </div>

                    <h2 className="text-2xl font-bold leading-snug mb-5 text-[#F8F6F0]">{chamber.name}</h2>

                    <p className="text-[#E5E7EB] leading-relaxed mb-8 line-clamp-3">{chamber.agenda}</p>

                    <div className="flex items-center justify-end pt-6 border-t border-[#D4AF37]/[0.12]">
                      <Link
                        href={`/chambers/${chamber.slug}`}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl btn-gradient font-medium"
                      >
                        View
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
