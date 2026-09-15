import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';

export const fontFamily = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semiBold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extraBold: 'PlusJakartaSans_800ExtraBold',
} as const;

/** System-font fallback so screens still render (just with a different face) before fonts finish loading. */
export const fontFamilyFallback = {
  regular: undefined,
  medium: undefined,
  semiBold: undefined,
  bold: undefined,
  extraBold: undefined,
} as const;

export function useAppFonts() {
  return useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });
}

export const fontSize = {
  xs: 11,
  sm: 12.5,
  md: 14.5,
  lg: 15,
  xl: 18,
  xxl: 19,
  display: 34,
} as const;
