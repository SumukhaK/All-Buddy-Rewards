# Device size verification

The app run live (via Expo Go) on three Android emulators spanning small, medium, and large screens, to confirm the rewards UI holds up across real device sizes rather than just the one phone it was designed against. Each folder has the same 3 screenshots: Edit Profile (rewards teaser), Rewards Details — In Progress, Rewards Details — Completed.

## Android — verified

| Folder | Device | Screen |
|---|---|---|
| [`android/small-5.1in-wvga-480x800`](android/small-5.1in-wvga-480x800) | Generic 5.1" phone (closest available stand-in — the Android SDK doesn't ship real Motorola device skins, only Google/generic reference profiles) | 5.1" / 480×800 |
| [`android/medium-pixel6a-6.1in-1080x2400`](android/medium-pixel6a-6.1in-1080x2400) | Pixel 6a | 6.1" / 1080×2400 |
| [`android/large-pixel6pro-6.7in-1440x3120`](android/large-pixel6pro-6.7in-1440x3120) | Pixel 6 Pro | 6.7" / 1440×3120 |

All three rendered correctly: no clipped text, no overlapping elements, the rewards card and milestone list scale cleanly, and the fixed header/footer plus scrollable middle section hold their layout at every size. The small 480×800 screen was the real test — everything stayed legible and nothing overflowed.

## iOS — attempted via CI, blocked upstream

A GitHub Actions workflow ([`.github/workflows/ios-verify.yml`](../../../.github/workflows/ios-verify.yml)) was built to build and screenshot the app on macOS runners, since this dev machine has no Xcode. It got through checkout, dependency install, `expo prebuild`, and CocoaPods every time, but the native Swift compile fails on **every** Xcode version tried (16.4, 26.0, 26.2, 26.3) with real compile errors inside `expo-modules-jsi@57.1.0` itself (the latest version published for Expo SDK 57) — not in this app's code. See [`ios/README.md`](ios/README.md) for the exact errors on each Xcode version and what unblocks it.
