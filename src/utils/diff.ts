/* eslint-disable @typescript-eslint/no-explicit-any */
export type DiffItem = {
	type: "added" | "removed" | "changed";
	path: string;
	oldValue: any;
	newValue: any;
};
export function deepEqual(a: any, b: any): boolean {
	if (a === b) return true;

	if (a === null || b === null) return a === b;

	if (typeof a !== typeof b) return false;

	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) {
			if (!deepEqual(a[i], b[i])) return false;
		}
		return true;
	}

	if (typeof a === "object") {
		const aKeys = Object.keys(a);
		const bKeys = Object.keys(b);

		if (aKeys.length !== bKeys.length) return false;

		for (const key of aKeys) {
			if (!deepEqual(a[key], b[key])) return false;
		}
		return true;
	}

	return a === b;
}

export function jsonDiff(a: any, b: any, path = "") {
	const diffs: any[] = [];

	if (deepEqual(a, b)) {
		return diffs;
	}

	if (
		typeof a !== "object" ||
		typeof b !== "object" ||
		a === null ||
		b === null
	) {
		diffs.push({
			type: "changed",
			path,
			oldValue: a,
			newValue: b,
		});
		return diffs;
	}

	const keys = new Set([...Object.keys(a), ...Object.keys(b)]);

	for (const key of keys) {
		const newPath = path ? `${path}.${key}` : key;

		if (!(key in a)) {
			diffs.push({
				type: "added",
				path: newPath,
				oldValue: null,
				newValue: b[key],
			});
			continue;
		}

		if (!(key in b)) {
			diffs.push({
				type: "removed",
				path: newPath,
				oldValue: a[key],
				newValue: null,
			});
			continue;
		}

		diffs.push(...jsonDiff(a[key], b[key], newPath));
	}

	return diffs;
}
