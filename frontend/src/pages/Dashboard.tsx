import { useEffect, useState } from "react";
import { ColumnChart } from "../components/ColumnChart";
import { PieChart } from "../components/PieChart";
import { CountryFilter } from "../components/CountryFilter";

import {
    fetchPopulation,
    fetchCountries,
    fetchTopCountries
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
    const [selected, setSelected] = useState<string[]>([]);

    // New API filter states
    const [group, setGroup] = useState<string>("");
    const [limit, setLimit] = useState<number | "">("");
    const [sort, setSort] = useState<"asc" | "desc" | "">("");

    // Load available countries for the filter dropdown whenever the group changes
    useEffect(() => {
        // Pass empty limit and sort so we fetch ALL countries inside the group
        fetchPopulation(group, "", "").then(res => {
            setCountries(res.series.map(s => s.name));
            // Reset the selected countries since the group has changed
            setSelected([]);
        });
    }, [group]);

    // Filter countries and apply global filters to Column Chart
    useEffect(() => {
        if (selected.length === 0) {
            fetchPopulation(group, limit, sort)
                .then(setColumnData);
        } else {
            fetchCountries(selected, group, limit, sort)
                .then(setColumnData);
        }
    }, [selected, group, limit, sort]);

    // Pie chart (Top Countries)
    useEffect(() => {
        fetchTopCountries(sort, limit, group)
            .then(setPieData);
    }, [sort, limit, group]);


    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Global API Filters Area */}
            <div className="flex flex-col xl:flex-row gap-6 bg-white/[0.02] backdrop-blur-2xl rounded-3xl border border-white/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.4)] p-6 md:px-8 md:py-6 items-start xl:items-center justify-between">
                <div className="flex items-center gap-3 border-b xl:border-b-0 xl:border-r border-white/[0.1] pb-5 xl:pb-0 pr-0 xl:pr-6 w-full xl:w-auto">
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

                <div className="flex flex-wrap items-center gap-5 xl:gap-8 flex-1 w-full xl:justify-end">
                    <label className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-slate-300">Region:</span>
                        <div className="relative group">
                            <select
                                value={group}
                                onChange={(e) => setGroup(e.target.value)}
                                className="appearance-none bg-black/50 border border-white/[0.08] rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 hover:border-white/[0.2] hover:bg-black/70 cursor-pointer transition-all w-[140px]"
                            >
                                <option value="">All Regions</option>
                                <option value="ASEAN">ASEAN Only</option>
                                <option value="SAARC">SAARC Only</option>
                            </select>
                            <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </label>

                    <label className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-slate-300">Display Limit:</span>
                        <div className="relative group">
                            <select
                                value={limit}
                                onChange={(e) => setLimit(e.target.value ? Number(e.target.value) : "")}
                                className="appearance-none bg-black/50 border border-white/[0.08] rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 hover:border-white/[0.2] hover:bg-black/70 cursor-pointer transition-all w-[140px]"
                            >
                                <option value="">No Limit</option>
                                <option value="5">Top 5 Countries</option>
                                <option value="10">Top 10 Countries</option>
                                <option value="20">Top 20 Countries</option>
                                <option value="50">Top 50 Countries</option>
                            </select>
                            <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </label>

                    <label className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-slate-300">Sorting:</span>
                        <div className="relative group">
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value as "asc" | "desc" | "")}
                                className="appearance-none bg-black/50 border border-white/[0.08] rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 hover:border-white/[0.2] hover:bg-black/70 cursor-pointer transition-all w-[160px]"
                            >
                                <option value="">Default Order</option>
                                <option value="desc">Highest Population</option>
                                <option value="asc">Lowest Population</option>
                            </select>
                            <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </label>
                </div>
            </div>

            {/* Country Filters Area */}
            <div className="bg-white/[0.02] backdrop-blur-2xl rounded-3xl border border-white/[0.05] shadow-2xl p-6 md:p-8">
                <div className="w-full">
                    <CountryFilter
                        countries={countries}
                        selected={selected}
                        onChange={setSelected}
                    />
                </div>
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.3)] rounded-3xl p-6 md:p-8 transition-all duration-500 hover:shadow-[0_8px_40px_rgb(99,102,241,0.15)] hover:border-white/[0.12]">
                    <ColumnChart data={columnData} />
                </div>
                <div className="lg:col-span-2 bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.3)] rounded-3xl p-6 md:p-8 transition-all duration-500 hover:shadow-[0_8px_40px_rgb(99,102,241,0.15)] hover:border-white/[0.12] flex items-center justify-center min-h-[400px]">
                    <div className="w-full">
                        <PieChart data={pieData} />
                    </div>
                </div>
            </div>
        </div>
    );
};