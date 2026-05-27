"use client";

import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  Building2,
  FileText,
  ShieldCheck,
  Sparkles,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import ProtectedRoute from "../../components/common/ProtectedRoute";

import {
  createRegistration,
} from "../../services/registrationService";

import chambersService from "../../services/chambersService";

export default function RegisterPage() {

  // ======================================
  // STATES
  // ======================================

  const [formData, setFormData] =
    useState({
      chamberId: "",
      portfolio: "",
      experience: "",
      motivation: "",
    });

  const [chambers, setChambers] =
    useState([]);

  const [loadingChambers, setLoadingChambers] =
    useState(true);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");


  // ======================================
  // LOAD CHAMBERS
  // ======================================

  useEffect(() => {

    const fetchChambers =
      async () => {

        try {

          const data =
            await chambersService.getAllChambers();

          setChambers(
            data.data || []
          );

        } catch (error) {

          console.error(
            "Fetch Chambers Error:",
            error
          );

          setErrorMessage(
            "Failed to load committees."
          );

        } finally {

          setLoadingChambers(false);
        }
      };

    fetchChambers();

  }, []);


  // ======================================
  // HANDLE CHANGE
  // ======================================

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };


  // ======================================
  // HANDLE SUBMIT
  // ======================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setIsSubmitting(true);

      setSuccessMessage("");

      setErrorMessage("");

      try {

        await createRegistration(
          formData
        );

        setSuccessMessage(
          "Registration submitted successfully."
        );

        setFormData({
          chamberId: "",
          portfolio: "",
          experience: "",
          motivation: "",
        });

      } catch (error) {

        console.error(
          "Registration Error:",
          error
        );

        setErrorMessage(
          error.message ||
          "Registration failed."
        );

      } finally {

        setIsSubmitting(false);
      }
    };


  return (
    <ProtectedRoute>

      <div className="
        relative
        min-h-screen
        overflow-hidden
        pt-28
        pb-24
        px-6
      ">

        {/* ======================================
            BACKGROUND
        ====================================== */}

        <div className="
          absolute
          inset-0
          z-0
        ">

          <div className="
            blur-circle
            blur-purple
            w-[500px]
            h-[500px]
            top-[-180px]
            left-[-140px]
          " />

          <div className="
            blur-circle
            blur-cyan
            w-[400px]
            h-[400px]
            bottom-[-120px]
            right-[-100px]
          " />

          <div className="
            absolute
            inset-0
            grid-background
            opacity-[0.04]
          " />

        </div>


        {/* ======================================
            PAGE CONTENT
        ====================================== */}

        <div className="
          relative
          z-10
          max-w-5xl
          mx-auto
        ">

          {/* ======================================
              HEADER
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
              text-center
              mb-16
            "
          >

            <div className="
              inline-flex
              items-center
              gap-3
              glass
              px-6
              py-3
              rounded-full
              border
              border-white/10
              mb-8
            ">

              <Sparkles className="
                w-5
                h-5
                text-cyan-400
              " />

              <span className="
                text-sm
                uppercase
                tracking-[0.2em]
                text-slate-300
              ">
                Delegate Registration
              </span>

            </div>


            <h1 className="
              text-5xl
              md:text-6xl
              font-black
              tracking-[-0.05em]
              leading-[0.95]
              mb-6
            ">

              Join The

              <span className="
                gradient-text
                block
              ">
                Diplomatic Assembly
              </span>

            </h1>


            <p className="
              max-w-2xl
              mx-auto
              text-slate-300
              text-lg
              leading-relaxed
            ">

              Register for your preferred
              committee and represent your
              assigned portfolio in the
              Enigma MUN conference.

            </p>

          </motion.div>


          {/* ======================================
              FORM CARD
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
              glass
              rounded-[32px]
              border
              border-white/10
              p-8
              md:p-12
            "
          >

            {/* SUCCESS */}

            {successMessage && (

              <div className="
                mb-8
                rounded-2xl
                border
                border-emerald-500/20
                bg-emerald-500/10
                px-6
                py-5
                flex
                items-start
                gap-4
              ">

                <CheckCircle2 className="
                  w-6
                  h-6
                  text-emerald-400
                " />

                <p className="
                  text-emerald-300
                ">
                  {successMessage}
                </p>

              </div>
            )}


            {/* ERROR */}

            {errorMessage && (

              <div className="
                mb-8
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/10
                px-6
                py-5
              ">

                <p className="
                  text-red-300
                ">
                  {errorMessage}
                </p>

              </div>
            )}


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="
                space-y-8
              "
            >

              {/* COMMITTEE */}

              <div>

                <label className="
                  form-label
                ">
                  Committee / Chamber
                </label>

                <div className="
                  relative
                ">

                  <Building2 className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    w-5
                    h-5
                    text-slate-400
                  " />

                  <select
                    required
                    name="chamberId"
                    value={formData.chamberId}
                    onChange={handleChange}
                    className="
                      form-input
                      pl-12
                    "
                  >

                    <option value="">
                      Select Committee
                    </option>

                    {loadingChambers ? (

                      <option>
                        Loading...
                      </option>

                    ) : (

                      chambers.map(
                        (chamber) => (

                          <option
                            key={chamber.id}
                            value={chamber.id}
                          >
                            {chamber.name}
                          </option>
                        )
                      )
                    )}

                  </select>

                </div>
              </div>


              {/* PORTFOLIO */}

              <InputField
                icon={ShieldCheck}
                label="Country Portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="e.g. United States"
              />


              {/* EXPERIENCE */}

              <div>

                <label className="
                  form-label
                ">
                  Previous MUN Experience
                </label>

                <textarea
                  required
                  rows={4}
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Describe your previous MUN or leadership experience..."
                  className="
                    form-input
                    resize-none
                  "
                />

              </div>


              {/* MOTIVATION */}

              <div>

                <label className="
                  form-label
                ">
                  Why do you want to join?
                </label>

                <textarea
                  required
                  rows={5}
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  placeholder="Explain your motivation for participating..."
                  className="
                    form-input
                    resize-none
                  "
                />

              </div>


              {/* SUBMIT */}

              <button
                type="submit"

                disabled={
                  isSubmitting
                }

                className="
                  w-full
                  py-5
                  rounded-2xl
                  bg-gradient-to-r
                  from-violet-600
                  to-cyan-500
                  hover:scale-[1.01]
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

                    Submitting Registration...
                  </>
                ) : (
                  <>
                    <Send className="
                      w-5
                      h-5
                    " />

                    Submit Registration
                  </>
                )}

              </button>

            </form>

          </motion.div>

        </div>
      </div>

    </ProtectedRoute>
  );
}


/* ======================================
    REUSABLE INPUT
====================================== */

function InputField({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  placeholder,
}) {

  return (
    <div>

      <label className="
        form-label
      ">
        {label}
      </label>

      <div className="
        relative
      ">

        <Icon className="
          absolute
          left-4
          top-5
          w-5
          h-5
          text-slate-400
        " />

        <input
          required
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            form-input
            pl-12
          "
        />

      </div>
    </div>
  );
}
