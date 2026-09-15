/** Design tokens lifted from the All Buddy brand (magenta/plum profile card, warm off-white ground). */
export const colors = {
  magenta: '#8B1E5C',
  magentaDeep: '#6B1548',
  magentaTint: '#FBEAF2',

  ink: '#1E2130',
  muted: '#8B92A6',
  line: '#E9E6E1',
  chip: '#EFF1F6',
  background: '#F7F6F3',
  white: '#FFFFFF',

  success: '#1F8B5C',
  successTint: '#E6F5EC',

  bronzeGradient: ['#D69A5C', '#8B5A2B'] as const,
  silverGradient: ['#E4E8ED', '#AEB6C1'] as const,
  goldGradient: ['#F4C95D', '#C68E1D'] as const,

  tooltipBg: '#1E2130',

  linkedin: '#0A66C2',
  twitter: '#0A0A0A',

  flagSaffron: '#FF9933',
  flagWhite: '#FFFFFF',
  flagGreen: '#138808',
} as const;

export type TierId = 'bronze' | 'silver' | 'gold';

export const tierGradient: Record<TierId, readonly [string, string]> = {
  bronze: colors.bronzeGradient,
  silver: colors.silverGradient,
  gold: colors.goldGradient,
};
