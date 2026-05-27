"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import {
  Mail,
  MapPin,
  Phone,
  Send,
  Globe,
  MessageSquare,
  Building2,
} from "lucide-react";

export default function ConnectPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      alert(
        "Message transmitted successfully. The Secretariat will respond shortly."
      );
    }, 1800);
  };

  const departments = [
    {
      name: "Office of the Secretary-General",
      email: "secgen@munsphere.org",

      description:
        "Official partnerships, diplomatic collaborations, sponsorships, and institutional communications.",

      icon: <Globe className="w-6 h-6 text-violet-400" />,
    },

    {
      name: "Delegate Affairs Division",
      email: "delegates@munsphere.org",

      description:
        "Delegate registrations, allocations, committee preferences, and conference logistics.",

      icon: <MessageSquare className="w-6 h-6 text-cyan-400" />,
    },

    {
      name: "Academic Council",
      email: "academics@munsphere.org",

      description:
        "Background guides, committee agendas, research standards, and procedural assistance.",

      icon: <Mail className="w-6 h-6 text-pink-400" />,
    },
  ];

  return (
    <div className="relative overflow-hidden">

      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="relative pt-32 pb-24 px-6">

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
            <Mail className="w-5 h-5 text-violet-400" />

            <span className="text-sm text-slate-300 tracking-wide">
              Secretariat • Communication • Global Coordination
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
            Contact the{" "}

            <span className="gradient-text">
              Secretariat
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
            Connect with our academic councils, delegate affairs team,
            and international coordination departments regarding
            registrations, partnerships, and conference operations.
          </motion.p>
        </div>
      </section>

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <section className="section-padding px-6">

        <div className="container-custom">

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

            {/* =========================
                LEFT DIRECTORY
            ========================== */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="xl:col-span-5"
            >

              <div className="sticky top-32">

                <p className="text-cyan-400 uppercase tracking-[0.25em] text-sm mb-4">
                  Official Directory
                </p>

                <h2 className="section-title mb-6">
                  Departments & Divisions
                </h2>

                <p className="text-slate-300 mb-10 leading-relaxed">
                  Direct your inquiries to the appropriate division
                  for faster coordination and conference assistance.
                </p>

                <div className="space-y-6">

                  {departments.map((dept, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.15,
                      }}
                      className="
                        glass
                        hover-card
                        rounded-[2rem]
                        p-6
                        border
                        border-white/10
                        relative
                        overflow-hidden
                      "
                    >

                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition duration-500" />

                      <div className="relative z-10 flex gap-5">

                        <div className="
                          w-14
                          h-14
                          rounded-2xl
                          bg-white/5
                          border
                          border-white/10
                          flex
                          items-center
                          justify-center
                          shrink-0
                        ">
                          {dept.icon}
                        </div>

                        <div>

                          <h3 className="text-xl font-bold mb-2">
                            {dept.name}
                          </h3>

                          <a
                            href={`mailto:${dept.email}`}
                            className="
                              text-cyan-400
                              hover:text-violet-400
                              transition-colors
                              text-sm
                              block
                              mb-3
                            "
                          >
                            {dept.email}
                          </a>

                          <p className="text-slate-300 leading-relaxed text-sm">
                            {dept.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Headquarters */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="
                    mt-10
                    glass
                    rounded-[2rem]
                    p-8
                    border
                    border-white/10
                    relative
                    overflow-hidden
                  "
                >

                  <div className="absolute top-0 right-0 opacity-10">
                    <Building2 className="w-48 h-48" />
                  </div>

                  <div className="relative z-10">

                    <h3 className="text-2xl font-bold mb-8">
                      Global Headquarters
                    </h3>

                    <div className="space-y-6 text-slate-300">

                      <div className="flex gap-4">
                        <MapPin className="w-5 h-5 text-violet-400 shrink-0 mt-1" />

                        <div>
                          100 Diplomatic Plaza
                          <br />
                          International District
                          <br />
                          Geneva, Switzerland
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Phone className="w-5 h-5 text-cyan-400 shrink-0" />

                        <span>
                          +41 (0) 22 123 4567
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* =========================
                CONTACT FORM
            ========================== */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="xl:col-span-7"
            >

              <div className="
                glass
                rounded-[2rem]
                p-8
                md:p-12
                border
                border-white/10
                relative
                overflow-hidden
              ">

                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />

                <div className="relative z-10">

                  <h2 className="text-4xl font-bold mb-4">
                    Send a Dispatch
                  </h2>

                  <p className="text-slate-300 mb-10 leading-relaxed">
                    Submit your official inquiry and our Secretariat
                    will coordinate an appropriate response.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >

                    {/* Row */}
                    <div className="grid md:grid-cols-2 gap-6">

                      <InputField
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Anderson"
                      />

                      <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="delegate@university.edu"
                      />
                    </div>

                    <InputField
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Committee Registration Inquiry"
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
                        Official Message
                      </label>

                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="7"
                        placeholder="Write your official dispatch..."
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

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="
                        w-full
                        md:w-auto
                        px-8
                        py-4
                        rounded-2xl
                        bg-gradient-to-r
                        from-violet-600
                        to-cyan-500
                        hover:scale-105
                        transition-all
                        duration-300
                        font-semibold
                        shadow-xl
                        flex
                        items-center
                        justify-center
                        gap-3
                        disabled:opacity-60
                      "
                    >
                      {isSubmitting ? (
                        "Transmitting..."
                      ) : (
                        <>
                          Submit Dispatch

                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
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
  type = "text",
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
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
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
