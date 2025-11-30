/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { jsonDiff } from "@/utils/diff";
import payload1 from "@/data/payload1.json";
import payload2 from "@/data/payload2.json";
import DiffResults from "../components/DiffResults";

export default function DiffPage() {
    const [p1Sent, setP1Sent] = useState(false);
    const [p2Sent, setP2Sent] = useState(false);
    const [diff, setDiff] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const DELAY = 30000;

    function sendPayload1() {
        setP1Sent(true);
        setLoading(true);

        setTimeout(() => {
            sendPayload2();
        }, DELAY);
    }

    function sendPayload2() {
        setP2Sent(true);
        setLoading(false);

        const result = jsonDiff(payload1, payload2);
        setDiff(result);
    }

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-semibold">Payload Diff</h1>

            <button
                onClick={sendPayload1}
                disabled={p1Sent}
                className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
                {p1Sent ? "Payload 1 Sent" : "Send Payload 1"}
            </button>

            <div className="text-sm">
                {p1Sent && "Payload 1 Loaded"}
                {p2Sent && <div>Payload 2 Loaded & Compared</div>}
            </div>

            {loading && <p>Waiting for second payload…</p>}

            {diff.length > 0 && <DiffResults diff={diff} />}
        </div>
    );
}
