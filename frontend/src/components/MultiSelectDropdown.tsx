import { useState, useMemo, useRef, useEffect } from "react";

type Option = {
    label: string;
    value: string;
};

type Props = {
    options: Option[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    label: string;
    placement?: "bottom" | "top";
};

export const MultiSelectDropdown = ({ options, selectedValues, onChange, placeholder = "Select...", label, placement = "bottom" }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = useMemo(() => {
        if (!searchTerm) return options;
        return options.filter(opt =>
            opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [options, searchTerm]);

    const handleSelectAll = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedValues.length === options.length) {
            onChange([]);
        } else {
            onChange(options.map(opt => opt.value));
        }
    };

    const toggleOption = (value: string) => {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter(v => v !== value));
        } else {
            onChange([...selectedValues, value]);
        }
    };

    const isAllSelected = options.length > 0 && selectedValues.length === options.length;

    // Display values
    const displayValue = selectedValues.length === 0
        ? placeholder
        : selectedValues.length === options.length
            ? "All Selected"
            : `${selectedValues.length} Selected`;

    const placementClass = placement === "top"
        ? "bottom-full mb-2"
        : "top-full mt-2";

    return (
        <div className="flex flex-col gap-2 w-full" ref={dropdownRef}>
            <span className="text-sm font-semibold text-slate-300">{label}:</span>

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between text-left appearance-none bg-black/50 border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 hover:border-white/[0.2] hover:bg-black/70 cursor-pointer transition-all"
                >
                    <span className="truncate pr-4">{displayValue}</span>
                    <svg className={`w-4 h-4 text-slate-400 transition-transform ${isOpen && placement === "bottom" ? "rotate-180" : ""} ${isOpen && placement === "top" ? "-rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={placement === "top" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                    </svg>
                </button>

                {isOpen && (
                    <div className={`absolute z-50 w-full min-w-[240px] bg-slate-900 border border-white/[0.1] shadow-2xl rounded-xl overflow-hidden flex flex-col max-h-[240px] ${placementClass}`}>
                        {/* Search header */}
                        <div className="p-2 border-b border-white/[0.05] shrink-0 bg-slate-900/95 backdrop-blur-md">
                            <div className="relative">
                                <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-black/40 border border-white/[0.05] rounded-lg pl-8 pr-3 py-1.5 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 placeholder:text-slate-600"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>

                        {/* List Options */}
                        <div className="overflow-y-auto flex-1 p-2 flex flex-col gap-1 custom-scrollbar">
                            <button
                                onClick={handleSelectAll}
                                className="flex items-center gap-3 px-2.5 py-2 w-full text-left rounded-lg hover:bg-white/[0.05] transition-colors group"
                            >
                                <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${isAllSelected ? "bg-indigo-500 border-indigo-500" : "border-slate-500 group-hover:border-slate-400"}`}>
                                    {isAllSelected && (
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm font-semibold text-indigo-300">
                                    {isAllSelected ? "Clear All" : "Select All"}
                                </span>
                            </button>

                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((opt) => {
                                    const isSelected = selectedValues.includes(opt.value);
                                    return (
                                        <button
                                            key={opt.value}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleOption(opt.value);
                                            }}
                                            className={`flex items-center gap-3 px-2.5 py-2 w-full text-left rounded-lg transition-colors group ${isSelected ? "bg-indigo-500/10" : "hover:bg-white/[0.05]"}`}
                                        >
                                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${isSelected ? "bg-indigo-500 border-indigo-500" : "border-slate-500 group-hover:border-slate-400"}`}>
                                                {isSelected && (
                                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className={`text-sm truncate ${isSelected ? "text-indigo-200 font-medium" : "text-slate-300"}`}>
                                                {opt.label}
                                            </span>
                                        </button>
                                    );
                                })
                            ) : (
                                <div className="text-sm text-slate-500 italic py-3 text-center">
                                    No options found
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
