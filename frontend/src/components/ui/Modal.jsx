"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = "max-w-2xl",
  hideCloseButton = false,
}) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-deep-navy/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full ${maxWidth} bg-surface-light rounded-2xl shadow-2xl border border-burnished-gold/20 overflow-hidden flex flex-col max-h-[90vh]`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white">
              {title ? (
                <h2 id="modal-title" className="text-xl font-serif font-bold text-deep-navy pr-4">
                  {title}
                </h2>
              ) : (
                <div /> // Spacer if no title
              )}

              {!hideCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-mahogany hover:bg-mahogany/10 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mahogany/50"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6 overflow-y-auto bg-surface-light">
              {children}
            </div>

            {/* Modal Footer (Optional) */}
            {footer && (
              <div className="px-6 py-5 border-t border-gray-200 bg-white flex items-center justify-end space-x-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
