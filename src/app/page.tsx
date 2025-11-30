"use client";

import DiffSection from "@/components/DiffSection";
import FiltersSidebar from "@/components/FiltersSidebar";
import SearchResultsSection from "@/components/SearchResultsSection";
import TopSearchBar from "@/components/TopSearchBar";
import { useState } from "react";

export type FiltersState = {
    category: string;
    priceRange: string;
    rating: string;
    quick: string[]; // e.g. ["in-stock", "on-sale"]
    sort: "newest" | "price-asc" | "price-desc";
};

export default function HomePage() {
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState<FiltersState>({
        category: "",
        priceRange: "",
        rating: "",
        quick: [],
        sort: "newest",
    });

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* Top search + sort */}
            <header className="border-b bg-white">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <TopSearchBar
                        query={query}
                        setQuery={setQuery}
                        filters={filters}
                        setFilters={setFilters}
                    />
                </div>
            </header>

            {/* Main content */}
            <div className="flex flex-1 max-w-6xl mx-auto w-full px-4 py-6 gap-6">
                {/* Left filters */}
                <aside className="w-64 shrink-0 hidden md:block">
                    <FiltersSidebar filters={filters} setFilters={setFilters} />
                </aside>

                {/* Right: diff + search */}
                <main className="flex-1 space-y-10">
                    <section className="bg-white rounded-xl shadow-sm p-4">
                        <DiffSection />
                    </section>

                    <section className="bg-white rounded-xl shadow-sm p-4">
                        <SearchResultsSection query={query}
                            filters={filters} />
                    </section>
                </main>
            </div>
        </div>
    );
}
