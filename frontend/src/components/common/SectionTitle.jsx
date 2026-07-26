"use client";

import { motion } from "framer-motion";

import { Sparkles } from "lucide-react";

export default function SectionTitle({
  title,
  subtitle,
  alignment = "center",
  className = "",
  badge = "Enigma MUN Summit",
}) {
  /* =========================
     ALIGNMENT CLASSES
  ========================= */
  const containerAlignment =
    alignment === "center"
      ? "items-center text-center"
      : alignment === "right"
      ? "items-end text-right"
      : "items-start text-left";

  return (
    <div
      className={`
        flex
        flex-col
        w-full
        mb-14
        md:mb-20
        ${containerAlignment}
        ${className}
      `}
    >

      {/* =========================
          BADGE
      ========================== */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          inline-flex
          items-center
          gap-3
          glass
          px-5
          py-2
          rounded-full
          border
          border-[#2A2A2A]
          mb-8
        "
      >

        <Sparkles className="
          w-4
          h-4
          text-[#C9A227]
        " />

        <span className="
          text-sm
          tracking-[0.18em]
          uppercase
          text-[#C8CDD5]
        ">
          {badge}
        </span>
      </motion.div>

      {/* =========================
          TITLE
      ========================== */}
      <motion.h2
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-50px",
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="
          text-4xl
          md:text-6xl
          xl:text-7xl
          font-black
          leading-[0.95]
          tracking-[-0.05em]
          mb-6
        "
      >
        <span className="gradient-text">
          {title}
        </span>
      </motion.h2>

      {/* =========================
          DIVIDER
      ========================== */}
      <motion.div
        initial={{
          opacity: 0,
          width: 0,
        }}
        whileInView={{
          opacity: 1,
          width:
            alignment === "center"
              ? "140px"
              : "100px",
        }}
        viewport={{
          once: true,
          margin: "-50px",
        }}
        transition={{
          duration: 0.8,
          delay: 0.15,
        }}
        className="
          h-[4px]
          rounded-full
          bg-gradient-to-r
          from-[#C9A227]
          to-[#D4AF37]
          mb-8
        "
      />

      {/* =========================
          SUBTITLE
      ========================== */}
      {subtitle && (
        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-50px",
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className={`
            text-lg
            md:text-2xl
            text-[#C8CDD5]
            leading-relaxed
            max-w-3xl
            ${
              alignment === "center"
                ? "mx-auto"
                : ""
            }
          `}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
