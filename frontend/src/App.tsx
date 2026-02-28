import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-6">
      <h1 className="text-3xl font-bold mb-6 text-sky-400">
        ASEAN vs SAARC Population Dashboard
      </h1>
      <Dashboard />
    </div>
  );
}

export default App;