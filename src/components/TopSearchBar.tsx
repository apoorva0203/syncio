"use client";

import { FiltersState } from "@/app/page";


type Props = {
    query: string;
    setQuery: (val: string) => void;
    filters: FiltersState;
    setFilters: (val: FiltersState) => void;
};

export default function TopSearchBar({
    query,
    setQuery,
    filters,
    setFilters,
}: Props) {
    return (
        <div className="flex flex-col gap-3 text-black">
            <div>
                <h1 className="text-2xl font-semibold">Product Search & Diff Viewer</h1>
                <p className="text-sm text-slate-500">
                    Compare payloads and explore a sample product catalog with filters.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:items-center">
                <input
                    type="text"
                    placeholder="Search products, brands, categories..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Sort by</span>
                    <select
                        value={filters.sort}
                        onChange={(e) =>
                            setFilters({ ...filters, sort: e.target.value as FiltersState["sort"] })
                        }
                        className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="newest">Newest First</option>
                        <option value="price-asc">Price: Low → High</option>
                        <option value="price-desc">Price: High → Low</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
