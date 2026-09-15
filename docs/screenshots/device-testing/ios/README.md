# iOS device testing — not runnable from this machine

This folder is a placeholder. Testing on iOS requires **macOS + Xcode** to run the iOS Simulator — there is no way to launch or screenshot an iOS Simulator from Windows, and no free cloud substitute that gives a real simulator UI to capture. This repo was developed and verified on a Windows machine, so the iOS side hasn't been visually verified on-device yet.

## Target devices (once Mac access is available)

The same 3-tier size spread used for the Android verification:

| Device | Screen | Class |
|---|---|---|
| iPhone SE (3rd gen) | 4.7" / 750×1334 | small |
| iPhone 15 | 6.1" / 1179×2556 | medium |
| iPhone 15 Pro Max | 6.7" / 1290×2796 | large |

## How to actually run this

On a Mac with Xcode installed:

```bash
npm install
npx expo run:ios --device "iPhone SE (3rd generation)"
npx expo run:ios --device "iPhone 15"
npx expo run:ios --device "iPhone 15 Pro Max"
```

(Or `npm start` then press `i` and pick a simulator from Xcode's device list.) Capture each of the 3 screens the same way the Android set was captured — Edit Profile, Rewards Details (In Progress tab), Rewards Details (Completed tab) — and drop them into sibling folders here (e.g. `iphone-se-4.7in-small/`, `iphone-15-6.1in-medium/`, `iphone-15-pro-max-6.7in-large/`) to match the Android layout.

## Why this should be low-risk

The app doesn't use any iOS- or Android-specific APIs or styling branches — no `Platform.select`, no native modules outside the standard Expo SDK (react-native-svg, expo-linear-gradient, react-native-safe-area-context all ship first-class iOS support), and layout is done with flexbox + `SafeAreaView`/`useSafeAreaInsets` rather than hardcoded platform values. It's reasonable to expect it renders correctly on iOS, but that's an expectation, not something this session verified — it should still be checked on real Simulator/device before calling iOS done.
