import { useRef, useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CloseIcon, InfoCircleIcon, QuestionCircleIcon } from './icons';
import { colors, fontFamily, fontSize, radii, spacing } from '../theme';

type InfoTooltipProps = {
  /** "question" explains a feature once; "info" explains how to finish one specific task. */
  variant?: 'question' | 'info';
  title: string;
  description: string;
  accessibilityLabel: string;
  testID?: string;
};

const TOOLTIP_WIDTH = 260;
const SCREEN_MARGIN = spacing.lg;

/**
 * A small anchored popover. Tapping the icon measures its own position on screen and opens a
 * Modal-hosted bubble near it — this avoids clipping/z-index fights with sibling cards in a
 * ScrollView, which a purely absolute-positioned tooltip would run into on some Android versions.
 */
export function InfoTooltip({
  variant = 'info',
  title,
  description,
  accessibilityLabel,
  testID,
}: InfoTooltipProps) {
  const [visible, setVisible] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const triggerRef = useRef<View>(null);

  const open = () => {
    // Show immediately so the tooltip never waits on the native measurement round-trip;
    // refine its position the moment that measurement resolves.
    setVisible(true);
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y, width, height });
    });
  };

  const close = () => setVisible(false);

  const screenWidth = Dimensions.get('window').width;
  const idealLeft = anchor.x + anchor.width / 2 - TOOLTIP_WIDTH * 0.4;
  const left = Math.max(
    SCREEN_MARGIN,
    Math.min(idealLeft, screenWidth - TOOLTIP_WIDTH - SCREEN_MARGIN),
  );
  const top = anchor.y + anchor.height + spacing.sm;
  const caretLeft = Math.max(spacing.lg, anchor.x + anchor.width / 2 - left - 6);

  return (
    <>
      <Pressable
        ref={triggerRef}
        onPress={open}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      >
        {variant === 'question' ? (
          <QuestionCircleIcon size={17} color={visible ? colors.magenta : colors.muted} />
        ) : (
          <InfoCircleIcon size={17} color={visible ? colors.magenta : colors.muted} />
        )}
      </Pressable>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={close}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={close}
          accessibilityLabel="Dismiss tooltip"
          testID={testID ? `${testID}-backdrop` : undefined}
        />
        <View style={[styles.bubble, { left, top, width: TOOLTIP_WIDTH }]}>
          <View style={[styles.caret, { left: caretLeft }]} />
          <Pressable
            onPress={close}
            hitSlop={8}
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <CloseIcon size={10} color="rgba(255,255,255,0.55)" />
          </Pressable>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    backgroundColor: colors.tooltipBg,
    borderRadius: radii.md,
    padding: spacing.md,
    paddingRight: spacing.xxl,
    shadowColor: '#140A19',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  caret: {
    position: 'absolute',
    top: -6,
    width: 12,
    height: 12,
    backgroundColor: colors.tooltipBg,
    transform: [{ rotate: '45deg' }],
    borderRadius: 2,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontFamily: fontFamily.extraBold,
    fontSize: fontSize.sm,
    marginBottom: 4,
  },
  description: {
    color: colors.white,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    lineHeight: 19,
  },
});
