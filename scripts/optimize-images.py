#!/usr/bin/env python3
"""
Image optimisation pass.

Converts every raster asset to WebP, resizing to the largest size the
asset is actually displayed at:

  galleries  long edge 1800  (fullscreen lightbox on a 1440p display)
  supplies  long edge 1200  (catalogue card + lightbox)
  trucks    long edge 1280  (hero showcase + fleet cards)
  logo           480 wide   (navbar / footer — never larger than 240 CSS px)

Originals are kept on disk so the templates can fall back to them with a
<picture> element, and so the conversion is reversible from git.
"""
from PIL import Image
import os, glob, json, re

ROOT = '/Users/pblue/Documents/GitHub/uplayersone'
PUB = os.path.join(ROOT, 'public')

BUDGETS = {
    'galleries': 1800,
    'supplies': 1200,
    'trucks': 1280,
}

QUALITY = {
    'galleries': 82,
    'supplies': 80,
    'trucks': 86,
}


def convert(src, dst, max_edge, quality, keep_alpha):
    im = Image.open(src)
    had_alpha = im.mode in ('RGBA', 'LA') or 'transparency' in im.info
    w, h = im.size
    scale = min(1.0, max_edge / max(w, h))
    if scale < 1.0:
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)

    if keep_alpha and had_alpha:
        im = im.convert('RGBA')
    else:
        im = im.convert('RGB')

    im.save(dst, 'WEBP', quality=quality, method=6)
    return os.path.getsize(dst), im.size


total_before = total_after = 0
report = []

# ---- galleries -----------------------------------------------------------
for f in sorted(glob.glob(os.path.join(PUB, 'galleries', '*'))):
    if not f.lower().endswith(('.jpg', '.jpeg', '.png')):
        continue
    out = os.path.splitext(f)[0] + '.webp'
    before = os.path.getsize(f)
    after, size = convert(f, out, BUDGETS['galleries'], QUALITY['galleries'], False)
    total_before += before; total_after += after
    report.append((os.path.relpath(f, PUB), before, after, size))

# ---- supplies -----------------------------------------------------------
for f in sorted(glob.glob(os.path.join(PUB, 'supplies', '*', '*'))):
    if not f.lower().endswith(('.jpg', '.jpeg', '.png')):
        continue
    out = os.path.splitext(f)[0] + '.webp'
    before = os.path.getsize(f)
    after, size = convert(f, out, BUDGETS['supplies'], QUALITY['supplies'], False)
    total_before += before; total_after += after
    report.append((os.path.relpath(f, PUB), before, after, size))

# ---- trucks (keep alpha on the cut-out PNGs) ----------------------------
for f in sorted(glob.glob(os.path.join(PUB, 'trucks', '*'))):
    if not f.lower().endswith(('.jpg', '.jpeg', '.png')):
        continue
    out = os.path.splitext(f)[0] + '.webp'
    before = os.path.getsize(f)
    alpha = f.lower().endswith('.png')
    after, size = convert(f, out, BUDGETS['trucks'], QUALITY['trucks'], alpha)
    total_before += before; total_after += after
    report.append((os.path.relpath(f, PUB), before, after, size))

# ---- logo ---------------------------------------------------------------
logo = os.path.join(PUB, 'logo.png')
logo_webp = os.path.join(PUB, 'logo.webp')
before = os.path.getsize(logo)
after, size = convert(logo, logo_webp, 480, 90, True)
total_before += before; total_after += after
report.append(('public/logo.png', before, after, size))

print(f'{"asset":<46}{"before":>10}{"after":>10}  saved')
for path, b, a, size in report:
    print(f'{path:<46}{b//1024:>9}K{a//1024:>9}K  {100 - a*100//b:>3}%  {size}')

print(f'\nTOTAL {total_before//1024//1024} MB -> {total_after//1024} KB  '
      f'({100 - total_after*100//total_before}% smaller)')
