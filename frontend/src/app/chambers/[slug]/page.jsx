"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Landmark, FileText, Loader2 } from "lucide-react";
import chambersService from "@/services/chambersService";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export default function ChamberDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const [chamber, setChamber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChamber = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await chambersService.getChamberById(slug);
        setChamber(response?.data || null);
      } catch (err) {
        console.error("Fetch Chamber Error:", err);
        setError(err.message || "Failed to load this committee.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchChamber();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
          <p className="text-[#E5E7EB]">Loading committee...</p>
        </div>
      </main>
    );
  }

  if (error || !chamber) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          <h1 className="text-3xl font-bold text-[#D97B7B] mb-4">Committee Not Found</h1>
          <p className="text-[#E5E7EB] mb-8">{error || "The requested committee does not exist."}</p>
          <button onClick={() => router.push("/chambers")} className="px-6 py-3 rounded-xl btn-gradient font-semibold">
            Back to Committees
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen pt-28 pb-24 px-6 overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-4xl mx-auto">
        <button
          onClick={() => router.push("/chambers")}
          className="flex items-center gap-2 text-[#E5E7EB] hover:text-[#E6C77A] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Committees
        </button>

        <div className="glass rounded-[32px] p-8 md:p-12 mb-8">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#0A192F] border border-[#D4AF37]/[0.15] flex items-center justify-center shrink-0 overflow-hidden">
              {chamber.iconUrl ? (
                <img src={chamber.iconUrl} alt={chamber.name} className="w-9 h-9 object-contain" />
              ) : (
                <Landmark className="w-8 h-8 text-[#D4AF37]" />
              )}
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-black leading-tight mb-2 text-[#F8F6F0]">{chamber.name}</h1>
              <p className="text-[#D4AF37] text-sm uppercase tracking-[0.15em]">/{chamber.slug}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#F8F6F0] mb-3">Agenda</h2>
            <p className="text-[#E5E7EB] leading-relaxed">{chamber.agenda}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#F8F6F0] mb-3">About This Committee</h2>
            <p className="text-[#E5E7EB] leading-relaxed whitespace-pre-wrap">{chamber.description}</p>
          </div>
        </div>

        {chamber.backgroundGuideUrl && (
          <a
            href={chamber.backgroundGuideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl btn-gradient font-semibold shadow-xl"
          >
            <FileText className="w-5 h-5" />
            Download Background Guide
          </a>
        )}
      </div>
    </main>
  );
}
