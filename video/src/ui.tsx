import React from "react";
import { AbsoluteFill, Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { T } from "./theme";

export const useSpr = (delay = 0, cfg = { damping: 14, stiffness: 120 }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: cfg });
};
export const Sfx: React.FC<{ name: string; vol?: number }> = ({ name, vol = 1 }) => (
  <Audio src={staticFile(`sfx/${name}.wav`)} volume={vol} />
);
export const Bg: React.FC<{ glow?: string }> = ({ glow = T.accent }) => (
  <AbsoluteFill style={{ background: T.ink }}>
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(242,237,227,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(242,237,227,.035) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
    <div style={{ position: "absolute", left: "50%", top: "45%", width: 1500, height: 1500, transform: "translate(-50%,-50%)", background: `radial-gradient(circle, ${glow}26, transparent 60%)` }} />
  </AbsoluteFill>
);
export const Logo: React.FC<{ size?: number; progress?: number }> = ({ size = 160, progress = 1 }) => {
  const tiles: Array<[number, number, boolean]> = [[13, 13, false], [34, 13, true], [13, 34, false], [34, 34, false]];
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <rect width="64" height="64" rx="14" fill={T.panel} />
      {tiles.map(([x, y, hot], i) => {
        const p = Math.max(0, Math.min(1, progress * 4 - i)); const s = 0.2 + 0.8 * p;
        return <rect key={i} x={x + 8.5 * (1 - s)} y={y + 8.5 * (1 - s)} width={17 * s} height={17 * s} rx={4 * s}
          fill={hot ? T.accent : "none"} stroke={hot ? "none" : T.paper} strokeOpacity={.55} strokeWidth={2.5} opacity={p} />;
      })}
    </svg>
  );
};
export const Word: React.FC<{ children: React.ReactNode; delay?: number; size?: number; color?: string; weight?: number; font?: string; style?: React.CSSProperties }> =
  ({ children, delay = 0, size = 72, color = T.paper, weight = 600, font = T.sans, style }) => {
    const s = useSpr(delay);
    return <div style={{ fontFamily: font, fontSize: size, fontWeight: weight, color, letterSpacing: font === T.mono ? ".12em" : "-.02em", lineHeight: 1.08,
      opacity: s, transform: `translateY(${(1 - s) * 40}px)`, ...style }}>{children}</div>;
  };
export const Shot: React.FC<{ src: string; w: number; rotate?: number; delay?: number; x?: number; y?: number; radius?: number; style?: React.CSSProperties }> =
  ({ src, w, rotate = 0, delay = 0, x = 0, y = 0, radius = 18, style }) => {
    const s = useSpr(delay, { damping: 16, stiffness: 90 });
    return <Img src={staticFile(src)} style={{ position: "absolute", left: x, top: y, width: w, borderRadius: radius, boxShadow: "0 30px 80px rgba(0,0,0,.55)",
      border: "1px solid rgba(242,237,227,.14)", opacity: s, transform: `rotate(${rotate}deg) scale(${0.7 + 0.3 * s})`, ...style }} />;
  };
export const Typewriter: React.FC<{ text: string; start: number; cps?: number; style?: React.CSSProperties; cursor?: boolean }> =
  ({ text, start, cps = 28, style, cursor = true }) => {
    const frame = useCurrentFrame(); const { fps } = useVideoConfig();
    const n = Math.max(0, Math.floor(((frame - start) / fps) * cps)); const done = n >= text.length;
    return <span style={style}>{text.slice(0, n)}{cursor && !done ? <span style={{ opacity: Math.floor(frame / 8) % 2 ? 0 : 1 }}>▍</span> : null}</span>;
  };
export const fadeIO = (frame: number, len: number, edge = 12) =>
  interpolate(frame, [0, edge, len - edge, len], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
