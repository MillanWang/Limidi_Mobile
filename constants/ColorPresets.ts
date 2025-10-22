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
export const GRAPE: ColorPreset = {
  name: "Grape",
  primaryColor: "#540075",
  highlightColor: "#c047ed",
};
export const SLIME: ColorPreset = {
  name: "Slime",
  primaryColor: "#0e4c00",
  highlightColor: "#44ed1e",
};
export const LAVA: ColorPreset = {
  name: "Lava",
  primaryColor: "#580c1f",
  highlightColor: "#ed003f",
};
export const BANANA: ColorPreset = {
  name: "Banana",
  primaryColor: "#586600",
  highlightColor: "#e1ef00",
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

export const COSMIC: ColorPreset = {
  name: "Cosmic",
  primaryColor: "#1a0033",
  highlightColor: "#ff1493",
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

export const EMERALD_GEM: ColorPreset = {
  name: "Emerald Gem",
  primaryColor: "#064e3b",
  highlightColor: "#34d399",
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

export const TITANIUM: ColorPreset = {
  name: "Titanium",
  primaryColor: "#1f2937",
  highlightColor: "#e5e7eb",
};

export const ALUMINUM: ColorPreset = {
  name: "Aluminum",
  primaryColor: "#374151",
  highlightColor: "#d1d5db",
};

export const NICKEL: ColorPreset = {
  name: "Nickel",
  primaryColor: "#374151",
  highlightColor: "#9ca3af",
};

export const ZINC: ColorPreset = {
  name: "Zinc",
  primaryColor: "#374151",
  highlightColor: "#9ca3af",
};

export const LEAD: ColorPreset = {
  name: "Lead",
  primaryColor: "#111827",
  highlightColor: "#6b7280",
};

export const TIN: ColorPreset = {
  name: "Tin",
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

export const MARS: ColorPreset = {
  name: "Mars",
  primaryColor: "#7f1d1d",
  highlightColor: "#ef4444",
};

export const VENUS: ColorPreset = {
  name: "Venus",
  primaryColor: "#be185d",
  highlightColor: "#fbbf24",
};

export const JUPITER: ColorPreset = {
  name: "Jupiter",
  primaryColor: "#92400e",
  highlightColor: "#f59e0b",
};

export const SATURN: ColorPreset = {
  name: "Saturn",
  primaryColor: "#7c2d12",
  highlightColor: "#fbbf24",
};

export const URANUS: ColorPreset = {
  name: "Uranus",
  primaryColor: "#0d9488",
  highlightColor: "#5eead4",
};

export const NEPTUNE: ColorPreset = {
  name: "Neptune",
  primaryColor: "#1e40af",
  highlightColor: "#60a5fa",
};

export const EARTH: ColorPreset = {
  name: "Earth",
  primaryColor: "#064e3b",
  highlightColor: "#34d399",
};

export const MOON: ColorPreset = {
  name: "Moon",
  primaryColor: "#374151",
  highlightColor: "#f3f4f6",
};

export const SUN: ColorPreset = {
  name: "Sun",
  primaryColor: "#ea580c",
  highlightColor: "#fbbf24",
};

export const STAR: ColorPreset = {
  name: "Star",
  primaryColor: "#1e40af",
  highlightColor: "#fbbf24",
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

export const COMET: ColorPreset = {
  name: "Comet",
  primaryColor: "#0f172a",
  highlightColor: "#00d4ff",
};

export const METEOR: ColorPreset = {
  name: "Meteor",
  primaryColor: "#1c1917",
  highlightColor: "#f97316",
};

export const ASTEROID: ColorPreset = {
  name: "Asteroid",
  primaryColor: "#374151",
  highlightColor: "#9ca3af",
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

export const PLASMA: ColorPreset = {
  name: "Plasma",
  primaryColor: "#1a0033",
  highlightColor: "#ff1493",
};

export const ION: ColorPreset = {
  name: "Ion",
  primaryColor: "#0f172a",
  highlightColor: "#00d4ff",
};

export const ATOM: ColorPreset = {
  name: "Atom",
  primaryColor: "#1e40af",
  highlightColor: "#60a5fa",
};

export const MOLECULE: ColorPreset = {
  name: "Molecule",
  primaryColor: "#064e3b",
  highlightColor: "#34d399",
};

export const ELECTRON: ColorPreset = {
  name: "Electron",
  primaryColor: "#0f172a",
  highlightColor: "#3b82f6",
};

export const PROTON: ColorPreset = {
  name: "Proton",
  primaryColor: "#7f1d1d",
  highlightColor: "#ef4444",
};

export const NEUTRON: ColorPreset = {
  name: "Neutron",
  primaryColor: "#374151",
  highlightColor: "#9ca3af",
};

export const QUARK: ColorPreset = {
  name: "Quark",
  primaryColor: "#1a0033",
  highlightColor: "#8b5cf6",
};

export const BOSON: ColorPreset = {
  name: "Boson",
  primaryColor: "#0f172a",
  highlightColor: "#ec4899",
};

export const FERMION: ColorPreset = {
  name: "Fermion",
  primaryColor: "#1e40af",
  highlightColor: "#60a5fa",
};

export const HIGGS: ColorPreset = {
  name: "Higgs",
  primaryColor: "#000000",
  highlightColor: "#fbbf24",
};

export const GRAVITON: ColorPreset = {
  name: "Graviton",
  primaryColor: "#000000",
  highlightColor: "#374151",
};

export const PHOTON: ColorPreset = {
  name: "Photon",
  primaryColor: "#0f172a",
  highlightColor: "#fbbf24",
};

export const GLUON: ColorPreset = {
  name: "Gluon",
  primaryColor: "#7f1d1d",
  highlightColor: "#ef4444",
};

export const W_BOSON: ColorPreset = {
  name: "W Boson",
  primaryColor: "#0d9488",
  highlightColor: "#5eead4",
};

export const Z_BOSON: ColorPreset = {
  name: "Z Boson",
  primaryColor: "#1e40af",
  highlightColor: "#60a5fa",
};

export const PRESET_COLOR_LIST: ColorPreset[] = [
  DEFAULT,
  FROST,
  GRAPE,
  SLIME,
  LAVA,
  BANANA,
  HULK,
  NAVY,
  FOERST,
  SUNSET,
  OCEAN,
  COSMIC,
  AURORA,
  FIRE,
  ICE,
  CRIMSON,
  EMERALD,
  PURPLE_HAZE,
  GOLDEN,
  NEON_CYAN,
  NEON_PINK,
  NEON_GREEN,
  NEON_BLUE,
  NEON_ORANGE,
  NEON_YELLOW,
  NEON_PURPLE,
  NEON_RED,
  ELECTRIC,
  VOLCANIC,
  CRYSTAL,
  MIDNIGHT,
  DAWN,
  DUSK,
  SPRING,
  SUMMER,
  AUTUMN,
  WINTER,
  TROPICAL,
  DESERT,
  RAINFOREST,
  ARCTIC,
  SAHARA,
  AMETHYST,
  SAPPHIRE,
  RUBY,
  EMERALD_GEM,
  TOPAZ,
  GARNET,
  AQUAMARINE,
  CORAL,
  PEARL,
  ONYX,
  DIAMOND,
  COPPER,
  SILVER,
  ROSE_GOLD,
  PLATINUM,
  BRONZE,
  STEEL,
  TITANIUM,
  ALUMINUM,
  NICKEL,
  ZINC,
  LEAD,
  TIN,
  IRON,
  MERCURY,
  PLUTO,
  MARS,
  VENUS,
  JUPITER,
  SATURN,
  URANUS,
  NEPTUNE,
  EARTH,
  MOON,
  SUN,
  STAR,
  GALAXY,
  NEBULA,
  COMET,
  METEOR,
  ASTEROID,
  BLACK_HOLE,
  SUPERNOVA,
  PULSAR,
  QUASAR,
  WORMHOLE,
  DARK_MATTER,
  ANTIMATTER,
  PLASMA,
  ION,
  ATOM,
  MOLECULE,
  ELECTRON,
  PROTON,
  NEUTRON,
  QUARK,
  BOSON,
  FERMION,
  HIGGS,
  GRAVITON,
  PHOTON,
  GLUON,
  W_BOSON,
  Z_BOSON,
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
