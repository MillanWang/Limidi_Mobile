# GoToMarket Steps

## TODO

- DATA
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
- APP STORE PAGE
  - Generate images of the app in use
  - make product description
