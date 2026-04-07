"use client";

import { useState, useEffect, useCallback } from "react";

// 1 GiB = 1.073741824 GB
const GIB_TO_GB = 1.073741824;


const QUICK_PICKS = [
  { label: "5 MB",   gb: 0.005 },
  { label: "500 MB", gb: 0.5 },
  { label: "1 GB",   gb: 1 },
  { label: "10 GB",  gb: 10 },
  { label: "100 GB", gb: 100 },
  { label: "1 TB",   gb: 1000 },
];

const FILE_TYPES = [
  { label: "photos", emoji: "📷", mbEach: 3.5 },
  { label: "songs", emoji: "🎵", mbEach: 5 },
  { label: "HD videos", emoji: "🎬", mbEach: 1500 },
  { label: "documents", emoji: "📄", mbEach: 0.1 },
];

function formatUSD(n: number): string {
  if (n < 0.01) return "< $0.01";
  if (n < 1) return `$${n.toFixed(3)}`;
  if (n < 10) return `$${n.toFixed(2)}`;
  return `$${n.toFixed(2)}`;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(Math.round(n));
}

export function PricingCalculator() {
  const [usdPerGib, setUsdPerGib] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [gb, setGb] = useState(10);
  const [inputVal, setInputVal] = useState("10");

  useEffect(() => {
    fetch("https://turbo.ardrive.io/v1/rates/")
      .then((r) => r.json())
      .then((data) => {
        setUsdPerGib(Number(data.fiat.usd));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const priceUsd = usdPerGib !== null ? (gb / GIB_TO_GB) * usdPerGib : null;

  const handleInput = useCallback((raw: string) => {
    setInputVal(raw);
    const parsed = parseFloat(raw);
    if (!isNaN(parsed) && parsed > 0) {
      setGb(Math.min(parsed, 100_000));
    }
  }, []);

  const handleQuickPick = useCallback((val: number) => {
    setGb(val);
    setInputVal(String(val));
  }, []);

  // Slider: log scale 0.1 GB → 10,000 GB
  const logMin = Math.log10(0.1);
  const logMax = Math.log10(10_000);
  const sliderToGb = (v: number) => Math.pow(10, logMin + (v / 1000) * (logMax - logMin));
  const gbToSlider = (g: number) =>
    Math.round(((Math.log10(Math.max(g, 0.1)) - logMin) / (logMax - logMin)) * 1000);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#0d0d0d" }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div>
          <h3 className="font-bold text-sm" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
            ArDrive Price Calculator
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "rgba(250,250,250,0.35)" }}>
            Live rates from Turbo
          </p>
        </div>
        {/* Live rate pill */}
        {usdPerGib !== null && (
          <div
            className="rounded-full px-3 py-1 text-xs font-mono"
            style={{ background: "rgba(254,2,48,0.1)", border: "1px solid rgba(254,2,48,0.2)", color: "rgba(254,2,48,0.8)" }}
          >
            ${usdPerGib.toFixed(2)}/GiB
          </div>
        )}
        {loading && (
          <div className="size-4 rounded-full border-2 border-fd-primary border-t-transparent animate-spin" />
        )}
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Quick picks */}
        <div className="flex flex-wrap gap-2">
          {QUICK_PICKS.map((q) => (
            <button
              key={q.gb}
              onClick={() => handleQuickPick(q.gb)}
              className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all"
              style={{
                background: gb === q.gb ? "rgb(254,2,48)" : "rgba(255,255,255,0.06)",
                color: gb === q.gb ? "white" : "rgba(250,250,250,0.6)",
                border: `1px solid ${gb === q.gb ? "rgb(254,2,48)" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Slider + input row */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={1000}
              value={gbToSlider(gb)}
              onChange={(e) => {
                const v = sliderToGb(Number(e.target.value));
                const rounded = v >= 100 ? Math.round(v) : v >= 10 ? Math.round(v * 10) / 10 : Math.round(v * 100) / 100;
                setGb(rounded);
                setInputVal(String(rounded));
              }}
              className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgb(254,2,48) ${(gbToSlider(gb) / 1000) * 100}%, rgba(255,255,255,0.12) ${(gbToSlider(gb) / 1000) * 100}%)`,
                accentColor: "rgb(254,2,48)",
              }}
            />
            <div className="flex items-center gap-1.5 shrink-0">
              <input
                type="number"
                value={inputVal}
                min={0.1}
                step={1}
                onChange={(e) => handleInput(e.target.value)}
                className="w-20 rounded-lg px-2 py-1.5 text-sm text-center font-mono bg-transparent outline-none"
                style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#FAFAFA" }}
              />
              <span className="text-sm font-semibold" style={{ color: "rgba(250,250,250,0.5)" }}>GB</span>
            </div>
          </div>
        </div>

        {/* Price display */}
        <div
          className="rounded-xl p-5 text-center"
          style={{ background: "rgba(254,2,48,0.06)", border: "1px solid rgba(254,2,48,0.12)" }}
        >
          {loading && (
            <p className="text-sm" style={{ color: "rgba(250,250,250,0.4)" }}>Fetching live rate…</p>
          )}
          {error && (
            <p className="text-sm" style={{ color: "rgba(250,250,250,0.4)" }}>Could not load rates. Try refreshing.</p>
          )}
          {priceUsd !== null && (
            <>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "rgba(254,2,48,0.6)" }}>
                One-time cost
              </p>
              <p
                className="text-5xl font-extrabold text-fd-primary leading-none"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
              >
                {formatUSD(priceUsd)}
              </p>
              <p className="mt-1 text-xs" style={{ color: "rgba(250,250,250,0.35)" }}>
                for {gb >= 1000 ? `${gb / 1000} TB` : gb >= 1 ? `${gb} GB` : `${Math.round(gb * 1024)} MB`} stored permanently
              </p>
            </>
          )}
        </div>

        {/* File type equivalents */}
        {priceUsd !== null && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {FILE_TYPES.map((f) => {
              const count = Math.floor((gb * 1024) / f.mbEach);
              return (
                <div
                  key={f.label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="text-xl mb-1">{f.emoji}</div>
                  <div className="text-sm font-bold" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                    {formatCount(count)}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(250,250,250,0.4)" }}>{f.label}</div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
