import { Product } from "@/app/lib/products";


type Props = {
    product: Product;
    onClose: () => void;
};

export default function SearchModal({ product, onClose }: Props) {
    //  const mainImage = product.images?.[0]?.url ?? "/placeholder.png";

    const variantsCount = product.variants?.length ?? 0;
    const imagesCount = product.images?.length ?? 0;

    const cleanDescription = product.description
        ? product.description.replace(/<[^>]+>/g, "")
        : "";

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 text-black">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-5 space-y-4 overflow-auto max-h-[90vh]">

                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold">{product.title}</h3>
                        <p className="text-xs text-slate-500">Product ID: {product.id}</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-sm text-slate-500 hover:text-slate-800"
                    >
                        ✕
                    </button>
                </div>

                <div className="w-full h-48 bg-slate-100 rounded-lg overflow-hidden">
                    {/* <img
                        src={mainImage}
                        alt={product.title}
                        className="w-full h-full object-cover"
                    /> */}
                    {product.title}
                </div>

                <div>
                    <h4 className="text-sm font-semibold mb-1">Description</h4>
                    <p className="text-sm text-slate-600 whitespace-pre-line">
                        {cleanDescription}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-slate-100 rounded-lg">
                        <p className="text-xs text-slate-500">Images</p>
                        <p className="font-semibold">{imagesCount}</p>
                    </div>
                    <div className="p-3 bg-slate-100 rounded-lg">
                        <p className="text-xs text-slate-500">Variants</p>
                        <p className="font-semibold">{variantsCount}</p>
                    </div>
                </div>

                {/* Variant Table */}
                <div>
                    <h4 className="text-sm font-semibold mb-2">Variants</h4>

                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-xs">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="p-2 border-b text-left">SKU</th>
                                    <th className="p-2 border-b text-left">Barcode</th>
                                    <th className="p-2 border-b text-left">Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.variants.map((variant) => (
                                    <tr key={variant.id}>
                                        <td className="p-2 border-b">{variant.sku}</td>
                                        <td className="p-2 border-b">{variant.barcode}</td>
                                        <td className="p-2 border-b">{variant.inventory_quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="pt-3 text-right">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs rounded-lg bg-slate-900 text-white"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
