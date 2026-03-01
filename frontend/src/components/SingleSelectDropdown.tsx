import { useState, useRef, useEffect } from "react";

type Option = {
    label: string;
    value: string | number;
};

type Props = {
    options: Option[];
    value: string | number;
    onChange: (value: string | number) => void;
    label: string;
    placement?: "bottom" | "top";
    zIndex?: number;
};

export const SingleSelectDropdown = ({ options, value, onChange, label, placement = "bottom", zIndex = 50 }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
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

    const selectedOption = options.find(opt => opt.value === value);
    const displayValue = selectedOption ? selectedOption.label : "Select...";

    const placementClass = placement === "top"
        ? "bottom-full mb-2"
        : "top-full mt-2";

    return (
        <div className="flex flex-col gap-2 w-full relative" ref={dropdownRef} style={{ zIndex: isOpen ? 50 : zIndex }}>
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
                    <div className={`absolute w-full min-w-[240px] bg-slate-900 border border-white/[0.1] shadow-2xl rounded-xl overflow-hidden flex flex-col max-h-[240px] ${placementClass}`} style={{ zIndex: 50 }}>
                        <div className="overflow-y-auto flex-1 p-2 flex flex-col gap-1 custom-scrollbar">
                            {options.map((opt) => {
                                const isSelected = value === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onChange(opt.value);
                                            setIsOpen(false);
                                        }}
                                        className={`flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg transition-colors group ${isSelected ? "bg-indigo-500/10" : "hover:bg-white/[0.05]"}`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${isSelected ? "border-indigo-500" : "border-slate-500 group-hover:border-slate-400"}`}>
                                            {isSelected && (
                                                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                            )}
                                        </div>
                                        <span className={`text-sm truncate ${isSelected ? "text-indigo-200 font-bold" : "text-slate-300 font-medium"}`}>
                                            {opt.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
