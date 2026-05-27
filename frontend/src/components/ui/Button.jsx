"use client";

import { motion } from "framer-motion";

import { Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  isLoading = false,
  disabled = false,
  icon: Icon,
  fullWidth = false,
  type = "button",
  onClick,
  ...props
}) {
  /* =========================
     VARIANTS
  ========================= */
  const variants = {
    primary: `
      bg-gradient-to-r
      from-violet-600
      to-cyan-500
      text-white
      border
      border-transparent
      shadow-[0_0_30px_rgba(124,58,237,0.35)]
      hover:shadow-[0_0_40px_rgba(124,58,237,0.5)]
    `,

    secondary: `
      glass
      text-white
      border
      border-white/10
      hover:border-violet-500/40
      hover:bg-white/10
    `,

    outline: `
      bg-transparent
      text-white
      border
      border-violet-500/40
      hover:bg-violet-500/10
      hover:border-violet-400
    `,

    ghost: `
      bg-transparent
      text-slate-300
      hover:bg-white/5
      hover:text-white
      border
      border-transparent
    `,

    danger: `
      bg-red-500/10
      text-red-400
      border
      border-red-500/30
      hover:bg-red-500/20
    `,
  };

  /* =========================
     SIZES
  ========================= */
  const sizes = {
    sm: `
      px-4
      py-2.5
      text-sm
      rounded-xl
    `,

    md: `
      px-6
      py-3.5
      text-base
      rounded-2xl
    `,

    lg: `
      px-8
      py-4
      text-lg
      rounded-2xl
    `,
  };

  /* =========================
     BASE STYLES
  ========================= */
  const baseStyles = `
    relative
    inline-flex
    items-center
    justify-center
    gap-3
    overflow-hidden
    font-semibold
    tracking-wide
    transition-all
    duration-300
    focus:outline-none
    focus:ring-2
    focus:ring-violet-500/50
    focus:ring-offset-2
    focus:ring-offset-[#050816]
    backdrop-blur-xl
  `;

  const widthClass = fullWidth
    ? "w-full"
    : "";

  const disabledClass =
    disabled || isLoading
      ? `
        opacity-60
        cursor-not-allowed
      `
      : `
        cursor-pointer
      `;

  return (
    <motion.button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      whileHover={
        disabled || isLoading
          ? {}
          : {
              y: -3,
              scale: 1.01,
            }
      }
      whileTap={
        disabled || isLoading
          ? {}
          : {
              scale: 0.98,
            }
      }
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthClass}
        ${disabledClass}
        ${className}
      `}
      {...props}
    >

      {/* =========================
          HOVER GLOW
      ========================== */}
      {!disabled && !isLoading && (
        <div
          className="
            absolute
            inset-0
            opacity-0
            hover:opacity-100
            transition-opacity
            duration-500
            bg-gradient-to-r
            from-white/10
            to-transparent
          "
        />
      )}

      {/* =========================
          CONTENT
      ========================== */}
      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-center
          gap-3
        "
      >

        {/* LOADER */}
        {isLoading && (
          <Loader2
            className="
              w-5
              h-5
              animate-spin
              shrink-0
            "
          />
        )}

        {/* ICON */}
        {!isLoading && Icon && (
          <Icon
            className="
              w-5
              h-5
              shrink-0
            "
          />
        )}

        {/* TEXT */}
        <span>
          {children}
        </span>
      </div>
    </motion.button>
  );
}
