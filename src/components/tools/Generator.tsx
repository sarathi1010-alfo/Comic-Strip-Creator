import React from 'react';

export interface GeneratorProps {
  title: string;
  description: string;
  buttonText: string;
  onGenerate: () => void;
  children: React.ReactNode; // Controls and output display
}

export function Generator({ title, description, buttonText, onGenerate, children }: GeneratorProps) {
  return (
    <section className="bg-slate-900 text-slate-100 p-8 rounded-xl border border-slate-800 shadow-xl max-w-4xl mx-auto my-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
           <h2 className="text-2xl font-bold text-orange-500 mb-4">{title}</h2>
           <p className="text-slate-400 mb-6 text-sm">{description}</p>
           <button
             onClick={onGenerate}
             className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
           >
             {buttonText}
           </button>
        </div>
        <div className="md:w-2/3 bg-slate-950 rounded-lg border border-slate-800 p-6 min-h-[300px] flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </section>
  );
}
