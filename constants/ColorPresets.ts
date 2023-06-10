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

export interface ColorPreset {
  name: string,
  unpressedColor: string,
  pressedColor: string,
}



export const DEFAULT: ColorPreset = {
  name: 'Default',
  unpressedColor: '#333333', //Dark dark grey
  pressedColor: '#EEEEEE', //Light light grey
}
export const FROST: ColorPreset = {
  name: 'Frost',
  unpressedColor: '#012975',
  pressedColor: '#2ad9ed'
};
export const GRAPE: ColorPreset = {
  name: 'Grape',
  unpressedColor: '#540075',
  pressedColor: '#c047ed'
};
export const SLIME: ColorPreset = {
  name: 'Slime',
  unpressedColor: '#0e4c00',
  pressedColor: '#44ed1e'
};
export const LAVA: ColorPreset = {
  name: 'Lava',
  unpressedColor: '#4c0001',
  pressedColor: '#ed003f'
};
export const BANANA: ColorPreset = {
  name: 'Banana',
  unpressedColor: '#586600',
  pressedColor: '#e1ef00'
};
export const HULK: ColorPreset = {
  name: 'Hulk',
  unpressedColor: '#330c29',
  pressedColor: '#0eed45'
};

export const PRESET_COLOR_LIST: ColorPreset[] = [
  DEFAULT,
  FROST,
  GRAPE,
  SLIME,
  LAVA,
  BANANA,
  HULK,
]
