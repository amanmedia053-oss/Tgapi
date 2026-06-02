import { Send, Smartphone, ShieldCheck, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 py-4 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-500/20 text-white">
          <Send className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl font-bold font-sans text-white tracking-tight flex items-center gap-2">
            Telegram Mobile Integrator
            <span className="bg-blue-500/10 text-blue-400 text-xs px-2.5 py-0.5 rounded-full font-medium border border-blue-500/20">
              Capacitor SDK Ready
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Channel Feed Scraper & Android Playground
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-slate-300 text-xs font-mono">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/60 rounded-xl border border-slate-705/10">
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span>Android Ready</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/60 rounded-xl border border-slate-705/10">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Secured Bot Handler</span>
        </div>
      </div>
    </header>
  );
}
