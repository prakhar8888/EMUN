"use client";

import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
  hoverEffect = true,
  glassmorphism = false,
  onClick,
  ...props
}) {
  /* =========================
     BASE STYLES
  ========================= */
  const baseStyles = `
    relative
    overflow-hidden
    rounded-[2rem]
    border
    backdrop-blur-xl
  `;

  /* =========================
     BACKGROUND STYLES
  ========================= */
  const bgStyles = glassmorphism
    ? `
      bg-white/[0.04]
      border-white/10
      shadow-[0_10px_40px_rgba(0,0,0,0.25)]
    `
    : `
      bg-[#0f172a]/80
      border-white/10
      shadow-[0_10px_40px_rgba(0,0,0,0.25)]
    `;

  /* =========================
     HOVER STYLES
  ========================= */
  const hoverStyles = hoverEffect
    ? `
      transition-all
      duration-500
      hover:border-violet-500/30
      hover:shadow-[0_20px_60px_rgba(124,58,237,0.18)]
    `
    : "";

  /* =========================
     INTERACTIVE
  ========================= */
  const interactiveStyles = onClick
    ? "cursor-pointer"
    : "";

  /* =========================
     CARD CONTENT
  ========================= */
  const content = (
    <>
      {/* Glow Layer */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          hover:opacity-100
          transition-opacity
          duration-700
          bg-gradient-to-br
          from-violet-500/10
          via-transparent
          to-cyan-500/10
          pointer-events-none
        "
      />

      {/* Border Glow */}
      <div
        className="
          absolute
          inset-0
          rounded-[2rem]
          border
          border-white/[0.03]
          pointer-events-none
        "
      />

      {/* Inner Content */}
      <div className="relative z-10">
        {children}
      </div>
    </>
  );

  /* =========================
     MOTION CARD
  ========================= */
  if (hoverEffect || onClick) {
    return (
      <motion.div
        onClick={onClick}
        whileHover={
          hoverEffect
            ? {
                y: -8,
                scale: 1.01,
              }
            : {}
        }
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className={`
          ${baseStyles}
          ${bgStyles}
          ${hoverStyles}
          ${interactiveStyles}
          ${className}
        `}
        {...props}
      >
        {content}
      </motion.div>
    );
  }

  /* =========================
     STATIC CARD
  ========================= */
  return (
    <div
      onClick={onClick}
      className={`
        ${baseStyles}
        ${bgStyles}
        ${className}
      `}
      {...props}
    >
      {content}
    </div>
  );
}

/* =========================
   CARD HEADER
========================= */
function CardHeader({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        px-8
        py-6
        border-b
        border-white/10
        bg-white/[0.02]
        backdrop-blur-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/* =========================
   CARD TITLE
========================= */
function CardTitle({
  children,
  className = "",
}) {
  return (
    <h3
      className={`
        text-2xl
        md:text-3xl
        font-black
        tracking-tight
        text-white
        leading-tight
        ${className}
      `}
    >
      {children}
    </h3>
  );
}

/* =========================
   CARD BODY
========================= */
function CardBody({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        p-8
        text-slate-300
        leading-relaxed
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/* =========================
   CARD FOOTER
========================= */
function CardFooter({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        px-8
        py-5
        border-t
        border-white/10
        bg-white/[0.02]
        backdrop-blur-xl
        flex
        items-center
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/* =========================
   ATTACH COMPONENTS
========================= */
Card.Header = CardHeader;

Card.Title = CardTitle;

Card.Body = CardBody;

Card.Footer = CardFooter;
