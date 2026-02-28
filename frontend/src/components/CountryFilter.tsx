import { useState, useMemo } from "react";

type Props = {
    countries: string[];
    selected: string[];
    onChange: (c: string[]) => void;
};

export const CountryFilter = ({ countries, selected, onChange }: Props) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Default show "all" selected state logic
    const isAllSelected = selected.length === 0 || selected.length === countries.length;

    const toggleCountry = (country: string) => {
        if (selected.includes(country)) {
            onChange(selected.filter((c) => c !== country));
        } else {
            onChange([...selected, country]);
        }
    };

    const handleSelectAll = () => {
        if (isAllSelected) {
            onChange([countries[0]]); // Select at least 1 so it doesn't revert to all if empty is caught
        } else {
            onChange([]);
        }
    };

    const filteredCountries = useMemo(() => {
        if (!searchTerm) return countries;
        return countries.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [countries, searchTerm]);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    Country Filters
                </label>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search countries..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-black/40 border border-white/[0.05] rounded-full pl-9 pr-4 py-1.5 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600 w-48 hover:bg-black/60"
                        />
                    </div>
                    <button
                        onClick={handleSelectAll}
                        className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 px-3 py-1.5 rounded-full"
                    >
                        {isAllSelected ? "Clear All" : "Select All"}
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap gap-2.5 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => {
                        const isSelected = selected.length === 0 || selected.includes(country);

                        return (
                            <button
                                key={country}
                                onClick={() => toggleCountry(country)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border flex items-center gap-2 group ${isSelected
                                        ? "bg-indigo-500/20 text-indigo-200 border-indigo-500/40 hover:bg-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                        : "bg-black/40 text-slate-400 border-white/[0.05] hover:border-white/[0.15] hover:text-slate-200"
                                    }`}
                            >
                                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-300 ${isSelected ? "bg-indigo-500 border-indigo-500 scale-100" : "border-slate-600 bg-transparent scale-90 group-hover:scale-100"
                                    }`}>
                                    {isSelected && (
                                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                {country}
                            </button>
                        );
                    })
                ) : (
                    <div className="text-sm text-slate-500 italic py-2">No countries found matching "{searchTerm}"</div>
                )}
            </div>
        </div>
    );
};