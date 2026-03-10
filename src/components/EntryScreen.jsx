import { useEffect, useState } from "react";

export default function EntryScreen() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  // Lock scroll while overlay is shown
  useEffect(() => {
    // lock only while entry screen is rendered
    if (!shouldRender) {
      document.body.style.overflow = "auto";
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous || "auto";
    };
  }, [shouldRender]);

  // Mount animation
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Key handlers (Enter + Escape)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Enter") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const handleClose = () => {
    setVisible(false);
    // wait for fade-out animation, then unmount overlay and restore scroll
    window.setTimeout(() => {
      setShouldRender(false);
      document.body.style.overflow = "auto";
    }, 350);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />

      {/* Noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Card */}
      <div className="absolute inset-0 bg-[#F8FAFC]" />
      <div className="relative px-8 py-10 w-full max-w-xl">
        <div
          className={`relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-700 ${
            mounted && visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.98] translate-y-2"
          } ${!visible ? "opacity-0 scale-[0.98] translate-y-2" : ""}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF] via-transparent to-transparent" />
          <div className="relative p-8 flex flex-col gap-4 items-start">
            <p className="text-xs uppercase tracking-[0.3em] text-[#2563EB]">
              Building and shipping products
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] leading-tight">
              Akrisht Kaul
            </h1>
            <p className="text-[#475569] text-base md:text-lg leading-relaxed">
              Full stack builder. Musician. Breakdancer. Always making something real.
            </p>

            <div className="pt-2 space-y-2 w-full">
              <button
                onClick={handleClose}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all duration-200"
              >
                Explore my work <span className="text-white/90">↗</span>
              </button>
              <button onClick={handleClose} className="block text-sm text-[#64748B] hover:text-[#2563EB] transition-colors">
                Press Enter or Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}