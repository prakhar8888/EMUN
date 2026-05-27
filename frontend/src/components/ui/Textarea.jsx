"use client";

import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

const Textarea = forwardRef(({
  label,
  id,
  name,
  error,
  helperText,
  className = "",
  containerClassName = "",
  required = false,
  disabled = false,
  rows = 4,
  ...props
}, ref) => {
  // Generate a unique ID if none is provided for accessibility linking
  const textareaId = id || name || Math.random().toString(36).substring(2, 9);

  // Dynamic styling classes
  const baseTextareaStyles = "w-full px-4 py-3 bg-surface-light border rounded-md transition-all duration-300 focus:outline-none focus:ring-2 resize-y disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100";

  // State-based styling (Error vs Default)
  const stateStyles = error
    ? "border-mahogany text-mahogany focus:ring-mahogany/30 focus:border-mahogany placeholder-mahogany/50"
    : "border-gray-200 text-deep-navy focus:ring-burnished-gold/50 focus:border-burnished-gold placeholder-gray-400";

  return (
    <div className={`flex flex-col w-full ${containerClassName}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-deep-navy mb-2 uppercase tracking-wider flex items-center"
        >
          {label}
          {required && <span className="text-burnished-gold ml-1">*</span>}
        </label>
      )}

      {/* Textarea Container */}
      <div className="relative flex">
        {/* The Textarea Field */}
        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          disabled={disabled}
          required={required}
          rows={rows}
          className={`${baseTextareaStyles} ${stateStyles} ${className}`}
          {...props}
        />

        {/* Error Icon Indicator */}
        {error && (
          <div className="absolute right-4 top-4 text-mahogany pointer-events-none flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Helper Text or Error Message with smooth animation */}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            className="text-xs text-mahogany mt-2 font-medium"
          >
            {error}
          </motion.p>
        ) : helperText ? (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-xs text-gray-500 mt-2"
          >
            {helperText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
