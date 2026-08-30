import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { T } from "./theme";
import { S, Lang } from "./strings";
import { Bg, Logo, Word, Shot, Sfx, Typewriter, fadeIO, useSpr } from "./ui";

const OG = (slug: string) => `og/${slug}.jpg`;
type P = { lang: Lang; portrait: boolean };
const Pad: React.FC<{ children: React.ReactNode; center?: boolean; style?: React.CSSProperties }> = ({ children, center, style }) => (
  <AbsoluteFill style={{ padding: 96, justifyContent: center ? "center" : "flex-start", alignItems: center ? "center" : "flex-start", textAlign: center ? "center" : "left", ...style }}>{children}</AbsoluteFill>
);

// 1 — Logo
export const SceneLogo: React.FC<P> = ({ lang }) => {
  const frame = useCurrentFrame(); const { durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [6, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: fadeIO(frame, durationInFrames) }}>
      <Bg />
      {[8, 16, 24, 32].map((f, i) => <Sequence key={i} from={f} durationInFrames={20}><Sfx name={i === 1 ? "pop-hi" : "pop"} vol={.8} /></Sequence>)}
      <Pad center><Logo size={260} progress={p} /><Word delay={40} size={26} font={T.mono} color={T.accent} weight={500} style={{ marginTop: 40 }}>{S[lang].brand}</Word></Pad>
    </AbsoluteFill>
  );
};

// 2 — Hook
export const SceneHook: React.FC<P> = ({ lang, portrait }) => {
  const frame = useCurrentFrame(); const { durationInFrames } = useVideoConfig(); const s = S[lang];
  const big = portrait ? 78 : 88;
  return (
    <AbsoluteFill style={{ opacity: fadeIO(frame, durationInFrames) }}>
      <Bg glow="#5ef2ff" />
      <Sequence from={0} durationInFrames={30}><Sfx name="whoosh" vol={.6} /></Sequence>
      <Sequence from={88} durationInFrames={30}><Sfx name="tick" vol={.9} /></Sequence>
      <Pad center>
        <Word size={40} color={T.dim} weight={400}>{s.hook1}</Word>
        <Word delay={12} size={big} color={T.cyan} weight={700} style={{ marginTop: 18 }}>{s.hook2}</Word>
        <Word delay={24} size={40} color={T.dim} weight={400} style={{ marginTop: 18 }}>{s.hook3}</Word>
        <Word delay={86} size={big} weight={700} style={{ marginTop: 90 }}>{s.hook4}</Word>
      </Pad>
    </AbsoluteFill>
  );
};

// 3 — Counter + montaj
const MONTAGE = ["01-editorial-minimalizm","11-bauhaus","09-neo-brutalizm","15-glassmorphism","14-retro-terminal","13-y2k-saykodelik","24-vaporwave-synthwave","26-cini-geometrik-motif","46-macos-masaustu","52-medya-akis-spotify","57-neo-fintech-mobil","60-ticaret-terminali","74-futuristik-hud","78-cyberpunk","79-pixel-art","83-graffiti","84-aurora","30-maksimalizm","07-karanlik-saas","68-klimt-altin"];
export const SceneCounter: React.FC<P> = ({ lang, portrait }) => {
  const frame = useCurrentFrame(); const { durationInFrames, width, height } = useVideoConfig(); const s = S[lang];
  const n = Math.round(interpolate(frame, [10, 130], [0, 85], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (t) => 1 - Math.pow(1 - t, 3) }));
  const per = 8; const idx = Math.min(MONTAGE.length - 1, Math.floor(frame / per));
  const w = portrait ? 620 : 760;
  return (
    <AbsoluteFill style={{ opacity: fadeIO(frame, durationInFrames) }}>
      <Bg />
      {MONTAGE.map((_, i) => i * per < 160 ? <Sequence key={i} from={i * per} durationInFrames={10}><Sfx name="tick" vol={.35} /></Sequence> : null)}
      <Sequence from={0} durationInFrames={60}><Sfx name="rise" vol={.5} /></Sequence>
      <Sequence from={132} durationInFrames={30}><Sfx name="ding" vol={.7} /></Sequence>
      {MONTAGE.slice(Math.max(0, idx - 3), idx + 1).map((slug, j, arr) => {
        const k = arr.length - 1 - j; // 0 = en üstteki
        return <Img key={slug} src={staticFile(OG(slug))} style={{ position: "absolute", width: w, left: width / 2 - w / 2 + (k % 2 ? 1 : -1) * k * 26, top: (portrait ? height * 0.40 : height * 0.36) - k * 22,
          borderRadius: 16, boxShadow: "0 30px 70px rgba(0,0,0,.6)", transform: `rotate(${(k % 2 ? 1 : -1) * k * 3}deg) scale(${1 - k * .05})`, opacity: 1 - k * .22, border: "1px solid rgba(242,237,227,.14)" }} />;
      })}
      <Pad style={{ alignItems: "center", paddingTop: portrait ? 200 : 60 }}>
        <div style={{ fontFamily: T.sans, fontSize: portrait ? 300 : 240, fontWeight: 700, color: T.paper, letterSpacing: "-.05em", lineHeight: .9, textShadow: "0 20px 60px rgba(0,0,0,.6)" }}>{n}</div>
        <Word delay={0} size={44} color={T.accent} font={T.mono} weight={500} style={{ marginTop: 10 }}>{s.counterLabel}</Word>
        <Word delay={130} size={30} color={T.dim} weight={400} style={{ marginTop: 22, maxWidth: 800, textAlign: "center" }}>{s.counterSub}</Word>
      </Pad>
    </AbsoluteFill>
  );
};

// 4 — Stilin anatomisi
const PROMPT = "Design a Hokusai ukiyo-e surf-report app. Paper background (#f2e8d5), flat Prussian-blue wave (#1b4470) with foam claws, red hanko seal, 2px ink outlines, no gradients…";
export const SceneAnatomy: React.FC<P> = ({ lang, portrait }) => {
  const frame = useCurrentFrame(); const { durationInFrames, width } = useVideoConfig(); const s = S[lang];
  const w = portrait ? 880 : 900;
  const items = [s.a1, s.a2, s.a3];
  return (
    <AbsoluteFill style={{ opacity: fadeIO(frame, durationInFrames) }}>
      <Bg glow="#1b4470" />
      <Sequence from={4} durationInFrames={30}><Sfx name="whoosh" vol={.5} /></Sequence>
      {[40, 58, 76].map((f, i) => <Sequence key={i} from={f} durationInFrames={20}><Sfx name="pop" vol={.6} /></Sequence>)}
      {Array.from({ length: 24 }, (_, i) => <Sequence key={"k" + i} from={70 + i * 4} durationInFrames={6}><Sfx name={i % 2 ? "key" : "key2"} vol={.25} /></Sequence>)}
      <Pad style={{ paddingTop: 110 }}>
        <Word size={portrait ? 54 : 60} weight={700}>{s.anatomyTitle}</Word>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 30 }}>
          {items.map((t, i) => <Word key={i} delay={40 + i * 18} size={29} color={i === 1 ? T.accent : T.paper} font={T.mono} weight={500}>{`0${i + 1}  ${t}`}</Word>)}
        </div>
      </Pad>
      <Shot src={OG("67-hokusai-dalga")} w={w} x={width / 2 - w / 2} y={portrait ? 560 : 420} delay={8} />
      <div style={{ position: "absolute", left: width / 2 - w / 2, top: (portrait ? 560 : 420) + w * 0.525 + 30, width: w, background: "rgba(28,25,20,.96)", border: `1px solid ${T.accent}66`, borderRadius: 14, padding: "22px 26px",
        fontFamily: T.mono, fontSize: 24, lineHeight: 1.55, color: T.paper, opacity: useSpr(60) }}>
        <div style={{ fontSize: 15, letterSpacing: ".16em", color: T.accent, marginBottom: 10 }}>PROMPT_EN · 67 HOKUSAI</div>
        <Typewriter text={PROMPT} start={70} cps={34} />
      </div>
    </AbsoluteFill>
  );
};

// 5 — Ressamlar
const PAINTERS = ["62-da-vinci-kodeks","63-monet-isik","64-van-gogh-yildizli","66-dali-eriyen-saat","67-hokusai-dalga","72-osman-hamdi-sabir"];
export const ScenePainters: React.FC<P> = ({ lang, portrait }) => {
  const frame = useCurrentFrame(); const { durationInFrames, width } = useVideoConfig(); const s = S[lang];
  const w = portrait ? 700 : 620;
  return (
    <AbsoluteFill style={{ opacity: fadeIO(frame, durationInFrames) }}>
      <Bg glow="#c96f2e" />
      {PAINTERS.map((_, i) => <Sequence key={i} from={10 + i * 18} durationInFrames={20}><Sfx name="whoosh" vol={.35} /></Sequence>)}
      <Pad style={{ paddingTop: 100 }}>
        <Word size={portrait ? 60 : 64} weight={700}>{s.paintersTitle}</Word>
        <Word delay={10} size={26} color={T.dim} font={T.mono} weight={400} style={{ marginTop: 16 }}>{s.paintersSub}</Word>
      </Pad>
      {PAINTERS.map((slug, i) => {
        const col = portrait ? i % 2 : i % 3, row = portrait ? Math.floor(i / 2) : Math.floor(i / 3);
        const gap = 30; const cw = portrait ? (width - 96 * 2 - gap) / 2 : (width - 96 * 2 - gap * 2) / 3;
        return <Shot key={slug} src={OG(slug)} w={cw} x={96 + col * (cw + gap)} y={(portrait ? 420 : 330) + row * (cw * 0.525 + gap)} delay={10 + i * 18} rotate={(i % 2 ? 1 : -1) * 1.5} radius={14} />;
      })}
    </AbsoluteFill>
  );
};

// 6 — Galeri
export const SceneGallery: React.FC<P> = ({ lang, portrait }) => {
  const frame = useCurrentFrame(); const { durationInFrames, width, height } = useVideoConfig(); const s = S[lang];
  const zoom = interpolate(frame, [0, durationInFrames], [1.0, 1.18]);
  const y = interpolate(frame, [0, durationInFrames], [0, portrait ? -260 : -180]);
  return (
    <AbsoluteFill style={{ opacity: fadeIO(frame, durationInFrames), background: T.ink }}>
      <Sequence from={0} durationInFrames={40}><Sfx name="rise" vol={.4} /></Sequence>
      <Img src={staticFile(portrait ? "galeri-9x16.jpg" : "galeri-16x9.jpg")} style={{ position: "absolute", width, height, objectFit: "cover", transform: `scale(${zoom}) translateY(${y}px)`, transformOrigin: "50% 30%" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,18,14,.15), rgba(20,18,14,.92) 75%)" }} />
      <Pad style={{ justifyContent: "flex-end", paddingBottom: 140 }}>
        <Word size={portrait ? 76 : 84} weight={700}>{s.galleryTitle}</Word>
        <Word delay={14} size={portrait ? 76 : 84} weight={700} color={T.accent}>{s.galleryTitle2}</Word>
      </Pad>
    </AbsoluteFill>
  );
};

// 7 — MCP terminali
export const SceneMcp: React.FC<P> = ({ lang, portrait }) => {
  const frame = useCurrentFrame(); const { durationInFrames, width } = useVideoConfig(); const s = S[lang];
  const cmd = "claude mcp add tasarim-katalogu -- npx -y tasarim-katalogu-mcp";
  const call = lang === "tr" ? 'stil_ara("kaplumbağa")' : 'stil_ara("tortoise")';
  const lines = [
    { t: "→ 1 sonuç · 72 — Osman Hamdi · Sabır", at: 116, c: T.green },
    { t: "stil_getir(72)", at: 132, c: T.paper, prompt: true },
    { t: "→ prompt_en, palette [#3b2415 #c96f2e #1f6f5c …], avoid[…]", at: 150, c: T.green },
    { t: lang === "tr" ? "✓ Arayüz üretiliyor: kemer, kaplumbağa halkası, İznik kabuk…" : "✓ Generating UI: arch, tortoise ring, Iznik shell…", at: 168, c: T.accent },
  ];
  const w = width - 96 * 2;
  return (
    <AbsoluteFill style={{ opacity: fadeIO(frame, durationInFrames) }}>
      <Bg glow="#7fbf8e" />
      {Array.from({ length: 40 }, (_, i) => <Sequence key={i} from={14 + i * 2} durationInFrames={4}><Sfx name={i % 2 ? "key" : "key2"} vol={.3} /></Sequence>)}
      {[116, 150].map((f) => <Sequence key={f} from={f} durationInFrames={16}><Sfx name="pop-hi" vol={.6} /></Sequence>)}
      <Sequence from={168} durationInFrames={30}><Sfx name="ding" vol={.7} /></Sequence>
      <Pad style={{ paddingTop: 110 }}>
        <Word size={portrait ? 56 : 60} weight={700}>{s.mcpTitle}</Word>
        <Word delay={8} size={26} color={T.green} font={T.mono} weight={500} style={{ marginTop: 14 }}>{s.mcpSub}</Word>
      </Pad>
      <div style={{ position: "absolute", left: 96, top: portrait ? 420 : 330, width: w, background: "#0d0c0a", border: "1px solid rgba(242,237,227,.16)", borderRadius: 16, padding: "26px 30px", fontFamily: T.mono, fontSize: portrait ? 27 : 26, lineHeight: 1.7, color: T.paper, boxShadow: "0 30px 80px rgba(0,0,0,.55)", opacity: useSpr(6) }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>{["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} style={{ width: 14, height: 14, borderRadius: 7, background: c }} />)}</div>
        <div><span style={{ color: T.dim }}>$ </span><Typewriter text={cmd} start={14} cps={40} /></div>
        <div style={{ color: T.green, opacity: frame > 72 ? 1 : 0 }}>✓ MCP server added</div>
        <div style={{ marginTop: 18, opacity: frame > 84 ? 1 : 0 }}><span style={{ color: T.accent }}>tool </span><Typewriter text={call} start={86} cps={30} /></div>
        {lines.map((l, i) => <div key={i} style={{ color: l.c, opacity: frame > l.at ? 1 : 0, paddingLeft: l.prompt ? 0 : 0 }}>{l.prompt ? <><span style={{ color: T.accent }}>tool </span>{l.t}</> : l.t}</div>)}
      </div>
      <Shot src={OG("72-osman-hamdi-sabir")} w={portrait ? 520 : 480} x={portrait ? width - 96 - 520 : width - 96 - 480} y={portrait ? 1250 : 700} delay={170} rotate={-3} radius={14} />
    </AbsoluteFill>
  );
};

// 8 — Outro
export const SceneOutro: React.FC<P> = ({ lang, portrait }) => {
  const frame = useCurrentFrame(); const { durationInFrames } = useVideoConfig(); const s = S[lang];
  const badges = [s.outro1, s.outro2, "85 " + S[lang].counterLabel, "MCP"];
  return (
    <AbsoluteFill style={{ opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" }) }}>
      <Bg />
      {badges.map((_, i) => <Sequence key={i} from={30 + i * 10} durationInFrames={16}><Sfx name="pop" vol={.6} /></Sequence>)}
      <Sequence from={80} durationInFrames={40}><Sfx name="ding" vol={.8} /></Sequence>
      <Pad center>
        <Logo size={200} />
        <Word delay={8} size={24} font={T.mono} color={T.accent} weight={500} style={{ marginTop: 30 }}>{s.brand}</Word>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginTop: 60, maxWidth: 900 }}>
          {badges.map((b, i) => { const sp = useSpr(30 + i * 10); return <div key={i} style={{ fontFamily: T.mono, fontSize: 24, letterSpacing: ".1em", textTransform: "uppercase", color: T.paper, border: "1px solid rgba(242,237,227,.3)", borderRadius: 999, padding: "16px 28px", opacity: sp, transform: `scale(${.6 + .4 * sp})` }}>{b}</div>; })}
        </div>
        <Word delay={80} size={portrait ? 70 : 84} weight={700} color={T.accent} style={{ marginTop: 90 }}>{s.cta}</Word>
        <Word delay={92} size={portrait ? 22 : 26} font={T.mono} color={T.dim} weight={400} style={{ marginTop: 22, letterSpacing: ".04em" }}>{s.github}</Word>
      </Pad>
    </AbsoluteFill>
  );
};
