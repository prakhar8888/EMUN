"use client";

import {
  useState,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import {
  Mail,
  Lock,
  ShieldCheck,
  Loader2,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {

  // ======================================
  // STATES
  // ======================================

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);


  // ======================================
  // AUTH
  // ======================================

  const {
    login,
    isAuthenticated,
  } = useAuth();


  // ======================================
  // ROUTER
  // ======================================

  const router = useRouter();


  // ======================================
  // REDIRECT IF ALREADY LOGGED IN
  // ======================================

  useEffect(() => {

    if (isAuthenticated) {

      router.push("/");
    }

  }, [
    isAuthenticated,
    router,
  ]);


  // ======================================
  // HANDLE LOGIN
  // ======================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      setIsSubmitting(true);

      try {

        const result =
          await login(
            email,
            password
          );

        if (!result.success) {

          setError(
            result.message
          );

          setIsSubmitting(false);

          return;
        }

        // SUCCESS REDIRECT
        router.push(
          "/register"
        );

      } catch (error) {

        console.error(
          "Login Error:",
          error
        );

        setError(
          "Authentication failed."
        );

      } finally {

        setIsSubmitting(false);
      }
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

      {/* ======================================
          BACKGROUND EFFECTS
      ====================================== */}

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


      {/* ======================================
          LOGIN CARD
      ====================================== */}

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
          max-w-xl
          glass
          border
          border-white/10
          rounded-[32px]
          p-8
          md:p-12
          shadow-2xl
        "
      >

        {/* ======================================
            HEADER
        ====================================== */}

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

            Welcome Back

          </h1>


          <p className="
            text-slate-300
            text-lg
            leading-relaxed
          ">

            Access your diplomatic dashboard
            and continue shaping global dialogue.

          </p>

        </div>


        {/* ======================================
            ERROR MESSAGE
        ====================================== */}

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


        {/* ======================================
            LOGIN FORM
        ====================================== */}

        <form
          onSubmit={handleSubmit}
          className="
            space-y-6
          "
        >

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


            <div className="
              relative
            ">

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

                placeholder="delegate@munsphere.org"

                value={email}

                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }

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
                  transition-all
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


            <div className="
              relative
            ">

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

                placeholder="Enter your password"

                value={password}

                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }

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
                  transition-all
                "
              />

            </div>

          </div>


          {/* SUBMIT BUTTON */}

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

                Authenticating...
              </>
            ) : (
              <>
                <ShieldCheck className="
                  w-5
                  h-5
                " />

                Login to MUNSphere
              </>
            )}

          </button>

        </form>


        {/* ======================================
            FOOTER
        ====================================== */}

        <div className="
          mt-10
          text-center
        ">

          <p className="
            text-slate-400
            text-sm
            mb-5
          ">

            Diplomacy begins with secure access.

          </p>


          {/* SIGNUP CTA */}

          <div className="
            flex
            items-center
            justify-center
            gap-2
            text-sm
          ">

            <span className="
              text-slate-400
            ">
              Don&apos;t have an account?
            </span>


            <button
              type="button"

              onClick={() =>
                router.push(
                  "/signup"
                )
              }

              className="
                inline-flex
                items-center
                gap-2
                text-cyan-400
                hover:text-cyan-300
                font-semibold
                transition-all
              "
            >

              Create Account

              <ArrowRight className="
                w-4
                h-4
              " />

            </button>

          </div>

        </div>

      </motion.div>

    </div>
  );
}
