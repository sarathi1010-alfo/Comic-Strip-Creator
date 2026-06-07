import React from 'react';

export interface TransformerProps {
  title: string;
  description: string;
  isLoading: boolean;
  children: React.ReactNode; // Upload zone and result zone
}

export function Transformer({ title, description, isLoading, children }: TransformerProps) {
  return (
    <section className="bg-slate-900 text-slate-100 p-8 rounded-xl border border-slate-800 shadow-xl max-w-3xl mx-auto my-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-orange-500 mb-4">{title}</h2>
        <p className="text-slate-400">{description}</p>
      </div>

      <div className={`relative transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div className="flex flex-col gap-6">
          {children}
        </div>
      </div>
    </section>
  );
}
