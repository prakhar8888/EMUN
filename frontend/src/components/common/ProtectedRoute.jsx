"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
  adminOnly = false,
  requiredPermission = null,
}) {
  const { user, loading, isAuthenticated } = useAuth();

  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  const effectiveRoles = adminOnly
    ? ["ADMIN", "SECRETARIAT"]
    : allowedRoles;

  const userRole = user?.role?.toUpperCase();
  const hasRequiredRole =
    effectiveRoles.length === 0 || effectiveRoles.includes(userRole);

  const isStaffRole = userRole === "ADMIN" || userRole === "SECRETARIAT";
  const hasActiveStaffStatus =
    !isStaffRole || user?.staffStatus === "ACTIVE";

  const hasRequiredPermission =
    !requiredPermission ||
    userRole === "ADMIN" ||
    user?.[requiredPermission] === true;

  const isFullyAuthorized =
    hasRequiredRole && hasActiveStaffStatus && hasRequiredPermission;

  useEffect(() => {
    if (loading) return;

    const authorizationCheck = setTimeout(() => {
      if (!isAuthenticated) {
        // Anaadi's page acts as the general, primary entry point for
        // anyone reaching a protected page without a session. If a
        // Secretariat member lands here by mistake, that page itself
        // detects their role and redirects them to the staff portal.
        router.replace("/enigma-secretariat-portal");
      } else if (!isFullyAuthorized) {
        router.replace("/admin");
      } else {
        setIsAuthorizing(false);
      }
    }, 50);

    return () => clearTimeout(authorizationCheck);
  }, [loading, isAuthenticated, isFullyAuthorized, router]);

  if (loading || isAuthorizing) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 rounded-full bg-[#C9A227]/15 blur-2xl" />
            <Loader2 className="relative z-10 w-12 h-12 animate-spin text-[#C9A227]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#F5F2E8] mb-2">
              Verifying Access
            </h2>
            <p className="text-[#7D8793] max-w-md">
              Establishing secure diplomatic authentication session...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isFullyAuthorized) {
    return null;
  }

  return <>{children}</>;
}
