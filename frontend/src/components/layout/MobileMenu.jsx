"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  Globe,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Globe,
  InstagramIcon,
  TwitterIcon,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  const quickLinks = [
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
      label: "Contact",
      href: "/connect",
    },
  ];

  return (
    <footer className="
      relative
      overflow-hidden
      border-t
      border-white/10
      mt-24
    ">

      {/* =========================
          BACKGROUND
      ========================== */}
      <div className="absolute inset-0 z-0">

        <div className="
          blur-circle
          blur-purple
          w-[350px]
          h-[350px]
          top-[-100px]
          left-[-120px]
        " />

        <div className="
          blur-circle
          blur-cyan
          w-[300px]
          h-[300px]
          bottom-[-100px]
          right-[-100px]
        " />

        <div className="
          absolute
          inset-0
          grid-background
          opacity-[0.03]
        " />
      </div>

      {/* =========================
          MAIN FOOTER
      ========================== */}
      <div className="
        relative
        z-10
        container-custom
        px-6
        py-20
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-14
        ">

          {/* =========================
              BRAND
          ========================== */}
          <div className="xl:col-span-2">

            {/* Logo */}
            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              className="
                inline-flex
                items-center
                gap-4
                mb-8
              "
            >

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-br
                from-violet-600
                to-cyan-500
                flex
                items-center
                justify-center
                shadow-[0_0_30px_rgba(124,58,237,0.4)]
              ">
                <Globe className="
                  w-7
                  h-7
                  text-white
                " />
              </div>

              <div>

                <h2 className="
                  text-3xl
                  font-black
                  gradient-text
                ">
                  MUNSphere
                </h2>

                <p className="
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-slate-400
                ">
                  Global Summit
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <p className="
              text-slate-300
              leading-relaxed
              text-lg
              max-w-xl
              mb-10
            ">
              Empowering future diplomats, global leaders,
              and strategic thinkers through immersive Model
              United Nations simulations, leadership forums,
              and international collaboration experiences.
            </p>

            {/* Socials */}
            <div className="flex gap-4">

              <SocialIcon icon={<Globe className="w-5 h-5" />} />

              <SocialIcon icon={<TwitterIcon className="w-5 h-5" />} />

              <SocialIcon icon={<InstagramIcon className="w-5 h-5" />} />
            </div>
          </div>

          {/* =========================
              QUICK LINKS
          ========================== */}
          <div>

            <div className="
              inline-flex
              items-center
              gap-2
              mb-8
            ">
              <Sparkles className="
                w-4
                h-4
                text-violet-400
              " />

              <h3 className="
                text-xl
                font-bold
              ">
                Navigation
              </h3>
            </div>

            <ul className="space-y-5">

              {quickLinks.map((link, index) => (
                <li key={index}>

                  <Link
                    href={link.href}
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      text-slate-300
                      hover:text-cyan-400
                      transition-all
                      duration-300
                    "
                  >

                    <ChevronRight className="
                      w-4
                      h-4
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    " />

                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =========================
              CONTACT
          ========================== */}
          <div>

            <div className="
              inline-flex
              items-center
              gap-2
              mb-8
            ">
              <Sparkles className="
                w-4
                h-4
                text-cyan-400
              " />

              <h3 className="
                text-xl
                font-bold
              ">
                Contact
              </h3>
            </div>

            <div className="space-y-6">

              <ContactItem
                icon={<Mail className="w-5 h-5" />}
                text="contact@munsphere.org"
              />

              <ContactItem
                icon={<Phone className="w-5 h-5" />}
                text="+91 9876543210"
              />

              <ContactItem
                icon={<MapPin className="w-5 h-5" />}
                text="Global Diplomatic Headquarters"
              />
            </div>
          </div>
        </div>

        {/* =========================
            BOTTOM BAR
        ========================== */}
        <div className="
          mt-20
          pt-8
          border-t
          border-white/10
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-4
        ">

          <p className="
            text-slate-500
            text-sm
          ">
            © 2026 MUNSphere Global Summit.
            All rights reserved.
          </p>

          <div className="
            flex
            items-center
            gap-6
            text-sm
            text-slate-500
          ">
            <span>
              Privacy Policy
            </span>

            <span>
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================
   SOCIAL ICON
========================= */
function SocialIcon({ icon }) {
  return (
    <motion.a
      whileHover={{
        y: -4,
        scale: 1.08,
      }}
      href="#"
      className="
        w-12
        h-12
        rounded-2xl
        glass
        border
        border-white/10
        flex
        items-center
        justify-center
        hover:border-violet-500/40
        hover:text-cyan-400
        transition-all
        duration-300
      "
    >
      {icon}
    </motion.a>
  );
}

/* =========================
   CONTACT ITEM
========================= */
function ContactItem({
  icon,
  text,
}) {
  return (
    <div className="
      flex
      items-start
      gap-4
    ">

      <div className="
        w-11
        h-11
        rounded-xl
        bg-white/5
        border
        border-white/10
        flex
        items-center
        justify-center
        text-cyan-400
        shrink-0
      ">
        {icon}
      </div>

      <p className="
        text-slate-300
        leading-relaxed
      ">
        {text}
      </p>
    </div>
  );
}
