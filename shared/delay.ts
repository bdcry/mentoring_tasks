export function resolvedDelay(ms: number, value: unknown) {
    return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function rejectedDelay(ms: number, value: unknown) {
    return new Promise((resolve, reject) => setTimeout(() => reject(value), ms));
}