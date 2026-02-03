import { GridElementColorState } from "../redux/interfaces/GridElement/GridElementColorState";

export interface ColorPreset {
  name: string;
  primaryColor: string;
  highlightColor: string;
}

export const DEFAULT: ColorPreset = {
  name: "Default",
  primaryColor: "#232323",
  highlightColor: "#EEEEEE",
};

export const TERMINAL: ColorPreset = {
  name: "Terminal",
  primaryColor: "#330c29",
  highlightColor: "#0eed45",
};

export const PRESET_COLOR_LIST: ColorPreset[] = [
  DEFAULT,
  { name: "Aurora", primaryColor: "#0f2027", highlightColor: "#2dd4bf" },
  { name: "Sunset", primaryColor: "#1a0b3d", highlightColor: "#ff6b35" },
  { name: "Volcanic", primaryColor: "#1c1917", highlightColor: "#ff3c00" },
  { name: "Ocean", primaryColor: "#0d1b2a", highlightColor: "#219ebc" },
  { name: "Forest", primaryColor: "#002005", highlightColor: "#3be23d" },
  TERMINAL,
  { name: "Crimson", primaryColor: "#3d0000", highlightColor: "#dc2626" },
  { name: "Navy", primaryColor: "#00203d", highlightColor: "#2ad9ed" },
  { name: "Emerald", primaryColor: "#064e3b", highlightColor: "#10b981" },
  { name: "Radioactive", primaryColor: "#083344", highlightColor: "#06ffa5" },
  { name: "Electric", primaryColor: "#0f172a", highlightColor: "#00d4ff" },
  { name: "Crystal", primaryColor: "#1e293b", highlightColor: "#60a5fa" },
  { name: "Arctic", primaryColor: "#0c4a6e", highlightColor: "#a5f3fc" },
  { name: "Nebula", primaryColor: "#0f172a", highlightColor: "#ec4899" },
  { name: "Meteor", primaryColor: "#1c1917", highlightColor: "#f97316" },
  { name: "Supernova", primaryColor: "#0f172a", highlightColor: "#fbbf24" },
  { name: "Quasar", primaryColor: "#0f172a", highlightColor: "#8b5cf6" },
  { name: "Pulsar", primaryColor: "#1a0033", highlightColor: "#00d4ff" },
  { name: "Black Hole", primaryColor: "#000000", highlightColor: "#ff1493" },
  { name: "Wormhole", primaryColor: "#000000", highlightColor: "#ec4899" },
  { name: "Dark Matter", primaryColor: "#000000", highlightColor: "#374151" },
  { name: "Onyx", primaryColor: "#111827", highlightColor: "#6b7280" },
  { name: "Diamond", primaryColor: "#1f2937", highlightColor: "#e5e7eb" },
  { name: "Platinum", primaryColor: "#374151", highlightColor: "#f9fafb" },
  { name: "Copper", primaryColor: "#26170a", highlightColor: "#f59e0b" },
  { name: "Gold", primaryColor: "#000000", highlightColor: "#fbbf24" },
  { name: "Rose Gold", primaryColor: "#010101", highlightColor: "#E0BFB8" },
];

export const arePresetsEqual = (
  preset1: GridElementColorState,
  preset2: GridElementColorState,
): boolean => {
  return (
    preset1.highlightColor === preset2.highlightColor &&
    preset1.primaryColor === preset2.primaryColor
  );
};
