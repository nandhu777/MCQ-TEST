// src/utils/random.js

// Crypto-safe random [0,1)
export function cryptoRand() {
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const u32 = new Uint32Array(1);
    window.crypto.getRandomValues(u32);
    // 2^32 -> 4294967296; use 0xFFFFFFFF for max 32-bit; avoid 1.0 edge
    return u32[0] / 0x100000000; // [0, 1)
  }
  return Math.random(); // fallback
}

// Fisher–Yates shuffle (in place) using cryptoRand
export function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(cryptoRand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Sample N unique items without replacement (dedup by id if present)
export function sampleUnique(items, n) {
  // Deduplicate by id (or question text if id is missing)
  const seen = new Set();
  const dedup = [];
  for (const q of items || []) {
    const key = q?.id ?? q?.question ?? JSON.stringify(q);
    if (!seen.has(key)) {
      seen.add(key);
      dedup.push(q);
    }
  }

  // Shuffle and slice first N
  const arr = dedup.slice();
  shuffleInPlace(arr);
  const take = Math.min(n, arr.length);
  return arr.slice(0, take);
}
