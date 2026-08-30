#!/usr/bin/env python3
"""Basit sentez ses efektleri (WAV, 44.1kHz mono) — harici kaynak yok."""
import math, random, struct, wave
from pathlib import Path
SR = 44100
OUT = Path(__file__).resolve().parent.parent / "public" / "sfx"

def write(name, samples):
    OUT.mkdir(parents=True, exist_ok=True)
    with wave.open(str(OUT / name), "w") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(b"".join(struct.pack("<h", int(max(-1, min(1, s)) * 32000)) for s in samples))

def env(i, n, a=0.005, r=0.3):
    t = i / SR; d = n / SR
    att = min(1, t / a) if a else 1
    rel = math.exp(-t / (d * r)) if r else 1
    return att * rel

def pop(f=520, ms=140, vol=.7):
    n = int(SR * ms / 1000)
    return [vol * env(i, n, .002, .22) * math.sin(2 * math.pi * (f * (1 + .8 * math.exp(-i / (SR * .01)))) * i / SR) for i in range(n)]

def tick(ms=40, vol=.45):
    n = int(SR * ms / 1000); random.seed(7)
    return [vol * env(i, n, .001, .18) * (random.uniform(-1, 1) * .5 + .5 * math.sin(2 * math.pi * 1800 * i / SR)) for i in range(n)]

def key(ms=55, vol=.5, seed=1):
    n = int(SR * ms / 1000); random.seed(seed)
    return [vol * env(i, n, .001, .15) * (random.uniform(-1, 1) * .7 + .3 * math.sin(2 * math.pi * 2400 * i / SR)) for i in range(n)]

def whoosh(ms=520, vol=.5):
    n = int(SR * ms / 1000); random.seed(3); out = []; lp = 0.0
    for i in range(n):
        x = random.uniform(-1, 1)
        cut = .02 + .5 * math.sin(math.pi * i / n)  # açılıp kapanan filtre
        lp += cut * (x - lp)
        out.append(vol * math.sin(math.pi * i / n) * lp * 3)
    return out

def ding(vol=.55):
    n = int(SR * .9)
    return [vol * env(i, n, .003, .35) * (math.sin(2 * math.pi * 880 * i / SR) * .6 + math.sin(2 * math.pi * 1320 * i / SR) * .4) for i in range(n)]

def rise(ms=1600, vol=.4):
    n = int(SR * ms / 1000)
    return [vol * math.sin(math.pi * i / n) ** 2 * math.sin(2 * math.pi * (220 + 660 * (i / n) ** 2) * i / SR) * .5 for i in range(n)]

write("pop.wav", pop()); write("pop-hi.wav", pop(760, 120, .6)); write("tick.wav", tick())
write("key.wav", key()); write("key2.wav", key(50, .45, 5)); write("whoosh.wav", whoosh())
write("ding.wav", ding()); write("rise.wav", rise())
print("sfx:", sorted(p.name for p in OUT.iterdir()))
