import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-200 p-4 md:p-8 font-sans selection:bg-indigo-500/30">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-900/20 via-[#0A0A0B] to-[#0A0A0B] pointer-events-none" />
      <div className="max-w-[1400px] mx-auto relative z-10 pt-4">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/[0.05] pb-8 mb-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.3)] ring-1 ring-white/20">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-1">
                Population Overview
              </h1>
              <p className="text-slate-400 text-sm font-medium">
                Demographic trends & analytics
              </p>
            </div>
          </div>
        </header>

        <Dashboard />
      </div>
    </div>
  );
}

export default App;