"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Compass,
  BookOpen,
  Users2,
  MessageSquareText,
  Quote,
  Feather,
} from "lucide-react";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">

      {/* HERO */}
      <section className="relative pt-32 pb-24 px-6">
        <AnimatedBackground />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full mb-10"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs md:text-sm text-[#E5E7EB] uppercase tracking-[0.2em]">How We Began</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-black leading-[0.95] tracking-[-0.05em] mb-8"
          >
            Before There Was a <span className="gradient-text">Platform</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-lg md:text-2xl text-[#E5E7EB] max-w-3xl mx-auto leading-relaxed font-light"
          >
            There was a conversation. This is how it turned into Enigma.
          </motion.p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="relative section-padding px-6">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4 lg:sticky lg:top-32"
            >
              <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-sm mb-4">Our Story</p>
              <h2 className="section-title mb-6">Where It Began</h2>
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E6C77A]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8 glass rounded-[2rem] p-10 md:p-14"
            >
              <div className="space-y-7 text-lg text-[#E5E7EB] leading-loose">
                <p>
                  Enigma began as a conversation, not a plan. A small group
                  of people who kept finding their way back to the same
                  questions — about diplomacy, about leadership, about how
                  the world negotiates its way through disagreement —
                  realized they were building something without meaning to.
                </p>
                <p>
                  What they shared wasn't a business idea. It was a
                  frustration: that the platforms hosting these
                  conversations rarely matched the seriousness of the
                  conversations themselves. Model United Nations deserved
                  an experience as considered and as modern as the
                  diplomacy it was meant to simulate.
                </p>
                <p>
                  So they built one. Not to replace the tradition of MUN,
                  but to give it a home worthy of the people who show up to
                  argue, negotiate, and occasionally change their minds in
                  a committee room. That home became Enigma.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="relative section-padding px-6">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-sm mb-4">Our Approach</p>
            <h2 className="section-title">How We Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-[2rem] p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#112240] border border-[#D4AF37]/[0.15] flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#F8F6F0]">Substance Before Spectacle</h3>
              <p className="text-[#E5E7EB] leading-relaxed">
                We write background guides the way policy briefs are
                written — thoroughly researched, procedurally accurate, and
                built to reward delegates who actually prepare.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass rounded-[2rem] p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#112240] border border-[#D4AF37]/[0.15] flex items-center justify-center mb-6">
                <MessageSquareText className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#F8F6F0]">Procedure With Purpose</h3>
              <p className="text-[#E5E7EB] leading-relaxed">
                Parliamentary procedure exists to keep debate fair, not to
                slow it down. Our committees run on structure that protects
                every delegate's right to be heard.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-[2rem] p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#112240] border border-[#D4AF37]/[0.15] flex items-center justify-center mb-6">
                <Feather className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#F8F6F0]">Feedback That Sharpens</h3>
              <p className="text-[#E5E7EB] leading-relaxed">
                Every conference closes with honest, specific feedback —
                not generic praise. Delegates leave knowing exactly what to
                refine before their next committee.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHO WE'RE FOR */}
      <section className="relative section-padding px-6">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E1B4B]/25 to-[#D4AF37]/[0.03]" />

            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#112240] border border-[#D4AF37]/[0.15] mb-8">
                  <Users2 className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-sm mb-6">Our Delegates</p>
                <h2 className="section-title">Who We're For</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Compass className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <h3 className="text-lg font-bold text-[#F8F6F0]">The First-Timer</h3>
                  </div>
                  <p className="text-[#E5E7EB] leading-relaxed">
                    You've never held a placard or said "point of order" in
                    your life. That's exactly who Enigma is built to
                    welcome — with guides written for people who are
                    starting from zero, not assuming they already know the
                    rules.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Compass className="w-5 h-5 text-[#6D28D9] shrink-0" />
                    <h3 className="text-lg font-bold text-[#F8F6F0]">The Seasoned Delegate</h3>
                  </div>
                  <p className="text-[#E5E7EB] leading-relaxed">
                    You've chaired committees, drafted resolutions under
                    pressure, and know the difference between a good bloc
                    and a fragile one. Enigma gives you agendas complex
                    enough to actually test that experience.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COMMITMENT TO FUTURE LEADERS */}
      <section className="relative section-padding px-6 pb-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/[0.03] via-transparent to-[#1E1B4B]/25" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <Quote className="w-10 h-10 text-[#D4AF37]/50 mx-auto mb-8" />

              <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-sm mb-6">Our Commitment</p>

              <h2 className="section-title mb-8">To Every <span className="gradient-text">Future Leader</span></h2>

              <p className="text-[#E5E7EB] text-lg md:text-xl leading-relaxed">
                We are committed to every delegate who walks into a
                committee room unsure of their voice, and walks out having
                found it. Enigma exists to make that transformation
                possible — again and again, one conference at a time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
