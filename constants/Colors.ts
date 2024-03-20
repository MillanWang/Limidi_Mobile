export interface ElementalColors {
  elementName: string;
  colorGrid: string[][];
}

export const FIRE_COLORS: ElementalColors = {
  elementName: "Fire",
  colorGrid: [
    [
      "#ffebee",
      "#ffcdd2",
      "#ef9a9a",
      "#e57373",
      "#ef5350",
      "#f44336",
      "#e53935",
      "#d32f2f",
      "#c62828",
      "#b71c1c",
    ],
    [
      "#fce4ec",
      "#f8bbd0",
      "#f48fb1",
      "#f06292",
      "#ec407a",
      "#e91e63",
      "#d81b60",
      "#c2185b",
      "#ad1457",
      "#880e4f",
    ],
    [
      "#f3e5f5",
      "#e1bee7",
      "#ce93d8",
      "#ba68c8",
      "#ab47bc",
      "#9c27b0",
      "#8e24aa",
      "#7b1fa2",
      "#6a1b9a",
      "#4a148c",
    ],
  ],
};
export const WATER_COLORS: ElementalColors = {
  elementName: "Water",
  colorGrid: [
    [
      "#e1f5fe",
      "#b3e5fc",
      "#81d4fa",
      "#4fc3f7",
      "#29b6f6",
      "#03a9f4",
      "#039be5",
      "#0288d1",
      "#0277bd",
      "#01579b",
    ],
    [
      "#e0f2f1",
      "#b2dfdb",
      "#80cbc4",
      "#4db6ac",
      "#26a69a",
      "#009688",
      "#00897b",
      "#00796b",
      "#00695c",
      "#004d40",
    ],
    [
      "#eceff1",
      "#cfd8dc",
      "#b0bec5",
      "#90a4ae",
      "#78909c",
      "#607d8b",
      "#546e7a",
      "#455a64",
      "#37474f",
      "#263238",
    ],
  ],
};
export const EARTH_COLORS: ElementalColors = {
  elementName: "Earth",
  colorGrid: [
    [
      "#e8f5e9",
      "#c8e6c9",
      "#a5d6a7",
      "#81c784",
      "#66bb6a",
      "#4caf50",
      "#43a047",
      "#388e3c",
      "#2e7d32",
      "#1b5e20",
    ],
    [
      "#f1f8e9",
      "#dcedc8",
      "#c5e1a5",
      "#aed581",
      "#9ccc65",
      "#8bc34a",
      "#7cb342",
      "#689f38",
      "#558b2f",
      "#33691e",
    ],
    [
      "#fffde7",
      "#fff9c4",
      "#fff59d",
      "#fff176",
      "#ffee58",
      "#ffeb3b",
      "#fdd835",
      "#fbc02d",
      "#f9a825",
      "#f57f17",
    ],
  ],
};
export const AIR_COLORS: ElementalColors = {
  elementName: "Air",
  colorGrid: [
    [
      "#ede7f6",
      "#d1c4e9",
      "#b39ddb",
      "#9575cd",
      "#7e57c2",
      "#673ab7",
      "#5e35b1",
      "#512da8",
      "#4527a0",
      "#311b92",
    ],
    [
      "#e8eaf6",
      "#c5cae9",
      "#9fa8da",
      "#7986cb",
      "#5c6bc0",
      "#3f51b5",
      "#3949ab",
      "#303f9f",
      "#283593",
      "#1a237e",
    ],
    [
      "#e3f2fd",
      "#bbdefb",
      "#90caf9",
      "#64b5f6",
      "#42a5f5",
      "#2196f3",
      "#1e88e5",
      "#1976d2",
      "#1565c0",
      "#0d47a1",
    ],
  ],
};

export const ALL_ELEMENTAL_COLORS: ElementalColors[] = [
  FIRE_COLORS,
  WATER_COLORS,
  EARTH_COLORS,
  AIR_COLORS,
];

export const ALL_COLOR_SERIES = {
  //Not gonna be used directly with new elemental approach

  red: [
    "#ffebee",
    "#ffcdd2",
    "#ef9a9a",
    "#e57373",
    "#ef5350",
    "#f44336",
    "#e53935",
    "#d32f2f",
    "#c62828",
    "#b71c1c",
  ],
  pink: [
    "#fce4ec",
    "#f8bbd0",
    "#f48fb1",
    "#f06292",
    "#ec407a",
    "#e91e63",
    "#d81b60",
    "#c2185b",
    "#ad1457",
    "#880e4f",
  ],
  purple: [
    "#f3e5f5",
    "#e1bee7",
    "#ce93d8",
    "#ba68c8",
    "#ab47bc",
    "#9c27b0",
    "#8e24aa",
    "#7b1fa2",
    "#6a1b9a",
    "#4a148c",
  ],

  deepPurple: [
    "#ede7f6",
    "#d1c4e9",
    "#b39ddb",
    "#9575cd",
    "#7e57c2",
    "#673ab7",
    "#5e35b1",
    "#512da8",
    "#4527a0",
    "#311b92",
  ],
  indigo: [
    "#e8eaf6",
    "#c5cae9",
    "#9fa8da",
    "#7986cb",
    "#5c6bc0",
    "#3f51b5",
    "#3949ab",
    "#303f9f",
    "#283593",
    "#1a237e",
  ],
  blue: [
    "#e3f2fd",
    "#bbdefb",
    "#90caf9",
    "#64b5f6",
    "#42a5f5",
    "#2196f3",
    "#1e88e5",
    "#1976d2",
    "#1565c0",
    "#0d47a1",
  ],

  cyan: [
    "#e1f5fe",
    "#b3e5fc",
    "#81d4fa",
    "#4fc3f7",
    "#29b6f6",
    "#03a9f4",
    "#039be5",
    "#0288d1",
    "#0277bd",
    "#01579b",
  ],
  teal: [
    "#e0f2f1",
    "#b2dfdb",
    "#80cbc4",
    "#4db6ac",
    "#26a69a",
    "#009688",
    "#00897b",
    "#00796b",
    "#00695c",
    "#004d40",
  ],
  blueGrey: [
    "#eceff1",
    "#cfd8dc",
    "#b0bec5",
    "#90a4ae",
    "#78909c",
    "#607d8b",
    "#546e7a",
    "#455a64",
    "#37474f",
    "#263238",
  ],

  green: [
    "#e8f5e9",
    "#c8e6c9",
    "#a5d6a7",
    "#81c784",
    "#66bb6a",
    "#4caf50",
    "#43a047",
    "#388e3c",
    "#2e7d32",
    "#1b5e20",
  ],
  lightGreen: [
    "#f1f8e9",
    "#dcedc8",
    "#c5e1a5",
    "#aed581",
    "#9ccc65",
    "#8bc34a",
    "#7cb342",
    "#689f38",
    "#558b2f",
    "#33691e",
  ],
  yellow: [
    "#fffde7",
    "#fff9c4",
    "#fff59d",
    "#fff176",
    "#ffee58",
    "#ffeb3b",
    "#fdd835",
    "#fbc02d",
    "#f9a825",
    "#f57f17",
  ],

  orange: [
    "#fbe9e7",
    "#ffccbc",
    "#ffab91",
    "#ff8a65",
    "#ff7043",
    "#ff5722",
    "#f4511e",
    "#e64a19",
    "#d84315",
    "#bf360c",
  ],
  brown: [
    "#efebe9",
    "#d7ccc8",
    "#bcaaa4",
    "#a1887f",
    "#8d6e63",
    "#795548",
    "#6d4c41",
    "#5d4037",
    "#4e342e",
    "#3e2723",
  ],
  grey: [
    "#fafafa",
    "#f5f5f5",
    "#eeeeee",
    "#e0e0e0",
    "#bdbdbd",
    "#9e9e9e",
    "#757575",
    "#616161",
    "#424242",
    "#212121",
  ],
};

export function invertHex(hex: string) {
  // Just trust. Don't think about how
  function padZero(str: string, len = 2) {
    return (new Array(len).join("0") + str).slice(-len);
  }
  function getColorComponent(hex: string, n: number) {
    return (255 - parseInt(hex.slice(n, n + 2), 16)).toString(16);
  }

  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }

  return (
    "#" +
    padZero(getColorComponent(hex, 0)) +
    padZero(getColorComponent(hex, 2)) +
    padZero(getColorComponent(hex, 4))
  );
}
