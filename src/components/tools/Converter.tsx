import React from 'react';

export interface ConverterProps {
  title: string;
  description: string;
  inputUnit: string;
  outputUnit: string;
  children: React.ReactNode; // The actual conversion logic/form
}

export function Converter({ title, description, inputUnit, outputUnit, children }: ConverterProps) {
  return (
    <section className="bg-slate-900 text-slate-100 p-8 rounded-xl border border-slate-800 shadow-xl max-w-2xl mx-auto my-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-violet-400 mb-4">{title}</h2>
        <p className="text-slate-400">{description}</p>
      </div>

      <div className="bg-slate-950 p-6 rounded-lg border border-slate-800">
        <div className="flex items-center justify-between mb-4 text-sm font-medium text-slate-500 uppercase tracking-wider">
          <span>{inputUnit}</span>
          <span className="text-orange-500">→</span>
          <span>{outputUnit}</span>
        </div>
        {children}
      </div>
    </section>
  );
}
