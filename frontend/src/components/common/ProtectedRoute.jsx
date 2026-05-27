"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({
  children,
  adminOnly = false,
}) {

  // ======================================
  // AUTH CONTEXT
  // ======================================

  const {
    user,
    loading,
    isAuthenticated,
  } = useAuth();


  // ======================================
  // ROUTER
  // ======================================

  const router = useRouter();


  // ======================================
  // ACCESS CONTROL
  // ======================================

  useEffect(() => {

    // WAIT FOR AUTH TO LOAD
    if (loading) return;

    // USER NOT LOGGED IN
    if (!isAuthenticated) {

      router.push("/login");

      return;
    }

    // ADMIN ONLY CHECK
    if (
      adminOnly &&
      user?.role !== "ADMIN"
    ) {

      router.push("/");

      return;
    }

  }, [
    loading,
    isAuthenticated,
    user,
    adminOnly,
    router,
  ]);


  // ======================================
  // LOADING SCREEN
  // ======================================

  if (loading) {

    return (
      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
      ">

        <div className="
          flex
          flex-col
          items-center
          gap-6
          text-center
        ">

          {/* Spinner */}

          <div className="
            relative
            flex
            items-center
            justify-center
          ">

            <div className="
              absolute
              w-20
              h-20
              rounded-full
              bg-cyan-500/20
              blur-2xl
            " />

            <Loader2 className="
              relative
              z-10
              w-12
              h-12
              animate-spin
              text-cyan-400
            " />

          </div>


          {/* Text */}

          <div>

            <h2 className="
              text-2xl
              font-bold
              text-white
              mb-2
            ">
              Verifying Access
            </h2>

            <p className="
              text-slate-400
              max-w-md
            ">
              Establishing secure diplomatic
              authentication session...
            </p>

          </div>
        </div>
      </div>
    );
  }


  // ======================================
  // BLOCK RENDER
  // ======================================

  if (!isAuthenticated) {
    return null;
  }

  if (
    adminOnly &&
    user?.role !== "ADMIN"
  ) {
    return null;
  }


  // ======================================
  // ALLOW ACCESS
  // ======================================

  return children;
}
