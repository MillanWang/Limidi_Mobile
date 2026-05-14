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
- DESKTOP APP
  - Styling
- LAUNCH
  - Phone-sized screen testing and theme fitting
  - Get pro version onto apple app store
  - Get free version onto apple app store with link to pro version
  - App Store readiness (from audit)
    - Confirm/replace bundle ID — currently `com.millanwang.limidi` as an auto-fix placeholder. Find-replace across `app.json` and `ios/` before registering the App ID with Apple (cannot be changed after).
    - Set real `APP_STORE_URL` in `components/PresetPaywall.tsx` once the Pro app is live on the App Store (currently `null`, which hides the upgrade button).
    - Add `ios/LiMIDI/PrivacyInfo.xcprivacy` to the Xcode target — open `ios/LiMIDI.xcworkspace`, right-click the LiMIDI group → "Add Files to LiMIDI…", select the file, ensure the LiMIDI target is checked. Without this it won't ship in the bundle.
    - Re-export `assets/images/icon.png` from source as opaque 24-bit sRGB (currently 8-bit indexed colormap).
    - Move `@rneui/themed` off the `4.0.0-rc.8` release candidate once a stable release is available.
    - Resolve remaining TODOs: `components/NetworkConfig/AddressValidationIcon.tsx:17` (error color), `components/GridEditDialog/GridEditDialogTabs/FullGridOperationButtons.tsx:26` (destructive action needs confirmation modal), `services/ScaleService.ts:48` (note-number ceiling math).
    - Accessibility sweep across grid elements and toolbar buttons — add `accessibilityLabel`/`accessibilityRole` to interactive components (`NetworkErrorIndicator` is already done).
