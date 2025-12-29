import { useEffect, useState } from "react";

export default function EntryScreen() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  // Lock scroll while overlay is shown
  useEffect(() => {
    if (shouldRender) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
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
    if (!visible) return;
    setVisible(false);
    setTimeout(() => setShouldRender(false), 650);
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
      <div className="relative px-8 py-10 w-full max-w-xl">
        <div
          className={`relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.55)] transition-all duration-700 ${
            mounted && visible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-[0.98] translate-y-2"
          } ${!visible ? "opacity-0 scale-[0.98] translate-y-2" : ""}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400/8 via-transparent to-cyan-400/10" />
          <div className="relative p-8 flex flex-col gap-4 items-start">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300/80">
              Building and shipping products
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Akrisht Kaul
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              Full stack builder. Musician. Breakdancer. Always making something real.
            </p>

            <div className="pt-2 space-y-2 w-full">
              <button
                onClick={handleClose}
                className="group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all duration-200 hover:-translate-y-0.5"
              >
                <span
                  className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-200"
                  aria-hidden
                />
                Explore my work
                <span className="text-white/80">↗</span>
              </button>
              <button
                onClick={handleClose}
                className="block text-sm text-white/50 hover:text-sky-300 transition-colors"
              >
                Press Enter or Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}