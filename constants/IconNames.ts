import { ControlChangeDirection } from "../components/GridElement/GridElementEditDialog/GridElementEditDialogTabs/useControlChangeIndexController";

export const horizontalIconNamesIonicon = [
  "swap-horizontal",
  "code-outline",
  "code-slash-outline",
];

export const verticalIconNamesIonicon = [
  "swap-vertical",
  "chevron-up",
  // "chevron-expand"
];

export const xyIconNamesIonicon = [
  "repeat",
  "resize",
  "move",
  "expand",
  "contract",
];

export const ioniconValidIconNames = [
  "logo-bitcoin",
  "logo-euro",
  "logo-no-smoking",
  "logo-chrome",
  "logo-apple",
  "logo-android",
  "logo-react",
  "logo-tux",
  "logo-usd",
  "logo-nodejs",
  "logo-javascript",
  "logo-yen",
  "medical",
  "nuclear",
  "planet",
  "pulse",
  "qr-code",
  "rainy",
  "reload",
  "shield",
  "cash",
  "snow",
  "skull",
  "star",
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
  "code-slash",
  "compass",
  "attach-outline",
  "cube",
  "repeat",
  "paw",
  "rocket",
  "earth",
  "expand",
  "flash",
  "git-compare",
  "hardware-chip-outline",
  "infinite",
  "leaf",
  "finger-print",
];

export const ioniconIconNameAliases: Record<string, string> = {
  "logo-usd": "USD",
  "hardware-chip-outline": "CPU",
  "logo-no-smoking": "No Smoke",
  "qr-code": "QR",
  "git-compare": "Compare",
  "finger-print": "Touch",
  "swap-horizontal": "Horizontal",
  "swap-vertical": "Vertical",
  "musical-note": "Note",
  "musical-notes": "Notes",
} as const;

export const iconNames: Record<ControlChangeDirection, string[]> = {
  horizontal: horizontalIconNamesIonicon,
  vertical: verticalIconNamesIonicon,
  xy: xyIconNamesIonicon,
};
