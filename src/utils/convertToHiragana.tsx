export function toHiragana(str: string): string {
  return str
    .replace(/[ァ-ン]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0x60))
    .normalize("NFKC");
}
