import { GridElementColorState } from "../redux/interfaces/GridElement/GridElementColorState";

const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};

export interface ColorPreset {
  name: string;
  primaryColor: string;
  highlightColor: string;
}

export const DEFAULT: ColorPreset = {
  name: "Default",
  primaryColor: "#333333", //Dark dark grey
  highlightColor: "#EEEEEE", //Light light grey
};
export const FROST: ColorPreset = {
  name: "Frost",
  primaryColor: "#012975",
  highlightColor: "#2ad9ed",
};
export const SLIME: ColorPreset = {
  name: "Slime",
  primaryColor: "#0e4c00",
  highlightColor: "#44ed1e",
};
export const HULK: ColorPreset = {
  name: "Hulk",
  primaryColor: "#330c29",
  highlightColor: "#0eed45",
};

export const NAVY: ColorPreset = {
  name: "Navy",
  primaryColor: "#00203d",
  highlightColor: "#2ad9ed",
};

export const FOERST: ColorPreset = {
  name: "Forest",
  primaryColor: "#132a13",
  highlightColor: "#70e000",
};

export const SUNSET: ColorPreset = {
  name: "Sunset",
  primaryColor: "#1a0b3d",
  highlightColor: "#ff6b35",
};

export const OCEAN: ColorPreset = {
  name: "Ocean",
  primaryColor: "#0d1b2a",
  highlightColor: "#219ebc",
};

export const AURORA: ColorPreset = {
  name: "Aurora",
  primaryColor: "#0f2027",
  highlightColor: "#2dd4bf",
};

export const FIRE: ColorPreset = {
  name: "Fire",
  primaryColor: "#2d1810",
  highlightColor: "#ff4500",
};

export const ICE: ColorPreset = {
  name: "Ice",
  primaryColor: "#0c4a6e",
  highlightColor: "#bae6fd",
};

export const CRIMSON: ColorPreset = {
  name: "Crimson",
  primaryColor: "#3d0000",
  highlightColor: "#dc2626",
};

export const EMERALD: ColorPreset = {
  name: "Emerald",
  primaryColor: "#064e3b",
  highlightColor: "#10b981",
};

export const PURPLE_HAZE: ColorPreset = {
  name: "Purple Haze",
  primaryColor: "#581c87",
  highlightColor: "#a855f7",
};

export const GOLDEN: ColorPreset = {
  name: "Golden",
  primaryColor: "#451a03",
  highlightColor: "#f59e0b",
};

export const NEON_CYAN: ColorPreset = {
  name: "Neon Cyan",
  primaryColor: "#083344",
  highlightColor: "#06ffa5",
};

export const NEON_PINK: ColorPreset = {
  name: "Neon Pink",
  primaryColor: "#4c1d95",
  highlightColor: "#ec4899",
};

export const NEON_GREEN: ColorPreset = {
  name: "Neon Green",
  primaryColor: "#14532d",
  highlightColor: "#22c55e",
};

export const NEON_BLUE: ColorPreset = {
  name: "Neon Blue",
  primaryColor: "#1e3a8a",
  highlightColor: "#3b82f6",
};

export const NEON_ORANGE: ColorPreset = {
  name: "Neon Orange",
  primaryColor: "#7c2d12",
  highlightColor: "#f97316",
};

export const NEON_YELLOW: ColorPreset = {
  name: "Neon Yellow",
  primaryColor: "#713f12",
  highlightColor: "#eab308",
};

export const NEON_PURPLE: ColorPreset = {
  name: "Neon Purple",
  primaryColor: "#581c87",
  highlightColor: "#8b5cf6",
};

export const NEON_RED: ColorPreset = {
  name: "Neon Red",
  primaryColor: "#7f1d1d",
  highlightColor: "#ef4444",
};

export const ELECTRIC: ColorPreset = {
  name: "Electric",
  primaryColor: "#0f172a",
  highlightColor: "#00d4ff",
};

export const VOLCANIC: ColorPreset = {
  name: "Volcanic",
  primaryColor: "#1c1917",
  highlightColor: "#ff3c00",
};

export const CRYSTAL: ColorPreset = {
  name: "Crystal",
  primaryColor: "#1e293b",
  highlightColor: "#60a5fa",
};

export const MIDNIGHT: ColorPreset = {
  name: "Midnight",
  primaryColor: "#0f0f23",
  highlightColor: "#8b5cf6",
};

export const DAWN: ColorPreset = {
  name: "Dawn",
  primaryColor: "#2d1b69",
  highlightColor: "#fbbf24",
};

export const DUSK: ColorPreset = {
  name: "Dusk",
  primaryColor: "#1e1b4b",
  highlightColor: "#f59e0b",
};

export const SPRING: ColorPreset = {
  name: "Spring",
  primaryColor: "#14532d",
  highlightColor: "#84cc16",
};

export const SUMMER: ColorPreset = {
  name: "Summer",
  primaryColor: "#ea580c",
  highlightColor: "#fbbf24",
};

export const AUTUMN: ColorPreset = {
  name: "Autumn",
  primaryColor: "#7c2d12",
  highlightColor: "#f59e0b",
};

export const WINTER: ColorPreset = {
  name: "Winter",
  primaryColor: "#1e40af",
  highlightColor: "#e0e7ff",
};

export const TROPICAL: ColorPreset = {
  name: "Tropical",
  primaryColor: "#0d9488",
  highlightColor: "#34d399",
};

export const DESERT: ColorPreset = {
  name: "Desert",
  primaryColor: "#92400e",
  highlightColor: "#fde047",
};

export const RAINFOREST: ColorPreset = {
  name: "Rainforest",
  primaryColor: "#064e3b",
  highlightColor: "#6ee7b7",
};

export const ARCTIC: ColorPreset = {
  name: "Arctic",
  primaryColor: "#0c4a6e",
  highlightColor: "#a5f3fc",
};

export const SAHARA: ColorPreset = {
  name: "Sahara",
  primaryColor: "#a16207",
  highlightColor: "#fef3c7",
};

export const AMETHYST: ColorPreset = {
  name: "Amethyst",
  primaryColor: "#581c87",
  highlightColor: "#c084fc",
};

export const SAPPHIRE: ColorPreset = {
  name: "Sapphire",
  primaryColor: "#1e40af",
  highlightColor: "#60a5fa",
};

export const RUBY: ColorPreset = {
  name: "Ruby",
  primaryColor: "#7f1d1d",
  highlightColor: "#f87171",
};

export const TOPAZ: ColorPreset = {
  name: "Topaz",
  primaryColor: "#92400e",
  highlightColor: "#fbbf24",
};

export const GARNET: ColorPreset = {
  name: "Garnet",
  primaryColor: "#7f1d1d",
  highlightColor: "#dc2626",
};

export const AQUAMARINE: ColorPreset = {
  name: "Aquamarine",
  primaryColor: "#0d9488",
  highlightColor: "#5eead4",
};

export const CORAL: ColorPreset = {
  name: "Coral",
  primaryColor: "#be185d",
  highlightColor: "#fb7185",
};

export const PEARL: ColorPreset = {
  name: "Pearl",
  primaryColor: "#374151",
  highlightColor: "#f3f4f6",
};

export const ONYX: ColorPreset = {
  name: "Onyx",
  primaryColor: "#111827",
  highlightColor: "#6b7280",
};

export const DIAMOND: ColorPreset = {
  name: "Diamond",
  primaryColor: "#1f2937",
  highlightColor: "#e5e7eb",
};

export const COPPER: ColorPreset = {
  name: "Copper",
  primaryColor: "#92400e",
  highlightColor: "#f59e0b",
};

export const SILVER: ColorPreset = {
  name: "Silver",
  primaryColor: "#374151",
  highlightColor: "#d1d5db",
};

export const ROSE_GOLD: ColorPreset = {
  name: "Rose Gold",
  primaryColor: "#be185d",
  highlightColor: "#fbbf24",
};

export const PLATINUM: ColorPreset = {
  name: "Platinum",
  primaryColor: "#374151",
  highlightColor: "#f9fafb",
};

export const BRONZE: ColorPreset = {
  name: "Bronze",
  primaryColor: "#92400e",
  highlightColor: "#d97706",
};

export const STEEL: ColorPreset = {
  name: "Steel",
  primaryColor: "#374151",
  highlightColor: "#9ca3af",
};

export const IRON: ColorPreset = {
  name: "Iron",
  primaryColor: "#374151",
  highlightColor: "#6b7280",
};

export const MERCURY: ColorPreset = {
  name: "Mercury",
  primaryColor: "#374151",
  highlightColor: "#e5e7eb",
};

export const PLUTO: ColorPreset = {
  name: "Pluto",
  primaryColor: "#1f2937",
  highlightColor: "#9ca3af",
};

export const GALAXY: ColorPreset = {
  name: "Galaxy",
  primaryColor: "#1a0033",
  highlightColor: "#8b5cf6",
};

export const NEBULA: ColorPreset = {
  name: "Nebula",
  primaryColor: "#0f172a",
  highlightColor: "#ec4899",
};

export const METEOR: ColorPreset = {
  name: "Meteor",
  primaryColor: "#1c1917",
  highlightColor: "#f97316",
};

export const BLACK_HOLE: ColorPreset = {
  name: "Black Hole",
  primaryColor: "#000000",
  highlightColor: "#ff1493",
};

export const SUPERNOVA: ColorPreset = {
  name: "Supernova",
  primaryColor: "#0f172a",
  highlightColor: "#fbbf24",
};

export const PULSAR: ColorPreset = {
  name: "Pulsar",
  primaryColor: "#1a0033",
  highlightColor: "#00d4ff",
};

export const QUASAR: ColorPreset = {
  name: "Quasar",
  primaryColor: "#0f172a",
  highlightColor: "#8b5cf6",
};

export const WORMHOLE: ColorPreset = {
  name: "Wormhole",
  primaryColor: "#000000",
  highlightColor: "#ec4899",
};

export const DARK_MATTER: ColorPreset = {
  name: "Dark Matter",
  primaryColor: "#000000",
  highlightColor: "#374151",
};

export const ANTIMATTER: ColorPreset = {
  name: "Antimatter",
  primaryColor: "#000000",
  highlightColor: "#fbbf24",
};

export const PRESET_COLOR_LIST: ColorPreset[] = [
  // Top tier: Highest contrast with dark primary colors
  ANTIMATTER,
  DIAMOND,
  DEFAULT,
  PULSAR,
  HULK,
  SUPERNOVA,
  NEON_CYAN,
  ELECTRIC,
  PLATINUM,
  NAVY,
  PEARL,
  FOERST,
  AURORA,
  DAWN,
  MERCURY,
  FROST,
  ARCTIC,
  DUSK,
  ICE,
  WINTER,

  // Second tier: Good contrast and visual appeal
  SILVER,
  GOLDEN,
  SLIME,
  SUNSET,
  RAINFOREST,
  METEOR,
  WORMHOLE,
  PLUTO,
  BLACK_HOLE,
  CRYSTAL,
  MIDNIGHT,
  OCEAN,
  FIRE,
  CRIMSON,
  EMERALD,
  PURPLE_HAZE,
  NEON_PINK,
  NEON_GREEN,
  NEON_BLUE,
  NEON_ORANGE,
  NEON_YELLOW,
  NEON_PURPLE,
  NEON_RED,
  VOLCANIC,
  SPRING,
  SUMMER,
  AUTUMN,
  TROPICAL,
  DESERT,
  SAHARA,
  AMETHYST,
  SAPPHIRE,
  RUBY,
  TOPAZ,
  GARNET,
  AQUAMARINE,
  CORAL,
  ONYX,
  COPPER,
  ROSE_GOLD,
  BRONZE,
  STEEL,
  IRON,
  GALAXY,
  NEBULA,
  QUASAR,
  DARK_MATTER,
];

export const arePresetsEqual = (
  preset1: GridElementColorState,
  preset2: GridElementColorState
): boolean => {
  return (
    preset1.highlightColor === preset2.highlightColor &&
    preset1.primaryColor === preset2.primaryColor
  );
};
