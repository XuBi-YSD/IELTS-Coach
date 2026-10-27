#!/usr/bin/env python3
"""Copy scenes.json -> video-en/<name>/scenes.json with Vietnamese narration replaced by English (en_voice_texts.py)."""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from en_voice_texts import EN
SRC = "/Users/maitrongduy/Private Project/20261020-english-coach/video"
DST = "/Users/maitrongduy/Private Project/20261020-english-coach/video-en"
used = set()
for name in ["bai-01"] + [f"week-{i:02d}" for i in (1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)]:
    d = json.load(open(f"{SRC}/{name}/scenes.json", encoding="utf-8"))
    for s in d["scenes"]:
        if s["voice_lang"].startswith("vi"):
            k = f"{name} {s['id']}"
            s["voice_text"] = EN[k]; s["voice_lang"] = "en-US"; used.add(k)
    d["default_voices"] = {"en-US": "en-US-JennyNeural"}
    d["status"] = "English-voice copy (video-en); original untouched"
    os.makedirs(f"{DST}/{name}", exist_ok=True)
    json.dump(d, open(f"{DST}/{name}/scenes.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("replaced", len(used), "unused keys:", set(EN) - used)
