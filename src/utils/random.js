export function sampleWithoutReplacement(arr, n) {
  const a = arr.slice(); // do not mutate original bank
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]; // shuffle in-place
  }
  return a.slice(0, Math.min(n, a.length));
}
