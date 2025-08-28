export enum Scale {
  Chromatic = "Chromatic",
  Ionian = "Major (Ionian)",
  Dorian = "Dorian",
  Phrygian = "Phrygian",
  Lydian = "Lydian",
  Mixolydian = "Mixolydian",
  Aeolian = "Minor (Aeolian)",
  Locrian = "Locrian",
  // Pentatonic scales
  MajorPentatonic = "Major Pentatonic", // 2,2,3,2,3
  MinorPentatonic = "Minor Pentatonic", // 3,2,2,3,2
  // Blues scales
  MajorBlues = "Major Blues", // 2,2,1,1,3,2
  MinorBlues = "Minor Blues", // 3,2,1,1,2,3
  // Harmonic scales
  HarmonicMinor = "Harmonic Minor", // 2,1,2,2,1,3,1
  HarmonicMajor = "Harmonic Major", // 2,2,1,2,1,3,1
  // Melodic scales
  MelodicMinor = "Melodic Minor", // 2,1,2,2,2,2,1
  MelodicMajor = "Melodic Major", // 2,2,1,2,2,1,2
  // Whole tone and diminished
  WholeTone = "Whole Tone", // 2,2,2,2,2,2
  Diminished = "Diminished", // 2,1,2,1,2,1,2,1
  // Exotic scales
  HungarianMinor = "Hungarian Minor", // 2,1,3,1,2,3,1
  Persian = "Persian", // 1,3,1,2,1,3,1
  JapaneseDark = "Japanese Dark", // 1, 2, 2, 1, 2, 2, 2
  JapaneseBright = "Japanese Bright", // 2, 2, 1, 2, 2, 1
  // Jazz scales
  LydianDominant = "Lydian Dominant", // 2,2,2,1,2,1,2
  Altered = "Altered", // 1,2,1,2,2,2,2
  // Modal scales
  SuperLocrian = "Super Locrian", // 1,2,1,2,2,2,2
  NeapolitanMinor = "Neapolitan Minor", // 1,2,2,2,1,3,1
}
