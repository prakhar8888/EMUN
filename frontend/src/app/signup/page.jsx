"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import {
  User,
  Mail,
  Lock,
  Globe,
  GraduationCap,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function SignupPage() {

  // ======================================
  // STATES
  // ======================================

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      password: "",
      university: "",
      country: "",
    });

  const [error, setError] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);


  // ======================================
  // AUTH
  // ======================================

  const {
    signup,
    isAuthenticated,
  } = useAuth();


  // ======================================
  // ROUTER
  // ======================================

  const router = useRouter();


  // ======================================
  // REDIRECT IF AUTHENTICATED
  // ======================================

  useEffect(() => {

    if (isAuthenticated) {
      router.push("/");
    }

  }, [isAuthenticated, router]);


  // ======================================
  // HANDLE INPUT CHANGE
  // ======================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };


  // ======================================
  // HANDLE SUBMIT
  // ======================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      setIsSubmitting(true);

      const result =
        await signup(formData);

      if (!result.success) {

        setError(
          result.message
        );

        setIsSubmitting(false);

        return;
      }

      router.push("/");
    };


  return (
    <div className="
      relative
      min-h-screen
      overflow-hidden
      flex
      items-center
      justify-center
      px-6
      py-20
    ">

      {/* =========================
          BACKGROUND EFFECTS
      ========================== */}

      <div className="
        absolute
        inset-0
        z-0
      ">

        {/* Purple Glow */}
        <div className="
          blur-circle
          blur-purple
          w-[420px]
          h-[420px]
          top-[-120px]
          left-[-120px]
        " />

        {/* Cyan Glow */}
        <div className="
          blur-circle
          blur-cyan
          w-[360px]
          h-[360px]
          bottom-[-120px]
          right-[-120px]
        " />

        {/* Grid */}
        <div className="
          absolute
          inset-0
          grid-background
          opacity-[0.03]
        " />
      </div>


      {/* =========================
          SIGNUP CARD
      ========================== */}

      <motion.div

        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.8,
        }}

        className="
          relative
          z-10
          w-full
          max-w-2xl
          glass
          border
          border-white/10
          rounded-[32px]
          p-8
          md:p-12
          shadow-2xl
        "
      >

        {/* =========================
            HEADER
        ========================== */}

        <div className="
          text-center
          mb-10
        ">

          <div className="
            inline-flex
            items-center
            justify-center
            w-20
            h-20
            rounded-3xl
            bg-gradient-to-br
            from-violet-600
            to-cyan-500
            mb-6
            shadow-xl
          ">

            <ShieldCheck className="
              w-10
              h-10
              text-white
            " />

          </div>


          <h1 className="
            text-4xl
            md:text-5xl
            font-black
            tracking-[-0.04em]
            mb-4
          ">

            Join MUNSphere

          </h1>


          <p className="
            text-slate-300
            text-lg
            leading-relaxed
          ">

            Begin your diplomatic journey and
            become part of the next generation
            of global leaders.

          </p>
        </div>


        {/* =========================
            ERROR MESSAGE
        ========================== */}

        {error && (
          <div className="
            mb-6
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/10
            px-5
            py-4
            text-red-300
          ">
            {error}
          </div>
        )}


        {/* =========================
            SIGNUP FORM
        ========================== */}

        <form
          onSubmit={handleSubmit}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >

          {/* FULL NAME */}

          <div>

            <label className="
              block
              mb-3
              text-sm
              uppercase
              tracking-[0.15em]
              text-slate-400
            ">
              Full Name
            </label>

            <div className="relative">

              <User className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                w-5
                h-5
                text-slate-500
              " />

              <input
                type="text"
                name="fullName"

                value={formData.fullName}

                onChange={handleChange}

                placeholder="John Doe"

                required

                className="
                  w-full
                  pl-12
                  pr-4
                  py-4
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  focus:border-cyan-400/50
                  focus:outline-none
                  text-white
                  placeholder:text-slate-500
                "
              />
            </div>
          </div>


          {/* EMAIL */}

          <div>

            <label className="
              block
              mb-3
              text-sm
              uppercase
              tracking-[0.15em]
              text-slate-400
            ">
              Email Address
            </label>

            <div className="relative">

              <Mail className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                w-5
                h-5
                text-slate-500
              " />

              <input
                type="email"
                name="email"

                value={formData.email}

                onChange={handleChange}

                placeholder="delegate@munsphere.org"

                required

                className="
                  w-full
                  pl-12
                  pr-4
                  py-4
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  focus:border-cyan-400/50
                  focus:outline-none
                  text-white
                  placeholder:text-slate-500
                "
              />
            </div>
          </div>


          {/* PASSWORD */}

          <div>

            <label className="
              block
              mb-3
              text-sm
              uppercase
              tracking-[0.15em]
              text-slate-400
            ">
              Password
            </label>

            <div className="relative">

              <Lock className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                w-5
                h-5
                text-slate-500
              " />

              <input
                type="password"
                name="password"

                value={formData.password}

                onChange={handleChange}

                placeholder="Create a secure password"

                required

                className="
                  w-full
                  pl-12
                  pr-4
                  py-4
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  focus:border-violet-400/50
                  focus:outline-none
                  text-white
                  placeholder:text-slate-500
                "
              />
            </div>
          </div>


          {/* UNIVERSITY */}

          <div>

            <label className="
              block
              mb-3
              text-sm
              uppercase
              tracking-[0.15em]
              text-slate-400
            ">
              University
            </label>

            <div className="relative">

              <GraduationCap className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                w-5
                h-5
                text-slate-500
              " />

              <input
                type="text"
                name="university"

                value={formData.university}

                onChange={handleChange}

                placeholder="Your Institution"

                className="
                  w-full
                  pl-12
                  pr-4
                  py-4
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  focus:border-cyan-400/50
                  focus:outline-none
                  text-white
                  placeholder:text-slate-500
                "
              />
            </div>
          </div>


          {/* COUNTRY */}

          <div className="md:col-span-2">

            <label className="
              block
              mb-3
              text-sm
              uppercase
              tracking-[0.15em]
              text-slate-400
            ">
              Country
            </label>

            <div className="relative">

              <Globe className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                w-5
                h-5
                text-slate-500
              " />

              <input
                type="text"
                name="country"

                value={formData.country}

                onChange={handleChange}

                placeholder="Your Country"

                className="
                  w-full
                  pl-12
                  pr-4
                  py-4
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  focus:border-violet-400/50
                  focus:outline-none
                  text-white
                  placeholder:text-slate-500
                "
              />
            </div>
          </div>


          {/* SUBMIT BUTTON */}

          <div className="md:col-span-2">

            <button
              type="submit"

              disabled={isSubmitting}

              className="
                w-full
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-violet-600
                to-cyan-500
                hover:scale-[1.02]
                transition-all
                duration-300
                font-semibold
                text-lg
                shadow-2xl
                disabled:opacity-60
                disabled:cursor-not-allowed
                flex
                items-center
                justify-center
                gap-3
              "
            >

              {isSubmitting ? (
                <>
                  <Loader2 className="
                    w-5
                    h-5
                    animate-spin
                  " />

                  Creating Account...
                </>
              ) : (
                <>
                  <ShieldCheck className="
                    w-5
                    h-5
                  " />

                  Create Account
                </>
              )}

            </button>
          </div>
        </form>


        {/* =========================
            FOOTER
        ========================== */}

        <div className="
          mt-10
          text-center
          text-slate-400
          text-sm
        ">

          Diplomacy begins with leadership.

        </div>

      </motion.div>
    </div>
  );
}
