"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  Globe,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Committees", href: "/chambers" },
    { label: "Events", href: "/events" },
    { label: "Foundation", href: "/foundation" },
    { label: "Contact", href: "/connect" },
  ];

  const socialLinks = [
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/enigmamun?igsh=MTJzb2M5d3FkdWZ5bA==",
      label: "Instagram",
    },
    {
      icon: FaXTwitter,
      href: "https://x.com/EnigmaMUN",
      label: "X (Twitter)",
    },
    {
      icon: FaYoutube,
      href: "#",
      label: "YouTube",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[#D4AF37]/[0.12] mt-24 bg-[#0A192F]">

      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-100px] left-[-120px] w-[350px] h-[350px] rounded-full blur-[100px] bg-[#1E1B4B]/40" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full blur-[100px] bg-[#5B21B6]/[0.10]" />
        <div className="absolute inset-0 grid-background opacity-[0.03]" />
      </div>

      <div className="relative z-10 container-custom px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-14">

          {/* Brand */}
          <div className="xl:col-span-2">
            <motion.div whileHover={{ scale: 1.02 }} className="inline-flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#E6C77A] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                <Globe className="w-7 h-7 text-[#0A192F]" />
              </div>

              <div>
                <h2 className="text-3xl font-black gradient-text">EnigmaMUN</h2>
                <p className="text-sm uppercase tracking-[0.2em] text-[#9CA3AF]">Global Summit</p>
              </div>
            </motion.div>

            <p className="text-[#E5E7EB] leading-relaxed text-lg max-w-xl mb-10">
              Empowering future diplomats, global leaders, and strategic thinkers
              through immersive Model United Nations simulations and international
              collaboration experiences.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <SocialIcon key={social.label} icon={social.icon} href={social.href} label={social.label} />
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="inline-flex items-center gap-2 mb-8">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="text-xl font-bold text-[#F8F6F0]">Navigation</h3>
            </div>

            <ul className="space-y-5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-3 text-[#E5E7EB] hover:text-[#E6C77A] transition-all duration-300"
                  >
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="inline-flex items-center gap-2 mb-8">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="text-xl font-bold text-[#F8F6F0]">Contact</h3>
            </div>

            <div className="space-y-6">
              <ContactItem icon={<Mail className="w-5 h-5" />} text="secretariat@enigmamun.org" />
              <ContactItem icon={<Phone className="w-5 h-5" />} text="+91 96969 04321" />
              <ContactItem icon={<MapPin className="w-5 h-5" />} text="Lucknow, India" />
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-[#D4AF37]/[0.12] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#9CA3AF] text-sm">© 2026 EnigmaMUN Global Summit. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-[#9CA3AF]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon: Icon, href, label }) {
  return (
    <motion.a
      whileHover={{ y: -4, scale: 1.08 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        w-12 h-12 rounded-2xl glass border border-[#D4AF37]/[0.12]
        flex items-center justify-center text-[#E5E7EB]
        hover:border-[#D4AF37] hover:text-[#E6C77A]
        transition-all duration-300
      "
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );
}

function ContactItem({ icon, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-[#112240] border border-[#D4AF37]/[0.12] flex items-center justify-center text-[#D4AF37] shrink-0">
        {icon}
      </div>
      <p className="text-[#E5E7EB] leading-relaxed">{text}</p>
    </div>
  );
}
