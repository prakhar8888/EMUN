"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdminHeader from "./AdminHeader";

// ======================================
// CONDITIONAL CHROME
// ======================================
// Public pages get the public Navbar/Footer. Admin pages get their
// own dedicated AdminHeader (Dashboard/Settings/Logout, no public
// links). The bare admin-login page (pre-authentication) gets no
// header at all, since there's nothing to navigate to yet.
export default function ConditionalChrome({ children }) {
  const pathname = usePathname();

  const isAdminLogin = pathname?.startsWith("/admin-login");
  const isAdminArea = pathname?.startsWith("/admin") && !isAdminLogin;

  if (isAdminLogin) {
    return <>{children}</>;
  }

  if (isAdminArea) {
    return (
      <>
        <AdminHeader />
        <main className="min-h-screen relative z-10">
          {children}
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 relative z-10">
        {children}
      </main>
      <Footer />
    </>
  );
}
