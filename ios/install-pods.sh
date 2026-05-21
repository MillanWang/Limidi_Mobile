#!/usr/bin/env bash
# Set up CocoaPods and run `pod install` for LiMIDI.
# Mirrors the "Generating the workspace" steps in XcodeSteps.md.

set -euo pipefail

cd "$(dirname "$0")"

if ! command -v brew >/dev/null 2>&1; then
  echo "Homebrew is required but was not found. Install from https://brew.sh and re-run." >&2
  exit 1
fi

if ! command -v pod >/dev/null 2>&1; then
  echo "CocoaPods not found — installing via Homebrew."
  brew install cocoapods
else
  echo "CocoaPods already installed: $(pod --version)"
fi

# `pod install` needs xcode-select to point at Xcode.app, not Command Line Tools.
# The Homebrew installer sometimes flips this.
xcode_dev_dir="$(xcode-select -p)"
if [[ "$xcode_dev_dir" != *"/Xcode.app/"* ]]; then
  echo "xcode-select points at '$xcode_dev_dir' (Command Line Tools). Switching to Xcode.app — sudo required."
  sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
fi

echo "Running pod install…"
pod install

echo
echo "Done. Note: pod install may have rewritten:"
echo "  - LiMIDI/PrivacyInfo.xcprivacy"
echo "  - LiMIDI.xcodeproj/project.pbxproj"
echo "Commit the diff if anything changed."
