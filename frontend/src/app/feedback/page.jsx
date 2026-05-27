"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  Star,
  Send,
  MessageSquare,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);

  const [hover, setHover] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating before submission.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      setIsSubmitted(true);

      setFormData({
        name: "",
        comment: "",
      });

      setRating(0);

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1800);
  };

  return (
    <div className="relative overflow-hidden">

      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="relative pt-32 pb-20 px-6">

        {/* Background Effects */}
        <div className="absolute inset-0 z-0">

          <div className="blur-circle blur-purple w-[350px] h-[350px] top-0 left-0" />

          <div className="blur-circle blur-cyan w-[300px] h-[300px] bottom-0 right-0" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="
              inline-flex
              items-center
              gap-3
              glass
              px-6
              py-3
              rounded-full
              mb-8
            "
          >
            <MessageSquare className="w-5 h-5 text-violet-400" />

            <span className="text-sm text-slate-300 tracking-wide">
              Delegate Insights • Conference Review • Experience Feedback
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              mb-8
            "
          >
            Delegate{" "}

            <span className="gradient-text">
              Feedback
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="
              text-lg
              md:text-2xl
              text-slate-300
              max-w-3xl
              mx-auto
              leading-relaxed
            "
          >
            Your insights help shape the future of MUNSphere.
            Share your summit experience, committee observations,
            and recommendations with the Secretariat.
          </motion.p>
        </div>
      </section>

      {/* =========================
          FEEDBACK FORM
      ========================== */}
      <section className="section-padding px-6 pt-0">

        <div className="container-custom max-w-3xl">

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="
              glass
              rounded-[2rem]
              p-8
              md:p-12
              border
              border-white/10
              relative
              overflow-hidden
            "
          >

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />

            {/* =========================
                SUCCESS STATE
            ========================== */}
            <AnimatePresence>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="
                    absolute
                    inset-0
                    bg-[#050816]/95
                    backdrop-blur-xl
                    z-30
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    px-8
                  "
                >

                  <motion.div
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="
                      w-24
                      h-24
                      rounded-full
                      bg-gradient-to-r
                      from-violet-600
                      to-cyan-500
                      flex
                      items-center
                      justify-center
                      mb-8
                      shadow-[0_0_50px_rgba(124,58,237,0.5)]
                    "
                  >
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </motion.div>

                  <h3 className="
                    text-4xl
                    font-black
                    mb-4
                  ">
                    Thank You
                  </h3>

                  <p className="
                    text-slate-300
                    max-w-md
                    leading-relaxed
                  ">
                    Your feedback has been successfully recorded
                    and forwarded to the Secretariat review panel.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* =========================
                FORM
            ========================== */}
            <form
              onSubmit={handleSubmit}
              className="relative z-10 space-y-10"
            >

              {/* Header */}
              <div className="text-center">

                <div className="
                  inline-flex
                  items-center
                  justify-center
                  w-20
                  h-20
                  rounded-full
                  bg-white/5
                  border
                  border-white/10
                  mb-6
                ">
                  <Sparkles className="w-10 h-10 text-violet-400" />
                </div>

                <h2 className="
                  text-4xl
                  font-black
                  mb-4
                ">
                  Share Your Experience
                </h2>

                <p className="
                  text-slate-300
                  leading-relaxed
                ">
                  Help us improve future conferences through
                  constructive feedback and delegate insights.
                </p>
              </div>

              {/* =========================
                  STAR RATING
              ========================== */}
              <div className="text-center">

                <label className="
                  block
                  text-sm
                  uppercase
                  tracking-[0.25em]
                  text-slate-300
                  mb-6
                ">
                  Overall Conference Rating
                </label>

                <div className="
                  flex
                  justify-center
                  gap-4
                  flex-wrap
                ">

                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;

                    return (
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        key={starValue}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`
                            w-12
                            h-12
                            transition-all
                            duration-300
                            ${
                              starValue <= (hover || rating)
                                ? "fill-violet-500 text-violet-500 drop-shadow-[0_0_20px_rgba(124,58,237,0.8)]"
                                : "fill-transparent text-slate-600"
                            }
                          `}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* =========================
                  FORM INPUTS
              ========================== */}
              <div className="
                space-y-8
                pt-8
                border-t
                border-white/10
              ">

                {/* Name */}
                <InputField
                  label="Delegate Name (Optional)"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Anderson"
                />

                {/* Message */}
                <div>

                  <label className="
                    block
                    text-sm
                    uppercase
                    tracking-[0.2em]
                    text-slate-300
                    mb-3
                  ">
                    Comments & Suggestions
                  </label>

                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Share your thoughts on committees, organization, logistics, and overall summit experience..."
                    className="
                      w-full
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/10
                      px-5
                      py-4
                      text-white
                      placeholder:text-slate-500
                      focus:outline-none
                      focus:ring-2
                      focus:ring-violet-500/50
                      transition
                      resize-none
                    "
                  />
                </div>
              </div>

              {/* =========================
                  SUBMIT BUTTON
              ========================== */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full
                  py-5
                  rounded-2xl
                  bg-gradient-to-r
                  from-violet-600
                  to-cyan-500
                  hover:scale-[1.02]
                  transition-all
                  duration-300
                  font-semibold
                  shadow-2xl
                  flex
                  items-center
                  justify-center
                  gap-3
                  disabled:opacity-60
                "
              >
                {isSubmitting ? (
                  "Submitting Feedback..."
                ) : (
                  <>
                    Submit Feedback

                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* =========================
   INPUT FIELD
========================= */
function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>

      <label className="
        block
        text-sm
        uppercase
        tracking-[0.2em]
        text-slate-300
        mb-3
      ">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-2xl
          bg-white/5
          border
          border-white/10
          px-5
          py-4
          text-white
          placeholder:text-slate-500
          focus:outline-none
          focus:ring-2
          focus:ring-violet-500/50
          transition
        "
      />
    </div>
  );
}
