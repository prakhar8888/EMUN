"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";

import {
  Globe,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "About",
      href: "/about",
    },

    {
      label: "Committees",
      href: "/chambers",
    },

    {
      label: "Events",
      href: "/events",
    },

    {
      label: "Foundation",
      href: "/foundation",
    },

    {
      label: "Connect",
      href: "/connect",
    },
  ];

  return (
    <>
      {/* =========================
          NAVBAR
      ========================== */}
      <motion.nav
        initial={{
          y: -80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className={`
          fixed
          top-0
          left-0
          w-full
          z-50
          transition-all
          duration-500
          ${
            isScrolled
              ? `
                py-3
                bg-[#050816]/80
                backdrop-blur-2xl
                border-b
                border-white/10
                shadow-[0_10px_40px_rgba(0,0,0,0.3)]
              `
              : `
                py-5
                bg-transparent
              `
          }
        `}
      >
        <div className="
          container-custom
          px-6
          flex
          items-center
          justify-between
        ">

          {/* =========================
              LOGO
          ========================== */}
          <Link
            href="/"
            className="
              flex
              items-center
              gap-4
              group
            "
          >

            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.05,
              }}
              className="
                w-12
                h-12
                rounded-2xl
                bg-gradient-to-br
                from-violet-600
                to-cyan-500
                flex
                items-center
                justify-center
                shadow-[0_0_25px_rgba(124,58,237,0.45)]
              "
            >
              <Globe className="
                w-6
                h-6
                text-white
              " />
            </motion.div>

            <div>

              <h1 className="
                text-2xl
                font-black
                gradient-text
                leading-none
              ">
                MUNSphere
              </h1>

              <p className="
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-slate-400
                mt-1
              ">
                Global Summit
              </p>
            </div>
          </Link>

          {/* =========================
              DESKTOP NAV
          ========================== */}
          <ul className="
            hidden
            lg:flex
            items-center
            gap-10
          ">

            {navLinks.map((link, index) => (
              <li key={index}>

                <Link
                  href={link.href}
                  className="
                    relative
                    text-slate-300
                    hover:text-white
                    transition-colors
                    duration-300
                    font-medium
                    group
                  "
                >
                  {link.label}

                  <span className="
                    absolute
                    left-0
                    -bottom-2
                    w-0
                    h-[2px]
                    bg-gradient-to-r
                    from-violet-500
                    to-cyan-400
                    transition-all
                    duration-300
                    group-hover:w-full
                  " />
                </Link>
              </li>
            ))}
          </ul>

          {/* =========================
              RIGHT SIDE
          ========================== */}
          <div className="
            flex
            items-center
            gap-4
          ">

            {/* CTA */}
            <Link
              href="/register"
              className="
                hidden
                sm:flex
                items-center
                gap-2
                btn-gradient
                px-6
                py-3
                rounded-2xl
                font-semibold
                glow
              "
            >
              Register

              <ChevronRight className="
                w-4
                h-4
              " />
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() =>
                setMobileOpen(!mobileOpen)
              }
              className="
                lg:hidden
                w-11
                h-11
                rounded-xl
                glass
                border
                border-white/10
                flex
                items-center
                justify-center
                text-white
              "
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* =========================
          MOBILE MENU
      ========================== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              fixed
              top-[88px]
              left-4
              right-4
              z-40
              glass
              border
              border-white/10
              rounded-3xl
              p-6
              lg:hidden
              backdrop-blur-2xl
            "
          >
            <div className="
              flex
              flex-col
              gap-5
            ">

              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    flex
                    items-center
                    justify-between
                    text-slate-300
                    hover:text-cyan-400
                    transition-colors
                    py-2
                  "
                >
                  {link.label}

                  <ChevronRight className="
                    w-4
                    h-4
                  " />
                </Link>
              ))}

              <Link
                href="/register"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="
                  btn-gradient
                  rounded-2xl
                  py-4
                  text-center
                  font-semibold
                  mt-3
                "
              >
                Register Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
