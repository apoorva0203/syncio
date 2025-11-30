/* eslint-disable @typescript-eslint/no-explicit-any */
import { DiffItem } from "@/utils/diff";


export default function DiffResults({ diff }: { diff: DiffItem[] }) {
    const format = (v: any) => {
        if (v === null || v === undefined) return "";
        if (typeof v === "object") return JSON.stringify(v, null, 2);
        return String(v);
    };

    const rowClass = (type: DiffItem["type"]) => {
        if (type === "added") return "bg-emerald-50";
        if (type === "removed") return "bg-rose-50";
        if (type === "changed") return "bg-amber-50";
        return "bg-white";
    };

    return (
        <div className="mt-4 border rounded-lg overflow-hidden  text-black">
            <table className="w-full text-xs z-10">
                <thead className="bg-slate-100">
                    <tr>
                        <th className="border-b px-2 py-2 text-left">Type</th>
                        <th className="border-b px-2 py-2 text-left">Old</th>
                        <th className="border-b px-2 py-2 text-left">New</th>
                    </tr>
                </thead>
                <tbody>
                    {diff.map((item, idx) => (
                        <tr key={idx} className={rowClass(item.type)}>
                            <td className="border-t px-2 py-1 capitalize">{item.type}</td>
                            <td className="border-t px-2 py-1 whitespace-pre-wrap">
                                {format(item.oldValue)}
                            </td>
                            <td className="border-t px-2 py-1 whitespace-pre-wrap">
                                {format(item.newValue)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
