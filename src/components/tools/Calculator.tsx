import React from 'react';

export interface CalculatorProps {
  title: string;
  description: string;
  formulaDescription: string;
  children: React.ReactNode; // Inputs and Results
}

export function Calculator({ title, description, formulaDescription, children }: CalculatorProps) {
  return (
    <section className="bg-slate-900 text-slate-100 p-8 rounded-xl border border-slate-800 shadow-xl max-w-2xl mx-auto my-12">
      <div className="border-b border-slate-800 pb-6 mb-6">
        <h2 className="text-2xl font-bold text-violet-400 mb-2">{title}</h2>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>

      <div className="mb-6 space-y-4">
        {children}
      </div>

      <div className="bg-slate-800/50 p-4 rounded-lg text-xs text-slate-500">
        <span className="font-semibold text-slate-400 block mb-1">Formula Used:</span>
        {formulaDescription}
      </div>
    </section>
  );
}
