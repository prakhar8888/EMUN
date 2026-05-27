"use client";

import { motion } from "framer-motion";

import {
  Globe,
  Sparkles,
} from "lucide-react";

export default function LoadingSpinner({
  text = "Initializing Summit Systems...",
  fullScreen = false,
}) {
  const content = (
    <div className="
      flex
      flex-col
      items-center
      justify-center
      space-y-8
      relative
    ">

      {/* =========================
          AMBIENT GLOW
      ========================== */}
      <div className="
        absolute
        w-40
        h-40
        rounded-full
        bg-violet-500/20
        blur-3xl
      " />

      {/* =========================
          LOADER
      ========================== */}
      <div className="
        relative
        flex
        items-center
        justify-center
        w-28
        h-28
      ">

        {/* Outer Ring */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            inset-0
            rounded-full
            border-[2px]
            border-transparent
            border-t-violet-500
            border-r-cyan-400
            shadow-[0_0_30px_rgba(124,58,237,0.4)]
          "
        />

        {/* Middle Ring */}
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            inset-3
            rounded-full
            border-[2px]
            border-transparent
            border-l-cyan-400
            border-b-pink-500
            opacity-80
          "
        />

        {/* Inner Glow */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            inset-7
            rounded-full
            bg-gradient-to-br
            from-violet-500/20
            to-cyan-500/20
            blur-md
          "
        />

        {/* Center Icon */}
        <motion.div
          animate={{
            scale: [0.95, 1.05, 0.95],
            rotate: [0, 6, -6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            relative
            z-10
            flex
            items-center
            justify-center
            w-16
            h-16
            rounded-2xl
            glass
            border
            border-white/10
          "
        >

          <Globe className="
            w-8
            h-8
            text-cyan-400
          " />
        </motion.div>

        {/* Orbiting Spark */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            inset-0
          "
        >

          <div className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
          ">
            <Sparkles className="
              w-5
              h-5
              text-pink-400
            " />
          </div>
        </motion.div>
      </div>

      {/* =========================
          LOADING TEXT
      ========================== */}
      {text && (
        <div className="text-center">

          <motion.p
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              text-sm
              uppercase
              tracking-[0.35em]
              text-slate-300
              font-semibold
            "
          >
            {text}
          </motion.p>

          <motion.div
            animate={{
              width: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              h-[2px]
              bg-gradient-to-r
              from-violet-500
              to-cyan-400
              rounded-full
              mt-4
              mx-auto
            "
          />
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-[#050816]/90
        backdrop-blur-xl
        overflow-hidden
      ">

        {/* Background Grid */}
        <div className="
          absolute
          inset-0
          grid-background
          opacity-[0.04]
        " />

        {/* Background Blur */}
        <div className="
          absolute
          top-0
          left-0
          w-[400px]
          h-[400px]
          blur-circle
          blur-purple
        " />

        <div className="
          absolute
          bottom-0
          right-0
          w-[350px]
          h-[350px]
          blur-circle
          blur-cyan
        " />

        {content}
      </div>
    );
  }

  return (
    <div className="
      flex
      items-center
      justify-center
      w-full
      py-16
    ">
      {content}
    </div>
  );
}
