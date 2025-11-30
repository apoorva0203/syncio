import { useEffect, useState } from "react";
import payload1 from "@/data/payload1.json";
import payload2 from "@/data/payload2.json";
import SearchCard from "./SearchCard";
import { Product } from "@/app/lib/products";
import SearchModal from "./SearchModal";
import { FiltersState } from "@/app/page";
type Props = {
    query: string;
    filters: FiltersState;
};
export default function SearchResultsSection({ query, filters }: Props) {

    const [selected, setSelected] = useState<Product | null>(null);
    const [product, setProduct] = useState<Product | null>(payload1);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProduct(payload2);
        }, 30000);

        return () => clearTimeout(timer);
    }, []);
    const matchQuery =
        !query.trim() ||
        product?.title.toLowerCase().includes(query.toLowerCase());

    if (!matchQuery) {
        return (
            <div className="text-center text-slate-400 py-10">
                No results found.
            </div>
        );
    }

    if (filters.category && filters.category !== "All") {
        const normalized =
            product?.title.toLowerCase().includes(filters.category.toLowerCase());

        if (!normalized) {
            return (
                <div className="text-center text-slate-400 py-10">
                    No results found for this filter.
                </div>
            );
        }
    }
    if (!product) return <p>Loading product...</p>;

    return (
        <div>
            {/* Product Card */}
            <SearchCard
                product={product}
                onSeeMore={() => setSelected(product)}
            />

            {/* Modal */}
            {selected && (
                <SearchModal
                    product={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>
    );
}
