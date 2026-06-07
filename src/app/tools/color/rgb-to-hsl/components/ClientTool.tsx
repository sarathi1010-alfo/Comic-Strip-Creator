"use client";

import React, { useState } from 'react';
import { Converter } from '@/components/tools/Converter';
import Link from 'next/link';

// Mathematical conversion function
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function ClientRgbToHslTool() {
  const [rgb, setRgb] = useState({ r: 65, g: 105, b: 225 });
  const [copied, setCopied] = useState(false);

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(hslString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-3xl mx-auto">
      <Converter
        title="RGB to HSL Color Converter"
        description="Instantly convert Red, Green, Blue (RGB) color values to Hue, Saturation, Lightness (HSL) format."
        inputUnit="RGB"
        outputUnit="HSL"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Input Controls */}
          <div className="w-full space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">R (0-255)</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.r}
                onChange={(e) => setRgb({ ...rgb, r: Math.min(255, Math.max(0, parseInt(e.target.value) || 0)) })}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">G (0-255)</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.g}
                onChange={(e) => setRgb({ ...rgb, g: Math.min(255, Math.max(0, parseInt(e.target.value) || 0)) })}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">B (0-255)</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.b}
                onChange={(e) => setRgb({ ...rgb, b: Math.min(255, Math.max(0, parseInt(e.target.value) || 0)) })}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-violet-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Visualizer & Output */}
          <div className="w-full flex flex-col items-center">
            <div
              className="w-32 h-32 rounded-full shadow-lg border-4 border-slate-800 mb-6"
              style={{ backgroundColor: rgbString }}
            ></div>

            <div className="text-center w-full">
              <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4 font-mono text-xl text-orange-400">
                {hslString}
              </div>
              <button
                onClick={handleCopy}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                {copied ? 'Copied!' : 'Copy HSL Value'}
              </button>
            </div>
          </div>
        </div>
      </Converter>

      {/* How It Works Section */}
      <section className="mt-16 bg-slate-900/50 p-8 rounded-xl border border-slate-800/50">
        <h2 className="text-2xl font-bold text-slate-200 mb-4">How It Works</h2>
        <p className="text-slate-400 mb-4 leading-relaxed">
          RGB (Red, Green, Blue) and HSL (Hue, Saturation, Lightness) are two different ways of mathematically representing colors in digital displays. While RGB is closer to how screens emit light, HSL is often more intuitive for human designers because it separates the base color (Hue) from its intensity (Saturation) and brightness (Lightness).
        </p>
        <p className="text-slate-400 leading-relaxed">
          This tool performs a mathematical conversion directly in your browser. No data is sent to any server, ensuring your inputs remain completely private and the conversion happens instantly.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-200 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-violet-400">What is HSL?</h3>
            <p className="text-slate-400 mt-2">HSL stands for Hue, Saturation, and Lightness. Hue represents the base color on a 360-degree wheel, Saturation represents the intensity (0% is gray, 100% is full color), and Lightness represents how dark or light the color is.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-violet-400">Why use HSL instead of RGB?</h3>
            <p className="text-slate-400 mt-2">HSL is often preferred by designers when tweaking colors because it is easier to create color palettes. For example, to make a color darker in HSL, you simply reduce the Lightness value, whereas in RGB you would need to adjust all three channels.</p>
          </div>
        </div>
      </section>

      {/* Internal Linking Graph */}
      <section className="mt-16 border-t border-slate-800 pt-8">
        <h3 className="text-lg font-medium text-slate-300 mb-4">Related Color Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/tools/color/hex-to-rgb" className="block p-4 bg-slate-900 border border-slate-800 rounded-lg hover:border-violet-500 transition-colors">
            HEX to RGB Converter
          </Link>
          <Link href="/tools/color/hsl-to-hex" className="block p-4 bg-slate-900 border border-slate-800 rounded-lg hover:border-violet-500 transition-colors">
            HSL to HEX Converter
          </Link>
        </div>
      </section>
    </main>
  );
}
