#!/bin/bash
# Render several lesson folders sequentially (one video at a time to save RAM).
# Usage: render_all.sh [-o OUT_DIR] [-n NAME_PREFIX] DIR1 [DIR2 ...]
#   each DIR must contain scenes.json; output = OUT_DIR/<basename DIR>.mp4 (+ .srt)
#   videos that already exist are skipped (never overwritten).
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
PY="${PYTHON:-/Users/maitrongduy/Private Project/20261015-ClaudeCode-FileManagement-Lesson/.venv/bin/python}"  # needs edge_tts + Pillow + numpy
[ -x "$HERE/.venv/bin/python" ] && [ -z "${PYTHON:-}" ] && PY="$HERE/.venv/bin/python"
OUT="$PWD/output"; PREFIX=""
while getopts "o:n:" o; do case $o in o) OUT="$OPTARG";; n) PREFIX="$OPTARG";; esac; done
shift $((OPTIND-1))
[ $# -eq 0 ] && { echo "usage: $0 [-o OUT_DIR] [-n PREFIX] DIR..."; exit 1; }
mkdir -p "$OUT"
fail=0
for d in "$@"; do
  d="${d%/}"
  name="${PREFIX}$(basename "$d")"
  if [ ! -f "$d/scenes.json" ]; then echo "SKIP (no scenes.json): $d"; continue; fi
  if [ -f "$OUT/$name.mp4" ]; then echo "SKIP (exists): $OUT/$name.mp4"; continue; fi
  echo "== render $d -> $OUT/$name.mp4"
  "$PY" "$HERE/render.py" "$d/scenes.json" "$OUT" --name "$name" || { echo "FAILED: $d"; fail=1; }
done
exit $fail
