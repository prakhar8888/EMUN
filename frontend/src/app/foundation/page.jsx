"use client";

import { motion } from "framer-motion";
import {
  Award,
  Mail,
  Phone,
  Quote,
} from "lucide-react";

import AnimatedBackground from "@/components/common/AnimatedBackground";

const secretariat = [
  {
    id: 1,
    name: "Anaadi Shukla",
    title: "General Secretary",
    shortTitle: "GS",
    bio: "Leading the Secretariat with a vision for elevating Enigma MUN into a premier platform for diplomacy, leadership, and global collaboration.",
    image: "/anaadi.jpeg",
    email: "anaadi.enigmamun@gmail.com",
    phone: "+91 96969 04321",
  },
  {
    id: 2,
    name: "Addhyan Yadav",
    title: "Under Secretary General of Delegate Affairs",
    shortTitle: "USG Delegate Affairs",
    bio: "Overseeing delegate experience, registrations, and engagement to ensure every participant feels supported throughout their Enigma MUN journey.",
    image: "/Addhyan.jpeg",
    email: "addhyan.enigmamun@gmail.com",
    phone: "+91 75228 01221",
  },
  {
    id: 3,
    name: "G.Ridhika Koti",
    title: "Under Secretary General of Public Relations",
    shortTitle: "USG Public Relations",
    bio: "Shaping how the world discovers Enigma MUN, from brand identity to outreach that brings new delegates into every conference.",
    image: "/G.ridhika.png",
    email: "ridhikagkoti.enigmamun@gmail.com",
    phone: "+91 93801 97667",
  },
  {
    id: 4,
    name: "Samvart Madhukar",
    title: "Under Secretary General for Academics",
    shortTitle: "USG Academics",
    bio: "Supporting the Academics team in shaping agendas and committee structures that challenge and inspire every delegate.",
    image: "/Samvart.jpeg",
    email: "samvart.enigmamun@gmail.com",
    phone: "+91 93353 31464",
  },
  {
    id: 5,
    name: "Prakhar Gupta",
    title: "Technical Secretary",
    shortTitle: "Technical SG",
    bio: "Building and maintaining the digital infrastructure that powers Enigma MUN, from registration systems to live conference operations.",
    image: "/Prakhar.jpeg",
    email: "prakhar.enigmamun@gmail.com",
    phone: "+91 87077 48399",
  },
  {
    id: 6,
    name: "Vansh Sen",
    title: "Under Secretary General for Operations",
    shortTitle: "USG Operations",
    bio: "Coordinating the logistics and on-ground operations that bring every Enigma MUN conference to life, seamlessly and on schedule.",
    image: "/Vansh.jpeg",
    email: "vansh.enigmamun@gmail.com",
    phone: "+91 73079 98590",
  },
];

export default function FoundationPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-28 pb-32 px-6">

      <AnimatedBackground />

      <div className="relative z-10 max-w-6xl mx-auto text-center mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 glass px-6 py-4 rounded-full mb-10"
        >
          <Award className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-sm uppercase tracking-[0.2em] text-[#E5E7EB]">Leadership & Secretariat</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl xl:text-8xl font-black tracking-[-0.05em] leading-[0.95] mb-8"
        >
          <span className="gradient-text">The Secretariat</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "120px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[4px] rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E6C77A] mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-3xl mx-auto text-lg md:text-2xl text-[#E5E7EB] leading-relaxed"
        >
          Meet the leadership behind Enigma MUN — a collective of
          diplomats, strategists, and academic innovators shaping the
          next generation of global discourse.
        </motion.p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {secretariat.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: index * 0.06, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="group relative rounded-[2rem] overflow-hidden border border-[#D4AF37]/[0.12] bg-[#112240] hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-[0_25px_70px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-[#D4AF37]/0 to-[#1E1B4B]/0 group-hover:from-[#D4AF37]/[0.04] group-hover:to-[#5B21B6]/[0.06] transition-all duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row gap-8 p-8">
              <div className="relative w-full sm:w-44 h-56 sm:h-52 shrink-0 rounded-[1.5rem] overflow-hidden border border-[#D4AF37]/[0.12] mx-auto sm:mx-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />
                  <p className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-semibold leading-relaxed">
                    {member.shortTitle}
                  </p>
                </div>

                <h3 className="text-3xl font-black text-[#F8F6F0] mb-2 tracking-tight">{member.name}</h3>

                <p className="text-[#9CA3AF] text-sm mb-5 leading-relaxed">{member.title}</p>

                <div className="flex gap-3 justify-center sm:justify-start">
                  <Quote className="w-4 h-4 text-[#D4AF37]/60 shrink-0 mt-1 hidden sm:block" />
                  <p className="text-[#E5E7EB] leading-relaxed">{member.bio}</p>
                </div>
              </div>
            </div>

            {/* Contact Info - links transition to gold/purple on hover */}
            <div className="relative z-10 px-8 pb-8">
              <div className="pt-5 border-t border-[#D4AF37]/[0.12] flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-4 sm:gap-6">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 text-sm text-[#E5E7EB] hover:text-[#E6C77A] transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  {member.email}
                </a>

                <span className="hidden sm:block w-1 h-1 rounded-full bg-[#D4AF37]/[0.12]" />

                <div className="inline-flex items-center gap-2 text-sm text-[#E5E7EB] hover:text-[#6D28D9] transition-colors duration-300">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  {member.phone}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
