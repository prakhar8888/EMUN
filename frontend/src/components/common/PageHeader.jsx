"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PageHeader({
  title,
  subtitle,
  icon: Icon,
  breadcrumbs = []
}) {
  return (
    <div className="relative bg-deep-navy text-white pt-24 pb-16 border-b border-burnished-gold/20 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-royal-teal/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-72 h-72 bg-burnished-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Optional Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center space-x-2 text-sm text-gray-400 mb-8"
          >
            <Link href="/" className="hover:text-burnished-gold transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-gray-600" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-burnished-gold transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-burnished-gold font-medium">{crumb.label}</span>
                )}
              </div>
            ))}
          </motion.nav>
        )}

        {/* Optional Icon */}
        {Icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center p-3 bg-burnished-gold/10 rounded-full mb-6 border border-burnished-gold/20"
          >
            <Icon className="w-8 h-8 text-burnished-gold" />
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight"
        >
          {title}
        </motion.h1>

        {/* Gold Divider */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "6rem" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-1 bg-burnished-gold mx-auto mb-6 rounded-full"
        />

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
