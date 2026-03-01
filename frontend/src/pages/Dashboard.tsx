import { useEffect, useState, useMemo } from "react";
import { ColumnChart } from "../components/ColumnChart";
import { PieChart } from "../components/PieChart";
import { MiniGaugeChart } from "../components/MiniGaugeChart";
import { MultiSelectDropdown } from "../components/MultiSelectDropdown";
import { SingleSelectDropdown } from "../components/SingleSelectDropdown";

import {
    fetchPopulation,
    fetchCountries
} from "../services/populationApi";

import type { PopulationResponse } from "../types/population.types";


export const Dashboard = () => {
    const [columnData, setColumnData] = useState<PopulationResponse>({
        years: [], series: []
    });

    const [pieData, setPieData] = useState<PopulationResponse>({
        years: [], series: []
    });

    const [countries, setCountries] = useState<string[]>([]);

    // Memoized constant regions to populate dropdown options
    const regionOptions = useMemo(() => [
        { label: "Africa", value: "Africa" },
        { label: "Americas", value: "Americas" },
        { label: "Asia", value: "Asia" },
        { label: "Europe", value: "Europe" },
        { label: "Oceania", value: "Oceania" },
        { label: "Antarctic", value: "Antarctic" }
    ], []);

    // Default to all regions selected as requested
    const [selectedRegions, setSelectedRegions] = useState<string[]>(
        regionOptions.map(r => r.value)
    );

    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

    // New API filter states
    const [limit, setLimit] = useState<number | "">(10); // Default to Top 10 to avoid charts overflowing
    const [sort, setSort] = useState<"asc" | "desc" | "">("");

    const countryOptions = useMemo(() => {
        return countries.map(c => ({ label: c, value: c }));
    }, [countries]);

    // Derived param for API calls
    const groupParam = selectedRegions.join(",");

    // Load available countries for the filter dropdown whenever the groups change
    useEffect(() => {
        if (selectedRegions.length === 0) {
            setCountries([]);
            setSelectedCountries([]);
            return;
        }

        // Pass empty limit and sort so we fetch ALL countries inside the selected groups
        fetchPopulation(groupParam, "", "", false).then(res => {
            const allCountries = res.series.map(s => s.name);
            setCountries(allCountries);

            // CRITICAL FIX: If a Region is unselected, we must remove any of its countries from the active selection
            setSelectedCountries(prev => prev.filter(c => allCountries.includes(c)));
        });
    }, [groupParam, selectedRegions.length]);

    // Unified Chart Fetching: Apply global filters to both Column and Pie Charts simultaneously
    useEffect(() => {
        if (selectedRegions.length === 0) {
            setColumnData({ years: [], series: [] });
            setPieData({ years: [], series: [] });
            return;
        }

        const fetchPromise = selectedCountries.length === 0
            ? fetchPopulation(groupParam, limit, sort)
            : fetchCountries(selectedCountries, groupParam, limit, sort);

        fetchPromise.then(data => {
            setColumnData(data);
            setPieData(data);
        });
    }, [selectedCountries, groupParam, limit, sort, selectedRegions.length]);


    const limitOptions = [
        { label: "No Limit", value: "" },
        { label: "Top 5 Countries", value: 5 },
        { label: "Top 10 Countries", value: 10 },
    ];

    const sortOptions = [
        { label: "Default Order", value: "" },
        { label: "Highest Population", value: "desc" },
        { label: "Lowest Population", value: "asc" },
    ];


    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full h-full animate-in fade-in duration-700">
            {/* Sidebar (Filters) */}
            <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
                {/* Unified Control Panel */}
                <div className="bg-white/[0.02] backdrop-blur-2xl rounded-3xl border border-white/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.4)] p-5 md:p-6 flex flex-col gap-5 relative z-[60]">
                    <div className="flex items-center gap-3 border-b border-white/[0.1] pb-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center ring-1 ring-indigo-500/20">
                            <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-sm font-bold text-white uppercase tracking-widest block mb-0.5">Control Panel</span>
                            <span className="text-xs text-slate-400 font-medium tracking-wide">Global API Filters</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 relative z-50">
                        {/* 1. Region / Continent */}
                        <div className="relative z-[50]">
                            <MultiSelectDropdown
                                label="Region"
                                placeholder="All Regions"
                                options={regionOptions}
                                selectedValues={selectedRegions}
                                onChange={setSelectedRegions}
                            />
                        </div>

                        {/* 2. Countries */}
                        <div className="relative z-[40]">
                            <MultiSelectDropdown
                                label="Countries"
                                placeholder="All Countries"
                                options={countryOptions}
                                selectedValues={selectedCountries}
                                onChange={setSelectedCountries}
                            />
                        </div>

                        {/* 3. Display Limit */}
                        <div className="relative z-[30]">
                            <SingleSelectDropdown
                                label="Display Limit"
                                options={limitOptions}
                                value={limit}
                                onChange={(val) => setLimit(val as number | "")}
                            />
                        </div>

                        {/* 4. Sorting */}
                        <div className="relative z-[20]">
                            <SingleSelectDropdown
                                label="Sorting"
                                options={sortOptions} // default, asc, desc
                                value={sort}
                                onChange={(val) => setSort(val as "asc" | "desc" | "")}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content (Charts) */}
            <div className="flex-1 flex flex-col xl:flex-row gap-6 min-w-0 min-h-0 overflow-hidden">
                {/* Column Chart Panel */}
                <div className="flex-[2] bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] shadow-2xl rounded-3xl p-5 flex flex-col min-h-[300px] xl:min-h-0 relative group transition-all hover:border-indigo-500/20">
                    <div className="w-full h-full relative">
                        <ColumnChart data={columnData} />
                    </div>
                </div>

                {/* Right Column (Pie + Mini) */}
                <div className="flex-[1] flex flex-col gap-6 min-h-[500px] xl:min-h-0">
                    {/* Pie Chart Panel */}
                    <div className="flex-[2] bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] shadow-2xl rounded-3xl p-4 flex flex-col relative group transition-all hover:border-indigo-500/20 min-h-[300px] xl:min-h-0">
                        <div className="w-full h-full relative">
                            <PieChart data={pieData} />
                        </div>
                    </div>

                    {/* Mini Gauge Chart Panel */}
                    <div className="flex-[1] bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] shadow-2xl rounded-3xl p-4 flex flex-col relative group transition-all hover:border-indigo-500/20 min-h-[200px] xl:min-h-0">
                        <div className="w-full h-full relative flex items-center justify-center">
                            <MiniGaugeChart data={pieData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};