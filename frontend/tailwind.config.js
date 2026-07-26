/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        // ======================================
        // ROYAL DIPLOMATIC PALETTE
        // ======================================

        // Navy / Backgrounds
        "midnight-navy": "#0A192F",
        "royal-navy": "#112240",
        "deep-indigo": "#1E1B4B",

        // Purples (secondary accent)
        "royal-purple": "#5B21B6",
        "imperial-purple": "#6D28D9",

        // Blue (secondary accent)
        "sapphire-blue": "#1D4ED8",

        // Greens (status - success)
        "emerald-green": "#065F46",
        "forest-green": "#14532D",
        "dark-olive": "#3F4F24",

        // Golds (hero accent family)
        "rich-gold": "#D4AF37",
        "antique-gold": "#B8860B",
        "champagne-gold": "#E6C77A",
        "warm-amber": "#C68E17",

        // Reds (status - destructive)
        burgundy: "#6D071A",
        crimson: "#991B1B",
        ruby: "#B91C1C",

        // Text / Neutrals
        platinum: "#E5E7EB",
        ivory: "#F8F6F0",
        "silver-gray": "#9CA3AF",
        charcoal: "#1F2937",

        // ======================================
        // SEMANTIC TOKENS — reference these in
        // components rather than raw color names
        // ======================================
        "bg-base": "#0A192F",
        "bg-surface": "#112240",
        "bg-surface-elevated": "#16294B",

        "text-heading": "#F8F6F0",
        "text-body": "#E5E7EB",
        "text-muted": "#9CA3AF",

        "accent-primary": "#D4AF37",
        "accent-primary-hover": "#E6C77A",
        "accent-secondary": "#6D28D9",
        "accent-secondary-hover": "#5B21B6",
        "accent-tertiary": "#1D4ED8",

        "status-success": "#065F46",
        "status-success-light": "#0E7C5E",
        "status-error": "#6D071A",
        "status-error-light": "#991B1B",
        "status-warning": "#C68E17",

        "border-subtle": "rgba(212, 175, 55, 0.15)",
        "border-strong": "rgba(212, 175, 55, 0.35)",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      backgroundImage: {
        "gradient-royal": "linear-gradient(135deg, #0A192F 0%, #5B21B6 100%)",
        "gradient-gold": "linear-gradient(135deg, #D4AF37 0%, #E6C77A 100%)",
        "gradient-sapphire": "linear-gradient(135deg, #1E1B4B 0%, #1D4ED8 100%)",
        "gradient-indigo-gold": "linear-gradient(135deg, #1E1B4B 0%, #D4AF37 100%)",
      },

      boxShadow: {
        "gold-glow": "0 0 40px rgba(212, 175, 55, 0.18)",
        "purple-glow": "0 0 40px rgba(109, 40, 217, 0.15)",
        "card-deep": "0 10px 40px rgba(0,0,0,0.5)",
      },
    },
  },

  plugins: [],
};
