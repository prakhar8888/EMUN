import "./globals.css";

import Navbar from "../components/layout/Navbar";

import Footer from "../components/layout/Footer";

import { AppProvider } from "../context/AppContext";

import {
  AuthProvider,
} from "../context/AuthContext";


// ======================================
// METADATA
// ======================================

export const metadata = {

  title:
    "MUNSphere Global Summit",

  description:
    "A premium Model United Nations platform for diplomacy, leadership, debate, and global collaboration.",

  keywords: [
    "MUN",
    "Model United Nations",
    "Diplomacy",
    "International Relations",
    "Global Summit",
    "Youth Leadership",
  ],

  authors: [
    {
      name: "MUNSphere",
    },
  ],
};


// ======================================
// ROOT LAYOUT
// ======================================

export default function RootLayout({
  children,
}) {

  return (

    <html lang="en">

      <body className="
        relative
        bg-[#050816]
        text-white
        overflow-x-hidden
        antialiased
      ">

        {/* ======================================
            GLOBAL BACKGROUND EFFECTS
        ====================================== */}

        <div className="
          blur-circle
          blur-purple
          w-[400px]
          h-[400px]
          top-[-120px]
          left-[-120px]
        " />

        <div className="
          blur-circle
          blur-cyan
          w-[350px]
          h-[350px]
          bottom-[-120px]
          right-[-120px]
        " />


        {/* GRID BACKGROUND */}

        <div
          className="
            fixed
            inset-0
            z-[-2]
            opacity-[0.03]
            pointer-events-none
          "

          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,

            backgroundSize:
              "60px 60px",
          }}
        />


        {/* OVERLAY */}

        <div className="
          fixed
          inset-0
          bg-gradient-to-b
          from-transparent
          via-[#050816]/20
          to-[#050816]
          z-[-1]
        " />


        {/* ======================================
            PROVIDERS
        ====================================== */}

        <AppProvider>

          <AuthProvider>

            {/* NAVBAR */}

            <Navbar />


            {/* MAIN */}

            <main className="
              min-h-screen
              pt-20
              relative
              z-10
            ">
              {children}
            </main>


            {/* FOOTER */}

            <Footer />

          </AuthProvider>

        </AppProvider>

      </body>

    </html>
  );
}
