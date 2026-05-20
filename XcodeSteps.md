# Xcode Steps

Manual tasks that must be performed in `ios/LiMIDI.xcworkspace` before App Store submission. Code-only TODOs live in [GoToMarketSteps.md](./GoToMarketSteps.md).

## Verify `PrivacyInfo.xcprivacy` is bundled

`ios/LiMIDI/PrivacyInfo.xcprivacy` was added to the LiMIDI target by editing `ios/LiMIDI.xcodeproj/project.pbxproj` directly (not via the Xcode GUI). Confirm it actually ships in the .app before submitting:

1. Open `ios/LiMIDI.xcworkspace` in Xcode.
2. Select the **LiMIDI** target → **Build Phases** → **Copy Bundle Resources**. `PrivacyInfo.xcprivacy` should be in the list.
3. Belt-and-braces: Product → Archive. In Organizer, right-click the archive → Show in Finder → Show Package Contents → `Products/Applications/LiMIDI.app/` should contain `PrivacyInfo.xcprivacy` at the bundle root.

If the file is missing from Copy Bundle Resources, remove the pbxproj edits and re-add via Xcode: right-click the LiMIDI group → "Add Files to LiMIDI…" → select the file → ensure the LiMIDI target is checked.

## Signing & bundle identifier

Do this **after** finalizing the bundle ID in `app.json` and `ios/` (currently `com.millanwang.limidi` as a placeholder — cannot be changed after App ID registration with Apple).

1. Register the final App ID in App Store Connect.
2. In Xcode: select the **LiMIDI** target → **Signing & Capabilities**.
3. Set **Team** to the Apple Developer team for this app.
4. Confirm **Bundle Identifier** matches the registered App ID exactly.
5. Confirm Automatic signing is enabled (or set provisioning profiles manually if using manual signing).

## Archive and upload to App Store Connect

1. In the scheme/destination selector (top of window), choose **Any iOS Device (arm64)**.
2. Product → **Archive**. Wait for the build to complete.
3. Window → **Organizer** opens automatically when the archive succeeds.
4. Select the archive → **Distribute App** → **App Store Connect** → **Upload**.
5. Accept the default options through the wizard. Wait for processing in App Store Connect (usually 10–30 minutes) before submitting for review.

## On-device testing before submission

These must happen on real hardware, not the simulator:

- **VoiceOver pass.** See [GoToMarketSteps.md](./GoToMarketSteps.md) for the specific concerns around `DrumPad` and `ControlChange` activation, dialog focus trapping, and connection-state announcements.
- **Phone-sized screen testing.** Current development has been iPad-heavy; verify theme fitting and layout on a small phone (iPhone SE / iPhone 13 mini class).
- **Camera + local-network permissions.** First-run permission prompts should appear with the strings from `app.json` (`NSCameraUsageDescription`, `NSLocalNetworkUsageDescription`). Verify QR-code scanning and desktop-app connection actually work end-to-end on the device.
