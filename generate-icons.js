import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgBuffer = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff6600"/>
      <stop offset="100%" stop-color="#cc3300"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="120" fill="url(#bg)"/>
  <!-- Steaming Momo Icon -->
  <g transform="translate(156, 120) scale(0.4)" filter="url(#shadow)">
    <path d="M 256 50 C 140 50 40 160 40 280 C 40 380 140 450 256 450 C 372 450 472 380 472 280 C 472 160 372 50 256 50 Z" fill="#fff5ea"/>
    <path d="M 256 50 C 220 120 180 200 256 280 C 332 200 292 120 256 50 Z" fill="#ffe0cc"/>
    <path d="M 140 180 C 180 220 220 250 256 280" stroke="#ff6600" stroke-width="12" stroke-linecap="round" fill="none"/>
    <path d="M 372 180 C 332 220 292 250 256 280" stroke="#ff6600" stroke-width="12" stroke-linecap="round" fill="none"/>
  </g>
  <text x="256" y="420" dominant-baseline="middle" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="54" fill="#ffffff" letter-spacing="2">BYTE MINIZ</text>
</svg>
`);

async function generate() {
  const publicDir = path.join(process.cwd(), 'public');
  
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));

  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));

  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  console.log('PWA PNG icons generated successfully!');
}

generate().catch(console.error);
