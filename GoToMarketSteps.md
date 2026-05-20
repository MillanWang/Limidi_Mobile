# GoToMarket Steps

## TODO

- DATA
  - Emergency backing-store reset upon load failure
  - Getting the backing store to actually be reliable. Pretty questionable in the current state with occasional resets and things not actually getting persisted
- SETTINGS
- SCALES
- COLOR
  - Add many more color presets
  - Improve color themes for grid icons
  - Audit color themes
- LAUNCH
  - Phone-sized screen testing and theme fitting
  - Get pro version onto apple app store
  - Get free version onto apple app store with link to pro version
  - App Store readiness (from audit)
    - Confirm/replace bundle ID — currently `com.millanwang.limidi` as an auto-fix placeholder. Find-replace across `app.json` and `ios/` before registering the App ID with Apple (cannot be changed after).
    - Set real `APP_STORE_URL` in `components/PresetPaywall.tsx` once the Pro app is live on the App Store (currently `null`, which hides the upgrade button).
    - Real-device VoiceOver pass before launch. Untested: whether `DrumPad` and `ControlChange` (raw `<View>` inside `<GestureDetector>`) are actually activatable by VoiceOver — `onAccessibilityTap` wired on `DrumPad`, but `ControlChange` is a draggable surface and may need `accessibilityRole="adjustable"` + `onAccessibilityAction` increment/decrement handlers if VO can't activate it. Also verify dialog focus trapping and that connection-state announcements fire as expected.
