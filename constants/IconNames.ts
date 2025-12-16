import { ControlChangeDirection } from "../components/GridElement/GridElementEditDialog/GridElementEditDialogTabs/useControlChangeIndexController";

export const horizontalIconNamesIonicon = [
  "swap-horizontal",
  "code-outline",
  "code-slash",
];

export const verticalIconNamesIonicon = [
  "swap-vertical",
  "chevron-up",
  "chevron-expand",
];

export const xyIconNamesIonicon = [
  "repeat",
  "resize",
  "move",
  "expand",
  "contract",
];

export const ioniconValidIconNames = [
  "finger-print",
  "logo-react",
  "shield",
  "snow",
  "skull",
  "star",
  "medical",
  "nuclear",
  "planet",
  "pulse",
  "qr-code",
  "rainy",
  "reload",
  "sync",
  "terminal",
  "trophy",
  "water",
  "wifi",
  "wine",
  "eye",
  "film",
  "flash",
  "musical-note",
  "musical-notes",
  "flash-off",
  "key",
  "mic",
  "beer",
  "grid",
  "aperture",
  "bug",
  "compass",
  "attach-outline",
  "cube",
  "paw",
  "rocket",
  "earth",
  "hardware-chip-outline",
  "infinite",
  "expand",
  "flash",
  "git-compare",
  "leaf",

  "cash",
  "logo-bitcoin",
  "logo-euro",
  "logo-usd",
  "logo-yen",
];

export const ioniconIconNameAliases: Record<string, string> = {
  "logo-usd": "USD",
  "hardware-chip-outline": "CPU",
  "qr-code": "QR",
  medical: "Asterisk",
  "git-compare": "Compare",
  "finger-print": "Touch",
  "swap-horizontal": "Horizontal",
  "swap-vertical": "Vertical",
  "musical-note": "Note",
  "musical-notes": "Notes",
  "attach-outline": "Paperclip",
  "chevron-up": "Up",
  "chevron-expand": "Chevrons",
  "code-outline": "Chevrons",
} as const;

export const iconNames: Record<ControlChangeDirection, string[]> = {
  Horizontal: horizontalIconNamesIonicon,
  Vertical: verticalIconNamesIonicon,
  XY: xyIconNamesIonicon,
};
