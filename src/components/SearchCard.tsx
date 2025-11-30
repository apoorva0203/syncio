/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { Product } from "@/app/lib/products";

type Props = {
    product: Product;
    onSeeMore: () => void;
};

export default function SearchCard({ product, onSeeMore }: Props) {
    const [hero, setHero] = useState(product.images[0]);
    console.log(product)
    const inventory = useMemo(() => {
        const match = product.variants.find(v => v.image_id === hero.id);
        return match?.inventory_quantity ?? 0;
    }, [hero, product.variants]);

    return (
        <div className="border border-slate-200 rounded-xl bg-white overflow-hidden flex flex-col shadow-sm p-3 text-black">

            <div className="relative h-40 bg-slate-100 rounded-lg flex items-center justify-center text-lg font-semibold">
                Image {hero.position}

                <span
                    className={`absolute top-2 right-2 text-[10px] px-2 py-1 rounded-full text-white ${inventory > 0 ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                >
                    {inventory > 0 ? `In Stock (${inventory})` : "OUT OF STOCK"}
                </span>
            </div>

            <h3 className="text-sm font-semibold mt-3">{product.title}</h3>

            <div className="mt-2">
                <label className="text-[11px] text-slate-500">Select Variant</label>
                <select
                    className="w-full text-sm border rounded-md px-2 py-1 mt-1"
                    value={hero.id}
                    onChange={(e) => {
                        const selected = product.variants.find(
                            img => img.id === Number(e.target.value)
                        );
                        if (selected) setHero(product.images.filter((each: any) => each?.id === selected?.image_id)[0]);
                    }}
                >
                    {product.variants.map(vari => (
                        <option key={vari.id} value={vari.id}>
                            {vari.sku}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-5 gap-2 mt-3">
                {Array.from(
                    new Map(product.images.map(img => [img.id, img])).values()
                ).map(img => (
                    <button
                        key={img.id}
                        onClick={() => setHero(img)}
                        className={`border rounded-md h-10 text-[11px] flex items-center justify-center ${hero.id === img.id ? "bg-slate-900 text-white" : "bg-slate-100"
                            }`}
                    >
                        {img.position}
                    </button>
                ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className="text-base font-semibold">$100.00</div>

                <button
                    onClick={onSeeMore}
                    className="text-xs px-3 py-1 rounded-full bg-slate-900 text-white"
                >
                    See More
                </button>
            </div>
        </div>
    );
}
