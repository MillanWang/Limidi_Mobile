const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};


export interface PresetColors {
  unpressedColor: string,
  pressedColor: string,
}

export const DEFAULT_COLOR_PRESET: PresetColors = {
  unpressedColor: '#333333', //Dark dark grey
  pressedColor: '#EEEEEE', //Light light grey
}

