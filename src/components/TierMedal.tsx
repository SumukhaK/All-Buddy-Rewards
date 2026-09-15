import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StarIcon, LockIcon, StarOutlineIcon } from './icons';
import { colors, tierGradient, TierId } from '../theme';

type TierMedalProps = {
  tier: TierId;
  size?: number;
  /** Renders as the "not reached yet" state: outlined for the next tier, locked/greyed for tiers further out. */
  state?: 'active' | 'next' | 'locked';
};

export function TierMedal({ tier, size = 48, state = 'active' }: TierMedalProps) {
  const iconSize = Math.round(size * 0.46);

  if (state === 'locked') {
    return (
      <View style={[styles.circle, styles.locked, { width: size, height: size, borderRadius: size / 2 }]}>
        <LockIcon size={iconSize} color="#AFAEB8" />
      </View>
    );
  }

  if (state === 'next') {
    return (
      <View
        style={[
          styles.circle,
          styles.outline,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        <StarOutlineIcon size={iconSize} color={colors.magenta} />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={tierGradient[tier]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}
    >
      <StarIcon size={iconSize} color={colors.white} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.magenta,
  },
  locked: {
    backgroundColor: '#ECEBEF',
  },
});
