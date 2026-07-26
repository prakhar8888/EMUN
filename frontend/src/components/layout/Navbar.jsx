"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Committees", href: "/chambers" },
    { label: "Events", href: "/events" },
    { label: "Foundation", href: "/foundation" },
    { label: "Connect", href: "/connect" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="
          fixed top-0 left-0 w-full z-50 backdrop-blur-2xl
          transition-all duration-500 overflow-hidden
          py-4 bg-gradient-to-b from-[#0A192F] via-[#0A192F]/95 to-[#0A192F]/80
        "
      >
        <motion.div
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#1E1B4B]/25 via-[#D4AF37]/5 to-transparent blur-2xl"
        />
        <motion.div
          animate={{ x: ["10%", "-10%", "10%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#5B21B6]/20 via-[#D4AF37]/5 to-transparent blur-2xl"
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-4 group shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-16 h-16 lg:w-20 lg:h-20 shrink-0 p-1"
            >
              <Image
                src="/logo.png"
                alt="Enigma MUN"
                fill
                priority
                className="object-contain drop-shadow-[0_0_18px_rgba(212,175,55,0.3)]"
              />
            </motion.div>

            <div className="hidden sm:block">
              <h1 className="text-2xl lg:text-3xl font-black gradient-text leading-none tracking-tight">
                EnigmaMUN
              </h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#9CA3AF] mt-1.5">
                Global Summit
              </p>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-2 glass rounded-full border border-[#D4AF37]/[0.12] px-2 py-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    style={active ? { color: "#0A192F", fontWeight: 700 } : undefined}
                    className={`
                      relative block px-5 py-2.5 rounded-full text-sm
                      transition-colors duration-300 z-10 no-underline
                      ${active ? "!text-[#0A192F] hover:!text-[#0A192F] font-bold" : "text-[#E5E7EB] hover:text-[#F8F6F0] font-medium"}
                    `}
                  >
                    {link.label}
                  </Link>

                  {active && (
                    <motion.div
                      layoutId="navActivePill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E6C77A]"
                    />
                  )}

                  {!active && (
                    <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[#5B21B6]/20 -z-0" />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <Link href="/register" className="hidden sm:block">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="
                  group relative flex items-center gap-2 overflow-hidden rounded-2xl
                  px-6 py-3 font-semibold text-[#0A192F]
                  bg-gradient-to-r from-[#D4AF37] to-[#E6C77A]
                  shadow-[0_0_25px_rgba(212,175,55,0.25)]
                "
              >
                <span className="relative z-10 !text-[#0A192F] font-bold">Register</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <motion.span
                  initial={{ x: "-120%" }}
                  whileHover={{ x: "120%" }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-y-0 left-0 w-1/3 bg-white/25 skew-x-[-20deg] blur-sm"
                />
              </motion.div>
            </Link>

            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden w-11 h-11 rounded-xl glass border border-[#D4AF37]/[0.12] flex items-center justify-center text-[#F8F6F0]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[96px] left-4 right-4 z-40 glass border border-[#D4AF37]/[0.12] rounded-3xl p-6 lg:hidden backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => {
                const active = isActive(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      style={active ? { color: "#0A192F", fontWeight: 700 } : undefined}
                      className={`
                        flex items-center justify-between px-4 py-3.5 rounded-2xl
                        transition-all duration-300 no-underline
                        ${active
                          ? "bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] !text-[#0A192F] font-bold"
                          : "text-[#E5E7EB] hover:bg-[#5B21B6]/15 hover:text-[#F8F6F0]"
                        }
                      `}
                    >
                      {link.label}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                );
              })}

              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl py-4 text-center font-bold !text-[#0A192F] bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] mt-3 no-underline"
              >
                Register Now
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
