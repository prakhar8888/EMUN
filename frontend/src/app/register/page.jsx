"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, ShieldCheck, Sparkles, Send, CheckCircle2, Loader2,
  ChevronDown, Check, AlertCircle, User, Mail, GraduationCap, Phone, Globe,
} from "lucide-react";

import chambersService from "../../services/chambersService";
import AnimatedBackground from "@/components/common/AnimatedBackground";

const COUNTRIES = [
  { name: "India", code: "IN", dial: "+91" },
  { name: "United States", code: "US", dial: "+1" },
  { name: "United Kingdom", code: "GB", dial: "+44" },
  { name: "Canada", code: "CA", dial: "+1" },
  { name: "Australia", code: "AU", dial: "+61" },
  { name: "Germany", code: "DE", dial: "+49" },
  { name: "France", code: "FR", dial: "+33" },
  { name: "United Arab Emirates", code: "AE", dial: "+971" },
  { name: "Singapore", code: "SG", dial: "+65" },
  { name: "Japan", code: "JP", dial: "+81" },
  { name: "China", code: "CN", dial: "+86" },
  { name: "Brazil", code: "BR", dial: "+55" },
  { name: "South Africa", code: "ZA", dial: "+27" },
  { name: "Nigeria", code: "NG", dial: "+234" },
  { name: "Russia", code: "RU", dial: "+7" },
  { name: "Italy", code: "IT", dial: "+39" },
  { name: "Spain", code: "ES", dial: "+34" },
  { name: "Netherlands", code: "NL", dial: "+31" },
  { name: "Switzerland", code: "CH", dial: "+41" },
  { name: "Sweden", code: "SE", dial: "+46" },
  { name: "Saudi Arabia", code: "SA", dial: "+966" },
  { name: "South Korea", code: "KR", dial: "+82" },
  { name: "Mexico", code: "MX", dial: "+52" },
  { name: "Indonesia", code: "ID", dial: "+62" },
  { name: "Pakistan", code: "PK", dial: "+92" },
  { name: "Bangladesh", code: "BD", dial: "+880" },
  { name: "Nepal", code: "NP", dial: "+977" },
  { name: "Sri Lanka", code: "LK", dial: "+94" },
  { name: "New Zealand", code: "NZ", dial: "+64" },
  { name: "Egypt", code: "EG", dial: "+20" },
  { name: "Kenya", code: "KE", dial: "+254" },
  { name: "Turkey", code: "TR", dial: "+90" },
  { name: "Argentina", code: "AR", dial: "+54" },
  { name: "Norway", code: "NO", dial: "+47" },
  { name: "Denmark", code: "DK", dial: "+45" },
  { name: "Ireland", code: "IE", dial: "+353" },
  { name: "Poland", code: "PL", dial: "+48" },
  { name: "Thailand", code: "TH", dial: "+66" },
  { name: "Malaysia", code: "MY", dial: "+60" },
  { name: "Philippines", code: "PH", dial: "+63" },
  { name: "Vietnam", code: "VN", dial: "+84" },
].sort((a, b) => a.name.localeCompare(b.name));

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{7,15}$/;

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", dialCode: "+91",
    university: "", chamberId: "", portfolio: "", experience: "", motivation: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [chambers, setChambers] = useState([]);
  const [loadingChambers, setLoadingChambers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isDialDropdownOpen, setIsDialDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);
  const dialDropdownRef = useRef(null);

  useEffect(() => {
    const fetchChambers = async () => {
      try {
        const data = await chambersService.getAllChambers();
        setChambers(data.data || []);
      } catch (error) {
        console.error("Fetch Chambers Error:", error);
        setErrorMessage("Failed to load committees. Please refresh the page.");
      } finally {
        setLoadingChambers(false);
      }
    };
    fetchChambers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsDropdownOpen(false);
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) setIsCountryDropdownOpen(false);
      if (dialDropdownRef.current && !dialDropdownRef.current.contains(e.target)) setIsDialDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
        setIsCountryDropdownOpen(false);
        setIsDialDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setFieldErrors((prev) => ({ ...prev, email: value && !EMAIL_REGEX.test(value) ? "Enter a valid email address." : "" }));
    }
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setFieldErrors((prev) => ({ ...prev, phone: value && !PHONE_REGEX.test(digitsOnly) ? "Enter a valid phone number (7-15 digits)." : "" }));
    }
  };

  const handleSelectChamber = (chamberId) => {
    setFormData((prev) => ({ ...prev, chamberId: String(chamberId) }));
    setIsDropdownOpen(false);
  };

  const handleSelectCountry = (countryName) => {
    setFormData((prev) => ({ ...prev, portfolio: countryName }));
    setIsCountryDropdownOpen(false);
  };

  const handleSelectDialCode = (dial) => {
    setFormData((prev) => ({ ...prev, dialCode: dial }));
    setIsDialDropdownOpen(false);
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) { setErrorMessage("Please enter your full name."); return false; }
    if (!formData.email.trim()) { setErrorMessage("Please enter your email address."); return false; }
    if (!EMAIL_REGEX.test(formData.email.trim())) { setErrorMessage("Please enter a valid email address."); return false; }
    if (!formData.phone.trim()) { setErrorMessage("Please enter your phone number."); return false; }
    if (!PHONE_REGEX.test(formData.phone.replace(/\D/g, ""))) { setErrorMessage("Please enter a valid phone number."); return false; }
    if (!formData.university.trim()) { setErrorMessage("Please enter your university or institution."); return false; }
    if (!formData.chamberId) { setErrorMessage("Please select a committee before submitting."); return false; }
    if (!formData.portfolio) { setErrorMessage("Please select your country portfolio."); return false; }
    if (!formData.experience.trim()) { setErrorMessage("Please describe your previous MUN experience."); return false; }
    if (!formData.motivation.trim()) { setErrorMessage("Please tell us why you want to join."); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/registrations/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName, email: formData.email, phone: `${formData.dialCode} ${formData.phone}`,
          university: formData.university, chamberId: formData.chamberId, portfolio: formData.portfolio,
          experience: formData.experience, motivation: formData.motivation,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed. Please try again.");

      setSuccessMessage("Registration submitted successfully. The Secretariat will review your application.");
      setFormData({ fullName: "", email: "", phone: "", dialCode: "+91", university: "", chamberId: "", portfolio: "", experience: "", motivation: "" });
      setFieldErrors({});
    } catch (error) {
      console.error("Registration Error:", error);
      setErrorMessage(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedChamber = chambers.find((c) => String(c.id) === String(formData.chamberId));

  return (
    <div className="relative min-h-screen overflow-hidden pt-28 pb-24 px-6">
      <AnimatedBackground />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm uppercase tracking-[0.2em] text-[#E5E7EB]">Delegate Registration</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-[-0.05em] leading-[0.95] mb-6">
            Join The
            <span className="gradient-text block">Diplomatic Assembly</span>
          </h1>

          <p className="max-w-2xl mx-auto text-[#E5E7EB] text-lg leading-relaxed">
            Register for your preferred committee and represent your assigned portfolio in the Enigma MUN conference.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="glass rounded-[32px] p-8 md:p-12">
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="rounded-2xl border border-[#065F46] bg-[#065F46]/15 px-6 py-5 flex items-start gap-4 overflow-hidden"
              >
                <CheckCircle2 className="w-6 h-6 text-[#3FA07A] shrink-0" />
                <p className="text-[#8FCBAE]">{successMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="rounded-2xl border border-[#6D071A] bg-[#6D071A]/15 px-6 py-5 flex items-start gap-4 overflow-hidden"
              >
                <AlertCircle className="w-6 h-6 text-[#D97B7B] shrink-0" />
                <p className="text-[#E8A5A5]">{errorMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputField icon={User} label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" />
              <InputField icon={Mail} label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="delegate@example.com" error={fieldErrors.email} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="form-label">Phone Number<span className="text-[#D4AF37] ml-1">*</span></label>
                <div className="flex gap-3">
                  <div ref={dialDropdownRef} className="relative shrink-0 w-28">
                    <button
                      type="button"
                      onClick={() => setIsDialDropdownOpen((prev) => !prev)}
                      style={{ paddingLeft: "1rem", paddingRight: "1.75rem" }}
                      className="w-full h-14 rounded-2xl bg-[#0F1F38] border border-[#D4AF37]/[0.18] text-[#F8F6F0] text-left relative flex items-center focus:outline-none focus:border-[#D4AF37] transition-colors"
                    >
                      {formData.dialCode}
                      <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none transition-transform duration-300 ${isDialDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isDialDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.98 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-0 mt-3 z-[100] bg-[#112240] border border-[#D4AF37]/[0.15] rounded-2xl overflow-hidden shadow-2xl max-h-64 overflow-y-auto w-56"
                        >
                          {COUNTRIES.map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => handleSelectDialCode(c.dial)}
                              className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 transition-all duration-200 border-b border-[#D4AF37]/[0.08] last:border-b-0 hover:bg-[#5B21B6]/15"
                            >
                              <span className="text-[#E5E7EB] text-sm truncate">{c.name}</span>
                              <span className="text-[#D4AF37] text-sm shrink-0">{c.dial}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="relative flex-1">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF] pointer-events-none z-10" />
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="98765 43210" autoComplete="off"
                      style={{ paddingLeft: "3.25rem", paddingRight: "1.25rem" }}
                      className="w-full h-14 rounded-2xl bg-[#0F1F38] border border-[#D4AF37]/[0.18] text-[#F8F6F0] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>
                {fieldErrors.phone && <p className="mt-2 text-sm text-[#E8A5A5]">{fieldErrors.phone}</p>}
              </div>

              <InputField icon={GraduationCap} label="University / Institution" name="university" value={formData.university} onChange={handleChange} placeholder="Your University" />
            </div>

            <div ref={countryDropdownRef} className="relative">
              <label className="form-label">Country Portfolio<span className="text-[#D4AF37] ml-1">*</span></label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCountryDropdownOpen((prev) => !prev)}
                  style={{ paddingLeft: "3.25rem", paddingRight: "3rem" }}
                  className="w-full text-left relative flex items-center h-14 rounded-2xl bg-[#0F1F38] border border-[#D4AF37]/[0.18] text-[#F8F6F0] focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF] pointer-events-none" />
                  <span className={formData.portfolio ? "text-[#F8F6F0]" : "text-[#9CA3AF]"}>{formData.portfolio || "Select Country"}</span>
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF] pointer-events-none transition-transform duration-300 ${isCountryDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isCountryDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 right-0 mt-3 z-[100] bg-[#112240] border border-[#D4AF37]/[0.15] rounded-2xl overflow-hidden shadow-2xl max-h-64 overflow-y-auto"
                    >
                      {COUNTRIES.map((c) => {
                        const isSelected = c.name === formData.portfolio;
                        return (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => handleSelectCountry(c.name)}
                            className={`w-full text-left px-5 py-4 flex items-center justify-between gap-3 transition-all duration-200 border-b border-[#D4AF37]/[0.08] last:border-b-0 hover:bg-[#5B21B6]/15 ${isSelected ? "bg-gradient-to-r from-[#D4AF37]/15 to-[#E6C77A]/10" : ""}`}
                          >
                            <span className={isSelected ? "text-[#F8F6F0] font-medium" : "text-[#E5E7EB]"}>{c.name}</span>
                            {isSelected && <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div ref={dropdownRef} className="relative">
              <label className="form-label">Committee / Chamber<span className="text-[#D4AF37] ml-1">*</span></label>
              <div className="relative">
                <button
                  type="button"
                  disabled={loadingChambers}
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  style={{ paddingLeft: "3.25rem", paddingRight: "3rem" }}
                  className="w-full text-left relative flex items-center h-14 rounded-2xl bg-[#0F1F38] border border-[#D4AF37]/[0.18] text-[#F8F6F0] focus:outline-none focus:border-[#D4AF37] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF] pointer-events-none" />
                  <span className={selectedChamber ? "text-[#F8F6F0]" : "text-[#9CA3AF]"}>
                    {loadingChambers ? "Loading committees..." : selectedChamber ? selectedChamber.name : chambers.length === 0 ? "No committees available" : "Select Committee"}
                  </span>
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF] pointer-events-none transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && !loadingChambers && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 right-0 mt-3 z-[100] bg-[#112240] border border-[#D4AF37]/[0.15] rounded-2xl overflow-hidden shadow-2xl max-h-64 overflow-y-auto"
                    >
                      {chambers.length === 0 ? (
                        <div className="px-5 py-4 text-[#9CA3AF] text-sm">No committees available.</div>
                      ) : (
                        chambers.map((chamber) => {
                          const isSelected = String(chamber.id) === String(formData.chamberId);
                          return (
                            <button
                              key={chamber.id}
                              type="button"
                              onClick={() => handleSelectChamber(chamber.id)}
                              className={`w-full text-left px-5 py-4 flex items-center justify-between gap-3 transition-all duration-200 border-b border-[#D4AF37]/[0.08] last:border-b-0 hover:bg-[#5B21B6]/15 ${isSelected ? "bg-gradient-to-r from-[#D4AF37]/15 to-[#E6C77A]/10" : ""}`}
                            >
                              <span className={isSelected ? "text-[#F8F6F0] font-medium" : "text-[#E5E7EB]"}>{chamber.name}</span>
                              {isSelected && <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />}
                            </button>
                          );
                        })
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {!loadingChambers && chambers.length === 0 && (
                <p className="mt-3 text-sm text-[#C68E17]">No committees are available yet. Please check back later.</p>
              )}
            </div>

            <div>
              <label className="form-label">Previous MUN Experience<span className="text-[#D4AF37] ml-1">*</span></label>
              <textarea rows={4} name="experience" value={formData.experience} onChange={handleChange} autoComplete="off" placeholder="Describe your previous MUN or leadership experience..." className="form-input resize-none" />
            </div>

            <div>
              <label className="form-label">Why do you want to join?<span className="text-[#D4AF37] ml-1">*</span></label>
              <textarea rows={5} name="motivation" value={formData.motivation} onChange={handleChange} autoComplete="off" placeholder="Explain your motivation for participating..." className="form-input resize-none" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loadingChambers}
              className="w-full py-5 rounded-2xl btn-gradient font-semibold text-lg glow disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (<><Loader2 className="w-5 h-5 animate-spin" /> Submitting Registration...</>) : (<><Send className="w-5 h-5" /> Submit Registration</>)}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

function InputField({ icon: Icon, label, name, value, onChange, placeholder, type = "text", error }) {
  return (
    <div>
      <label className="form-label">{label}<span className="text-[#D4AF37] ml-1">*</span></label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF] pointer-events-none z-10" />
        <input
          type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} autoComplete="off"
          style={{ paddingLeft: "3.25rem", paddingRight: "1.25rem" }}
          className="w-full h-14 rounded-2xl bg-[#0F1F38] border border-[#D4AF37]/[0.18] text-[#F8F6F0] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#D4AF37] transition-colors"
        />
      </div>
      {error && <p className="mt-2 text-sm text-[#E8A5A5]">{error}</p>}
    </div>
  );
}
