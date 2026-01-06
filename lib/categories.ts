import { type ClassValue } from "clsx";

export const CATEGORIES = {
  adorn: { color: "bg-[#F42495]", label: "Adorn", abbreviation: "ADORN" },
  technique: { color: "bg-[#F49524]", label: "Technique", abbreviation: "TECH" },
  posture: { color: "bg-[#18C2CD]", label: "Posture", abbreviation: "POS" },
  lead: { color: "bg-[#1873CD]", label: "Lead", abbreviation: "LEAD" },
  musicality: { color: "bg-[#9747FF]", label: "Musicality", abbreviation: "MUSIC" },
  connection: { color: "bg-purple-500", label: "Connection", abbreviation: "CONN" },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export function getCategoryData(category: string) {
  const key = category.toLowerCase() as CategoryKey;
  return CATEGORIES[key] || { color: "bg-gray-500", label: category, abbreviation: category.substring(0, 4).toUpperCase() };
}
