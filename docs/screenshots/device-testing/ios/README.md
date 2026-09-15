# iOS device testing — blocked upstream, not a local-machine limitation

This was originally going to say "can't run from Windows, needs a Mac" — that part is true, but it's no longer the actual blocker. A `.github/workflows/ios-verify.yml` workflow was built to build and screenshot the app on macOS GitHub Actions runners (public repo, so these runners are free), and it got all the way through checkout, dependency install, `expo prebuild`, and CocoaPods install every time. **The native Swift compile itself fails**, on every Xcode version available on the runner, because of a genuine incompatibility in `expo-modules-jsi@57.1.0` — the latest version published for Expo SDK 57 (as installed in this project) — not because of anything in this app's own code.

## What was tried

Four Xcode versions, each hitting a different compile error in `expo-modules-jsi`'s own source (not this app's code):

| Xcode | Swift | Result |
|---|---|---|
| 16.4 (newest 16.x on the runner) | 6.1 | **Fails before compiling anything**: `package 'apple' is using Swift tools version 6.2.0 but the installed version is 6.1.0` — the package's own `Package.swift` requires Swift tools 6.2, which no 16.x Xcode ships. |
| 26.0 (oldest 26.x on the runner) | 6.2 | Compiles further, then: `'weak' must be a mutable variable, because it may change at runtime` in `expo-modules-jsi/apple/Sources/ExpoModulesJSI/Runtime/JavaScriptActor.swift:98` (`private weak let runtime: JavaScriptRuntime?`) — invalid Swift, rejected by this compiler. |
| 26.2 | 6.2.x | `'RuntimeScheduler' cannot be annotated with either SWIFT_RETURNS_RETAINED or SWIFT_RETURNS_UNRETAINED because it is not returning a SWIFT_SHARED_REFERENCE type` in `expo-modules-jsi/apple/Sources/ExpoModulesJSI-Cxx/include/RuntimeScheduler.h:53` — a Swift/C++ interop annotation the compiler now rejects. |
| 26.3 (newest on the runner) | 6.2.x | Same `SWIFT_SHARED_REFERENCE` error as 26.2. |

So it isn't one bad Xcode pin — every version old enough to be accepted by the package's own `Package.swift` (>= 26.0) hits a real compile error in that package's Swift/C++ source, and every version new enough to compile that source correctly (16.x) is rejected by the package's declared minimum tools version. `expo-modules-jsi@57.1.0` is already the newest version published in the 57.x line (checked via `npm view expo-modules-jsi versions`), so there's no patch release to move to without leaving Expo SDK 57 entirely.

## What this means for next steps

This is an upstream gap between `expo-modules-jsi@57.1.0` and every currently-available Xcode, not something fixable by trying more Xcode point releases. Realistic paths forward, roughly in order of how much churn each one costs the rest of the app:

1. **Wait for an `expo-modules-jsi` patch** that fixes the Swift compile errors above, then just re-run the existing workflow (`.github/workflows/ios-verify.yml`, `workflow_dispatch`) — no other changes needed.
2. **Upgrade to Expo SDK 58** (58.0.1 is current as of this writing) — a bigger jump that would need the same Android verification redone, but SDK 58 is more likely to have been built/tested against current Xcode releases.
3. **Build on an actual Mac** with whatever Xcode version its maintainer already has installed and working for other RN projects — plausible that some specific combination not tried here (e.g. an exact `expo-modules-jsi` + Xcode pairing someone already has working) succeeds locally even though the four combinations tried in CI didn't.

## The workflow itself is ready to reuse

`.github/workflows/ios-verify.yml` is complete and correct as far as it got: prebuild, CocoaPods, workspace/scheme discovery, and a screenshot matrix across three iPhone sizes (SE, 15, 15 Pro Max) via `xcrun simctl`. Once the `expo-modules-jsi` compile issue is resolved by whichever path above, running it (`gh workflow run ios-verify.yml`) should produce real screenshots with no further changes to the workflow.

## Target devices (for when this unblocks)

| Device | Screen | Class |
|---|---|---|
| iPhone SE (3rd generation) | 4.7" / 750×1334 | small |
| iPhone 15 | 6.1" / 1179×2556 | medium |
| iPhone 15 Pro Max | 6.7" / 1290×2796 | large |

## Why the app itself is still a reasonable bet on iOS

None of the four failures above touch this app's own code — they're all inside `expo-modules-jsi`'s bundled Swift/C++ sources. The app itself uses no iOS- or Android-specific APIs or styling branches (no `Platform.select`, no native modules outside the standard Expo SDK — react-native-svg, expo-linear-gradient, and react-native-safe-area-context all ship first-class iOS support), and layout is done with flexbox + `SafeAreaView`/`useSafeAreaInsets`. That's still an expectation, not something verified on-device — but the blocker here is entirely in the toolchain, not in anything this app does.
