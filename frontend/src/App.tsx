import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0A0A0B] text-slate-200 font-sans selection:bg-indigo-500/30 flex flex-col">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-900/20 via-[#0A0A0B] to-[#0A0A0B] pointer-events-none" />
      <div className="w-full h-full mx-auto relative z-10 flex flex-col p-4 md:p-6 pb-0">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/[0.05] pb-4 mb-4 shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.3)] ring-1 ring-white/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-0.5">
                Population Overview
              </h1>
              <p className="text-slate-400 text-sm font-medium">
                Demographic trends & analytics
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 min-h-0 pb-4">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default App;