import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card } from '../../../components/Card';
import { PrimaryButton } from '../../../components/PrimaryButton';
import {
  CameraIcon,
  ChevronDownIcon,
  CloseIcon,
  LinkedInMark,
  PhoneIcon,
  TwitterMark,
} from '../../../components/icons';
import { colors, fontFamily, fontSize, maxContentWidth, radii, spacing } from '../../../theme';
import { RootStackParamList } from '../../../navigation/types';
import { RewardsTeaserCard } from '../../rewards/components/RewardsTeaserCard';
import { mockRewardsProfile } from '../../rewards/data/mockRewardsData';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

/**
 * Read-only for now: the rewards card is the only interactive piece this screen needs.
 * Turning the rest into a real editable form (with save/validation/persistence) is a
 * separate task — plain TextInputs here previously meant a stray tap could pop the
 * keyboard with nothing to actually submit to.
 */
const profile = {
  firstName: 'sumukha',
  lastName: 'K',
  email: 'ksa.allizzwell@gmail.com',
  phone: '9164959501',
  linkedin: '',
  twitter: '',
};

export function EditProfileScreen({ navigation }: Props) {
  const handleClose = () => {
    Alert.alert('Closed');
  };

  const handleSave = () => {
    Alert.alert('Profile saved');
  };

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <Pressable
          onPress={handleClose}
          accessibilityRole="button"
          accessibilityLabel="Close"
          hitSlop={8}
          style={styles.closeButton}
        >
          <CloseIcon size={20} color={colors.white} />
        </Pressable>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.centerColumn}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitial}>S</Text>
            </View>
            <View style={styles.avatarCam}>
              <CameraIcon size={15} color={colors.white} />
            </View>
          </View>

          <View style={styles.fieldRow}>
            <DisplayField label="First Name" required count={`${profile.firstName.length}/50`} value={profile.firstName} />
            <DisplayField label="Last Name" required count={`${profile.lastName.length}/50`} value={profile.lastName} />
          </View>

          <View style={styles.rewardsWrap}>
            <RewardsTeaserCard
              points={mockRewardsProfile.points}
              onPress={() => navigation.navigate('RewardsDetails')}
            />
          </View>

          <View style={styles.fieldSingle}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <View style={[styles.inputBox, styles.inputDisabled]}>
              <Text style={[styles.inputText, styles.inputTextDisabled]}>{profile.email}</Text>
            </View>
          </View>

          <Card style={styles.contactCard}>
            <View style={styles.cardHead}>
              <PhoneIcon size={17} color={colors.ink} />
              <Text style={styles.cardHeadText}>Contact</Text>
            </View>

            <Text style={styles.subLabel}>Phone</Text>
            <View style={styles.phoneRow}>
              <View style={styles.flagChip}>
                <View style={styles.flag}>
                  <View style={[styles.flagStripe, { backgroundColor: colors.flagSaffron }]} />
                  <View style={[styles.flagStripe, { backgroundColor: colors.flagWhite }]} />
                  <View style={[styles.flagStripe, { backgroundColor: colors.flagGreen }]} />
                </View>
                <Text style={styles.flagChipText}>IN (+91)</Text>
                <ChevronDownIcon size={12} color={colors.muted} />
              </View>
              <View style={[styles.inputBox, styles.flexInput]}>
                <Text style={styles.inputText}>{profile.phone}</Text>
              </View>
            </View>

            <Text style={styles.subLabel}>LinkedIn</Text>
            <View style={[styles.socialInput, styles.fieldGap]}>
              <View style={[styles.socialIcon, { backgroundColor: colors.linkedin }]}>
                <LinkedInMark />
              </View>
              <View style={[styles.inputBox, styles.inputWithIcon]}>
                <Text style={[styles.inputText, !profile.linkedin && styles.placeholderText]}>
                  {profile.linkedin || 'linkedin.com/in/username'}
                </Text>
              </View>
            </View>

            <Text style={styles.subLabel}>Twitter / X</Text>
            <View style={styles.socialInput}>
              <View style={[styles.socialIcon, { backgroundColor: colors.twitter }]}>
                <TwitterMark />
              </View>
              <View style={[styles.inputBox, styles.inputWithIcon]}>
                <Text style={[styles.inputText, !profile.twitter && styles.placeholderText]}>
                  {profile.twitter || 'x.com/username'}
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <View style={styles.centerColumn}>
          <PrimaryButton label="Save Changes" onPress={handleSave} testID="save-changes-button" />
        </View>
      </SafeAreaView>
    </View>
  );
}

type DisplayFieldProps = {
  label: string;
  required?: boolean;
  count: string;
  value: string;
};

function DisplayField({ label, required, count, value }: DisplayFieldProps) {
  return (
    <View style={styles.field}>
      <View style={styles.fieldLabelRow}>
        <Text style={styles.fieldLabel}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
        <Text style={styles.fieldCount}>{count}</Text>
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.inputText}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.magentaDeep,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    color: colors.white,
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  centerColumn: {
    width: '100%',
    maxWidth: maxContentWidth,
    alignSelf: 'center',
  },
  avatarWrap: {
    width: 84,
    height: 84,
    alignSelf: 'center',
    marginBottom: spacing.xxl + spacing.xs,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#4A342E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: colors.white,
    fontFamily: fontFamily.bold,
    fontSize: 32,
  },
  avatarCam: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  fieldRow: {
    flexDirection: 'row',
    gap: spacing.md + 2,
    marginBottom: spacing.xl,
  },
  rewardsWrap: {
    marginBottom: spacing.xl,
  },
  field: {
    flex: 1,
    gap: 6,
    minWidth: 0,
  },
  fieldSingle: {
    gap: 6,
    marginBottom: spacing.xl,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  fieldLabel: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.sm,
    color: colors.ink,
  },
  required: {
    color: colors.magenta,
  },
  fieldCount: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.xs,
    color: colors.muted,
  },
  inputBox: {
    height: 46,
    borderWidth: 1.4,
    borderColor: colors.line,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md + 2,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  inputText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.ink,
  },
  inputDisabled: {
    backgroundColor: '#F2F1EE',
    borderColor: '#EDEBE6',
  },
  inputTextDisabled: {
    color: '#A9ABB4',
  },
  placeholderText: {
    color: '#B7BAC4',
  },
  inputWithIcon: {
    paddingLeft: 46,
  },
  flexInput: {
    flex: 1,
  },
  contactCard: {
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingBottom: spacing.md,
    marginBottom: spacing.md + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  cardHeadText: {
    fontFamily: fontFamily.extraBold,
    fontSize: fontSize.lg,
    color: colors.ink,
  },
  subLabel: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.sm,
    color: colors.ink,
    marginBottom: 6,
  },
  phoneRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  flagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.4,
    borderColor: colors.line,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md - 2,
    height: 46,
  },
  flag: {
    width: 20,
    height: 14,
    borderRadius: 3,
    overflow: 'hidden',
  },
  flagStripe: {
    flex: 1,
  },
  flagChipText: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    color: colors.ink,
  },
  socialInput: {
    position: 'relative',
    justifyContent: 'center',
  },
  socialIcon: {
    position: 'absolute',
    left: 9,
    width: 28,
    height: 28,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  fieldGap: {
    marginBottom: spacing.lg,
  },
  footer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md + 2,
    shadowColor: '#140A19',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 6,
  },
});
