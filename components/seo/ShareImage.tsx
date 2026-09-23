/* eslint-disable @next/next/no-img-element -- Satori (next/og) renders plain <img> elements. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * The branded 1200×630 social card shared by `app/opengraph-image.tsx` and
 * `app/twitter-image.tsx`. Rendered with Satori, so every element with more
 * than one child needs `display: flex`, and only inline styles are allowed.
 */

export const shareImageSize = { width: 1200, height: 630 };

const W = shareImageSize.width;
const H = shareImageSize.height;

const color = {
  cream: "#f8f5ef",
  brand100: "#d6ede8",
  brand200: "#aedbd3",
  brand400: "#63aea7",
  brand800: "#234c4a",
  brand900: "#1b3a39",
  brand950: "#0f2524",
  gold200: "#ecd6a4",
  gold300: "#e0bd74",
  gold400: "#d2a554",
};

/* ------------------------------------------------------------------ */
/* Assets — fonts and images are read from disk once per server process */
/* ------------------------------------------------------------------ */

type Font = {
  name: string;
  data: Buffer;
  weight: 400 | 500 | 700;
  style: "normal" | "italic";
};

type Assets = { fonts: Font[]; emblem?: string; skyline?: string };

const root = process.cwd();

async function tryRead(path: string) {
  try {
    return await readFile(join(root, path));
  } catch {
    return undefined;
  }
}

async function loadAssets(): Promise<Assets> {
  const [serif, serifItalic, sans500, sans700, emblem, skyline] = await Promise.all([
    tryRead("assets/fonts/InstrumentSerif-Regular.ttf"),
    tryRead("assets/fonts/InstrumentSerif-Italic.ttf"),
    tryRead("assets/fonts/Manrope-500.ttf"),
    tryRead("assets/fonts/Manrope-700.ttf"),
    tryRead("public/brand/emblem-light.svg"),
    tryRead("assets/og/skyline.png"),
  ]);

  const fonts: Font[] = [];
  if (serif) fonts.push({ name: "Instrument Serif", data: serif, weight: 400, style: "normal" });
  if (serifItalic) fonts.push({ name: "Instrument Serif", data: serifItalic, weight: 400, style: "italic" });
  if (sans500) fonts.push({ name: "Manrope", data: sans500, weight: 500, style: "normal" });
  if (sans700) fonts.push({ name: "Manrope", data: sans700, weight: 700, style: "normal" });

  return {
    fonts,
    emblem: emblem && `data:image/svg+xml;base64,${emblem.toString("base64")}`,
    skyline: skyline && `data:image/png;base64,${skyline.toString("base64")}`,
  };
}

let assetsPromise: Promise<Assets> | undefined;
function getAssets() {
  assetsPromise ??= loadAssets();
  return assetsPromise;
}

/* ------------------------------------------------------------------ */
/* Decorative SVGs, drawn as data URIs so resvg renders them natively   */
/* ------------------------------------------------------------------ */

function svgUri(svg: string) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/** The site's connected eight-point-star lattice (same geometry as <GeometricPattern>). */
function latticeSvg() {
  const s = 72;
  const c = s / 2;
  const R = 17;
  const r = R / Math.SQRT2;
  const tile = 88;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="p" width="${tile}" height="${tile}" patternUnits="userSpaceOnUse" viewBox="0 0 ${s} ${s}">
      <g fill="none" stroke="${color.gold300}" stroke-width="0.8">
        <path d="M${c} ${c - R}L${c + R} ${c}L${c} ${c + R}L${c - R} ${c}Z"/>
        <rect x="${c - r}" y="${c - r}" width="${r * 2}" height="${r * 2}"/>
        <path d="M${c} 0V${c - R}M${c} ${c + R}V${s}M0 ${c}H${c - R}M${c + R} ${c}H${s}"/>
        <path d="M0 0L${c - r} ${c - r}M${s} 0L${c + r} ${c - r}M0 ${s}L${c - r} ${c + r}M${s} ${s}L${c + r} ${c + r}"/>
        <circle cx="${c}" cy="${c}" r="4"/>
      </g>
    </pattern>
    <radialGradient id="fade" cx="${(W * 0.76) / W}" cy="0.42" r="0.62">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/>
      <stop offset="0.55" stop-color="#fff" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="m"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#p)" mask="url(#m)"/>
</svg>`;
}

/** Eight-pointed star outline (the Star8Outline ornament). */
function starOutlineSvg(size: number, stroke: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" stroke="${stroke}" stroke-width="0.35">
  <rect x="20" y="20" width="60" height="60"/>
  <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)"/>
  <circle cx="50" cy="50" r="22"/>
  <circle cx="50" cy="50" r="46" stroke-dasharray="0.6 2.2"/>
  <circle cx="50" cy="50" r="49.5" stroke-width="0.2"/>
</svg>`;
}

/** Solid eight-pointed star (the Star8 bullet). */
function starSvg(size: number, fill: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}">
  <path d="M12 0l3.5 3.5H20.5V8.5L24 12l-3.5 3.5v5h-5L12 24l-3.5-3.5h-5v-5L0 12l3.5-3.5v-5h5z"/>
</svg>`;
}

/** Pointed mihrab arch: a glassy filled arch plus an offset gold outline. */
function archSvg(w: number, h: number, offset: number) {
  const aw = w - offset;
  const ah = h - offset;
  const arch = (x: number, y: number) =>
    `M${x},${y + ah} V${y + ah * 0.36} C${x},${y + ah * 0.17} ${x + aw * 0.2},${y + ah * 0.07} ${x + aw * 0.5},${y} C${x + aw * 0.8},${y + ah * 0.07} ${x + aw},${y + ah * 0.17} ${x + aw},${y + ah * 0.36} V${y + ah} Z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${color.brand400}" stop-opacity="0.30"/>
      <stop offset="0.6" stop-color="${color.brand800}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${color.brand950}" stop-opacity="0.55"/>
    </linearGradient>
    <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0.04"/>
    </linearGradient>
  </defs>
  <path d="${arch(offset - 0.5, offset - 0.5)}" fill="none" stroke="${color.gold300}" stroke-opacity="0.75" stroke-width="1.5"/>
  <path d="${arch(0.75, 0.75)}" fill="url(#glass)" stroke="url(#rim)" stroke-width="1.5"/>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Image                                                               */
/* ------------------------------------------------------------------ */

const serif = "Instrument Serif";
const sans = "Manrope";

const chips = ["Tajweed", "Recitation", "Memorization"];

export async function renderShareImage() {
  const { fonts, emblem, skyline } = await getAssets();

  const archW = 330;
  const archH = 430;
  const archOffset = 16;
  const emblemH = 252;
  const emblemW = Math.round((emblemH * 2215) / 2410);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: color.brand950,
          backgroundImage: `linear-gradient(135deg, ${color.brand950} 0%, ${color.brand900} 48%, ${color.brand800} 100%)`,
          fontFamily: sans,
          color: color.cream,
        }}
      >
        {/* Soft glows */}
        <div
          style={{
            position: "absolute",
            left: 640,
            top: -260,
            width: 760,
            height: 760,
            display: "flex",
            backgroundImage: "radial-gradient(circle at center, rgba(99,174,167,0.34) 0%, rgba(99,174,167,0) 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -260,
            top: 300,
            width: 720,
            height: 720,
            display: "flex",
            backgroundImage: "radial-gradient(circle at center, rgba(210,165,84,0.20) 0%, rgba(210,165,84,0) 66%)",
          }}
        />

        {/* Geometric lattice */}
        <img src={svgUri(latticeSvg())} width={W} height={H} alt="" style={{ position: "absolute", left: 0, top: 0, opacity: 0.11 }} />

        {/* Mosque skyline */}
        {skyline && (
          <img
            src={skyline}
            width={W}
            height={263}
            alt=""
            style={{ position: "absolute", left: 0, bottom: -24, opacity: 0.5 }}
          />
        )}

        {/* Thin manuscript frame */}
        <div
          style={{
            position: "absolute",
            left: 24,
            top: 24,
            right: 24,
            bottom: 24,
            display: "flex",
            borderRadius: 30,
            border: "1px solid rgba(224,189,116,0.26)",
          }}
        />

        {/* Right: star ornament, mihrab arch and emblem */}
        <img
          src={svgUri(starOutlineSvg(600, color.gold300))}
          width={600}
          height={600}
          alt=""
          style={{ position: "absolute", left: 648, top: 22, opacity: 0.16 }}
        />
        <div
          style={{
            position: "absolute",
            left: 783,
            top: 104,
            width: archW,
            height: archH,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <img src={svgUri(archSvg(archW, archH, archOffset))} width={archW} height={archH} alt="" style={{ position: "absolute", left: 0, top: 0 }} />
          {emblem && (
            <img
              src={emblem}
              width={emblemW}
              height={emblemH}
              alt=""
              style={{ position: "relative", marginBottom: 70, marginRight: archOffset }}
            />
          )}
        </div>
        <img src={svgUri(starSvg(22, color.gold300))} width={22} height={22} alt="" style={{ position: "absolute", left: 760, top: 118 }} />
        <img src={svgUri(starSvg(14, color.brand400))} width={14} height={14} alt="" style={{ position: "absolute", left: 1112, top: 380 }} />

        {/* Left: copy */}
        <div
          style={{
            position: "absolute",
            left: 88,
            top: 86,
            width: 660,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src={svgUri(starSvg(16, color.gold400))} width={16} height={16} alt="" />
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: 5, color: color.brand200 }}>
              ONLINE QURAN ACADEMY
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 26,
              fontFamily: serif,
              fontSize: 112,
              lineHeight: 0.96,
              letterSpacing: -2.5,
              color: color.cream,
            }}
          >
            <span>Online Taleem</span>
            <span style={{ display: "flex" }}>
              <span>ul&nbsp;</span>
              <span
                style={{
                  fontStyle: "italic",
                  backgroundImage: `linear-gradient(100deg, ${color.gold200} 0%, ${color.gold400} 55%, ${color.gold200} 100%)`,
                  backgroundClip: "text",
                  color: "transparent",
                  // Keep the italic Q's tail inside the clipped background.
                  padding: "0 10px 22px 0",
                  marginBottom: -22,
                }}
              >
                Quran
              </span>
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 30 }}>
            <div style={{ display: "flex", width: 64, height: 1, backgroundColor: "rgba(224,189,116,0.6)" }} />
            <img src={svgUri(starSvg(14, color.gold300))} width={14} height={14} alt="" />
            <div style={{ display: "flex", width: 64, height: 1, backgroundColor: "rgba(224,189,116,0.6)" }} />
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 33,
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: -0.4,
              color: "rgba(214,237,232,0.88)",
            }}
          >
            Learn the Quran online with expert tutors
          </div>
        </div>

        {/* Course chips */}
        <div style={{ position: "absolute", left: 88, bottom: 76, display: "flex", gap: 12 }}>
          {chips.map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 20px 11px 16px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.16)",
                backgroundColor: "rgba(255,255,255,0.07)",
                fontSize: 19,
                fontWeight: 700,
                color: color.cream,
              }}
            >
              <img src={svgUri(starSvg(12, color.gold300))} width={12} height={12} alt="" />
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...shareImageSize,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}
