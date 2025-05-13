import { NameEntry } from "../types";

// 日本語名を speciesUrl から取得
export const fetchJapaneseNameFromSpeciesUrl = async (
  url: string
): Promise<string> => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const jaEntry = data.names.find(
      (n: NameEntry) => n.language.name === "ja-Hrkt"
    );
    return jaEntry?.name || "???";
  } catch (error) {
    console.warn("日本語名取得失敗:", error);
    return "???";
  }
};

export const fetchJapaneseTypeName = async (
  typeUrl: string
): Promise<string> => {
  try {
    const res = await fetch(typeUrl);
    const data = await res.json();
    const jaEntry = data.names.find(
      (entry: NameEntry) => entry.language.name === "ja-Hrkt"
    );
    return jaEntry?.name || "???";
  } catch (error) {
    console.warn("タイプの日本語名取得失敗:", error);
    return "???";
  }
};
