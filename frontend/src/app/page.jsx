"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  ArrowDown,
  Compass,
  Brain,
  Users,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Quote,
  Sparkles,
} from "lucide-react";
import AnimatedBackground from "@/components/common/AnimatedBackground";

// ======================================
// SHARED MOTION VARIANTS — one consistent
// choreography language across every section
// ======================================
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUpSmall = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HomePage() {
  const scrollToStory = () => {
    document.getElementById("enigma-story")?.scrollIntoView({ behavior: "smooth" });
  };

  const values = [
    { icon: Compass, title: "Diplomacy", description: "The discipline of finding common ground where none seems to exist." },
    { icon: Users, title: "Leadership", description: "Owning the weight of a decision that affects people beyond yourself." },
    { icon: Brain, title: "Critical Thinking", description: "Questioning the obvious answer until you find the true one." },
    { icon: Handshake, title: "Global Collaboration", description: "Recognizing that no border has ever contained a shared problem." },
    { icon: Lightbulb, title: "Innovation", description: "Challenging inherited assumptions about how diplomacy should work." },
    { icon: ShieldCheck, title: "Integrity", description: "Arguing a position you may not hold, without ever losing yourself." },
  ];

  const quotes = [
    { text: "Peace is a daily, a weekly, a monthly process, gradually changing opinions, slowly eroding old barriers.", author: "John F. Kennedy", role: "35th President of the United States" },
    { text: "Diplomacy is the art of letting someone else have your way.", author: "Daniele Vare", role: "Italian Diplomat" },
    { text: "In a world of global challenges, solutions can only be global as well.", author: "Angela Merkel", role: "Former Chancellor of Germany" },
  ];

  return (
    <div className="relative overflow-hidden">

      {/* ======================================
          HERO — cinematic centerpiece
      ====================================== */}
      <section className="relative min-h-screen flex items-center pt-32 pb-24 px-6">
        <AnimatedBackground />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full mb-10"
          >
            <motion.span
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </motion.span>
            <span className="text-xs md:text-sm text-[#E5E7EB] tracking-[0.2em] uppercase">
              An International Model United Nations Society
            </span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl xl:text-9xl font-black tracking-[-0.05em] leading-[0.9]"
            >
              Every Crisis Is a{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.55 }}
                className="gradient-text block md:inline"
              >
                Puzzle Worth Solving
              </motion.span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-[#E5E7EB] max-w-2xl mx-auto leading-relaxed mb-14 font-light mt-10"
          >
            Enigma MUN is where the world's sharpest young minds gather to
            decode humanity's hardest questions — through diplomacy, debate,
            and disciplined leadership.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-5"
          >
            <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link href="/register" className="inline-flex items-center gap-2 btn-gradient shimmer-sweep px-9 py-4 rounded-2xl font-semibold text-lg glow">
                Register Now
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                  <ChevronRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToStory}
              className="inline-flex items-center gap-2 glass border border-[#D4AF37]/[0.12] px-9 py-4 rounded-2xl font-semibold text-lg hover:border-[#D4AF37]/40 transition-colors duration-300"
            >
              Discover Enigma
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                <ArrowDown className="w-5 h-5" />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border border-[#D4AF37]/30 flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-[#D4AF37]"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ======================================
          WHY "ENIGMA"
      ====================================== */}
      <section id="enigma-story" className="relative section-padding px-6">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.p variants={fadeUpSmall} className="text-[#D4AF37] uppercase tracking-[0.25em] text-sm mb-6">
              Why "Enigma"
            </motion.p>

            <motion.h2 variants={fadeUp} className="section-title mb-10">
              A Name Built on <span className="gradient-text">Complexity, Solved</span>
            </motion.h2>

            <div className="space-y-6 text-left">
              <motion.p variants={fadeUp} className="text-[#E5E7EB] text-lg md:text-xl leading-relaxed">
                An enigma is not a problem without an answer — it is a
                problem whose answer has not yet been found. That single
                distinction shapes everything we build. The world's hardest
                challenges — conflict, inequality, climate, governance —
                are not unsolvable. They are unsolved.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[#E5E7EB] text-lg md:text-xl leading-relaxed">
                We named this platform after the idea that every layer of
                complexity conceals a path forward, if someone is patient
                and rigorous enough to find it. Enigma MUN exists to train
                the delegates who will do that finding: young diplomats who
                can sit with ambiguity, weigh competing truths, and still
                arrive at a resolution.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================
          THE ENIGMA EXPERIENCE — parallax timeline
      ====================================== */}
      <section className="relative section-padding px-6">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-sm mb-6">The Journey</p>
              <h2 className="section-title mb-6">The Enigma <span className="gradient-text">Experience</span></h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-20 h-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] divider-draw"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="lg:col-span-7 space-y-10"
            >
              {[
                { num: "01", title: "Preparation", text: "Every delegate begins in research — studying a nation's history, alliances, and interests until they can argue its position as their own." },
                { num: "02", title: "Debate", text: "Inside committee, preparation meets pressure. Delegates negotiate in real time, defend their portfolio, and search for consensus under a ticking clock." },
                { num: "03", title: "Leadership Growth", text: "What delegates leave with outlasts the conference — sharper judgment, calmer composure, and the confidence to hold a room." },
              ].map((step) => (
                <motion.div
                  key={step.num}
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-6 group"
                >
                  <motion.div
                    className="text-4xl font-black text-white/10 shrink-0 group-hover:text-[#D4AF37]/20 transition-colors duration-500"
                  >
                    {step.num}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#F8F6F0]">{step.title}</h3>
                    <p className="text-[#E5E7EB] leading-relaxed">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================
          CORE VALUES — staggered card grid
      ====================================== */}
      <section className="relative section-padding px-6">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUpSmall} className="text-[#D4AF37] uppercase tracking-[0.25em] text-sm mb-6">What We Stand For</motion.p>
            <motion.h2 variants={fadeUp} className="section-title">Core Values</motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={scaleIn}
                  whileHover={{ y: -10 }}
                  className="glass card-elevate rounded-[2rem] p-8 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5B21B6]/0 to-[#1E1B4B]/0 group-hover:from-[#5B21B6]/[0.06] group-hover:to-[#1E1B4B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-[#112240] border border-[#D4AF37]/[0.15] flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-[#D4AF37] icon-live" />
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-[#F8F6F0]">{value.title}</h3>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ======================================
          LEADERS' WISDOM
      ====================================== */}
      <section className="relative section-padding px-6">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUpSmall} className="text-[#D4AF37] uppercase tracking-[0.25em] text-sm mb-6">Words That Guide Us</motion.p>
            <motion.h2 variants={fadeUp} className="section-title">Leaders' Wisdom</motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {quotes.map((quote) => (
              <motion.div
                key={quote.author}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="glass card-elevate rounded-[2rem] p-8 relative flex flex-col h-full"
              >
                <Quote className="w-8 h-8 text-[#D4AF37]/50 mb-6 icon-live" />
                <p className="text-[#E5E7EB] text-lg leading-relaxed mb-8 flex-1 italic">"{quote.text}"</p>
                <div className="pt-6 border-t border-[#D4AF37]/[0.12]">
                  <p className="font-semibold text-[#F8F6F0]">{quote.author}</p>
                  <p className="text-sm text-[#9CA3AF]">{quote.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======================================
          VISION FOR THE FUTURE
      ====================================== */}
      <section className="relative section-padding px-6">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E1B4B]/30 via-transparent to-[#D4AF37]/[0.03]" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-[#D4AF37] uppercase tracking-[0.25em] text-sm mb-6"
              >
                Looking Ahead
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="section-title mb-8"
              >
                A Vision for the <span className="gradient-text">Future</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="text-[#E5E7EB] text-lg md:text-xl leading-relaxed"
              >
                We envision an Enigma delegate network that spans continents
                — a community of alumni carrying the habits of careful
                listening and principled negotiation into every room they
                enter, long after the gavel falls on their final committee
                session. Not a conference that ends, but a way of thinking
                that stays.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================
          FINAL CTA
      ====================================== */}
      <section className="relative pb-32 px-6">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.005 }}
            className="relative rounded-[2.5rem] p-12 md:p-24 text-center overflow-hidden bg-gradient-to-br from-[#1E1B4B]/50 via-[#0A192F] to-[#5B21B6]/20 border border-[#D4AF37]/[0.12]"
          >
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-6xl font-black tracking-[-0.04em] mb-8"
              >
                Begin Your <span className="gradient-text">Enigma Journey</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-[#E5E7EB] text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
              >
                Take your seat at the table where tomorrow's answers are being written.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Link href="/register" className="inline-flex items-center gap-2 btn-gradient shimmer-sweep px-10 py-5 rounded-2xl font-semibold text-lg glow">
                  Register Now
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
