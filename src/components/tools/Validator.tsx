import React from 'react';

export interface ValidatorProps {
  title: string;
  description: string;
  status: 'idle' | 'valid' | 'invalid' | 'checking';
  statusMessage?: string;
  children: React.ReactNode; // Input field
}

export function Validator({ title, description, status, statusMessage, children }: ValidatorProps) {
  const statusColors = {
    idle: 'border-slate-800 bg-slate-950 text-slate-500',
    valid: 'border-green-500/50 bg-green-500/10 text-green-400',
    invalid: 'border-red-500/50 bg-red-500/10 text-red-400',
    checking: 'border-orange-500/50 bg-orange-500/10 text-orange-400 animate-pulse',
  };

  return (
    <section className="bg-slate-900 text-slate-100 p-8 rounded-xl border border-slate-800 shadow-xl max-w-xl mx-auto my-12 text-center">
      <h2 className="text-2xl font-bold text-violet-400 mb-2">{title}</h2>
      <p className="text-slate-400 text-sm mb-8">{description}</p>

      <div className="mb-8">
        {children}
      </div>

      <div className={`p-4 rounded-lg border transition-all duration-300 ${statusColors[status]}`}>
        {status === 'idle' ? 'Awaiting input...' : statusMessage}
      </div>
    </section>
  );
}
