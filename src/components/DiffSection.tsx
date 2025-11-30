"use client";

import { useState } from "react";
import DiffResults from "./DiffResults";
import payload1 from "@/data/payload1.json";
import payload2 from "@/data/payload2.json";
import { DiffItem, jsonDiff } from "@/utils/diff";

export default function DiffSection() {
    const [p1Sent, setP1Sent] = useState(false);
    const [p2Sent, setP2Sent] = useState(false);
    const [diff, setDiff] = useState<DiffItem[]>([]);
    const [waiting, setWaiting] = useState(false);

    const DELAY_MS = 30000;

    const handleSendPayload1 = () => {
        if (p1Sent) return;
        setP1Sent(true);
        setWaiting(true);

        setTimeout(() => {
            setP2Sent(true);
            setWaiting(false);

            const result = jsonDiff(payload1, payload2);
            setDiff(result);
        }, DELAY_MS);
    };

    return (
        <div className="space-y-4 ">
            <header className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold">Payload Comparison</h2>

                </div>

                <button
                    onClick={handleSendPayload1}
                    disabled={p1Sent}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium disabled:opacity-60"
                >
                    {p1Sent ? "Payload 1 Sent" : "Send Payload 1"}
                </button>
            </header>

            <div className="text-xs text-slate-600 space-y-1">
                {p1Sent && <div>Payload 1 loaded.</div>}
                {waiting && <div>Waiting for Payload 2…</div>}
                {p2Sent && <div>Payload 2 loaded and diff computed.</div>}
            </div>

            {diff.length > 0 && <DiffResults diff={diff} />}
        </div>
    );
}
