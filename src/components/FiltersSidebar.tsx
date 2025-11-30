"use client";

import { FiltersState } from "@/app/page";

type Props = {
    filters: FiltersState;
    setFilters: (val: FiltersState) => void;
};

const quickOptions = [
    { id: "in-stock", label: "In Stock" },
    { id: "on-sale", label: "On Sale" },
    { id: "new-arrivals", label: "New Arrivals" },
];

export default function FiltersSidebar({ filters, setFilters }: Props) {
    const toggleQuick = (id: string) => {
        const exists = filters.quick.includes(id);
        setFilters({
            ...filters,
            quick: exists
                ? filters.quick.filter((x) => x !== id)
                : [...filters.quick, id],
        });
    };

    const clearAll = () =>
        setFilters({
            category: "",
            priceRange: "",
            rating: "",
            quick: [],
            sort: filters.sort,
        });

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-6 sticky top-6 text-black">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Filters</h2>
                <button
                    onClick={clearAll}
                    className="text-xs text-indigo-600 hover:underline"
                >
                    Clear All
                </button>
            </div>

            <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-600">Category</p>
                <select
                    value={filters.category}
                    onChange={(e) =>
                        setFilters({ ...filters, category: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                >
                    <option value="">All Categories</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Home">Home</option>
                </select>
            </div>

            <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-600">Price Range</p>
                <select
                    value={filters.priceRange}
                    onChange={(e) =>
                        setFilters({ ...filters, priceRange: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                >
                    <option value="">All Prices</option>
                    <option value="0-50">$0 – $50</option>
                    <option value="50-100">$50 – $100</option>
                    <option value="100-200">$100 – $200</option>
                </select>
            </div>

            <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-600">Rating</p>
                <select
                    value={filters.rating}
                    onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                >
                    <option value="">All Ratings</option>
                    <option value="4">4★ & up</option>
                    <option value="4.5">4.5★ & up</option>
                </select>
            </div>

            <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-600">Quick Filters</p>
                <div className="flex flex-col gap-2">
                    {quickOptions.map((q) => {
                        const active = filters.quick.includes(q.id);
                        return (
                            <button
                                key={q.id}
                                onClick={() => toggleQuick(q.id)}
                                className={`text-left text-xs px-3 py-2 rounded-full border ${active
                                    ? "bg-indigo-600 border-indigo-600 text-white"
                                    : "bg-slate-100 border-slate-200 text-slate-700"
                                    }`}
                            >
                                {q.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
