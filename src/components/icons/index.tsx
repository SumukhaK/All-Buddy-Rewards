import Svg, { Circle, Path, Rect } from 'react-native-svg';

export type IconProps = {
  size?: number;
  color?: string;
};

const DEFAULT_SIZE = 20;

export function CloseIcon({ size = DEFAULT_SIZE, color = '#fff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 6L18 18M18 6L6 18" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function BackIcon({ size = DEFAULT_SIZE, color = '#fff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 5L8 12L15 19"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ChevronRightIcon({ size = DEFAULT_SIZE, color = '#fff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 5L16 12L9 19"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ChevronDownIcon({ size = 12, color = '#8B92A6' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 9l6 6 6-6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CameraIcon({ size = DEFAULT_SIZE, color = '#fff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 8.5C4 7.4 4.9 6.5 6 6.5H7.5L8.5 5H15.5L16.5 6.5H18C19.1 6.5 20 7.4 20 8.5V17C20 18.1 19.1 19 18 19H6C4.9 19 4 18.1 4 17V8.5Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={12.5} r={3.1} stroke={color} strokeWidth={1.6} />
    </Svg>
  );
}

export function StarIcon({ size = DEFAULT_SIZE, color = '#fff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2.5l2.72 5.68 6.28.62-4.63 4.28 1.24 6.18L12 16.9l-5.61 2.36 1.24-6.18L3 8.8l6.28-.62L12 2.5z"
        fill={color}
      />
    </Svg>
  );
}

export function StarOutlineIcon({ size = DEFAULT_SIZE, color = '#8B1E5C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2.5l2.72 5.68 6.28.62-4.63 4.28 1.24 6.18L12 16.9l-5.61 2.36 1.24-6.18L3 8.8l6.28-.62L12 2.5z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LockIcon({ size = DEFAULT_SIZE, color = '#AFAEB8' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={5} y={10.5} width={14} height={9} rx={2} stroke={color} strokeWidth={1.7} />
      <Path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke={color} strokeWidth={1.7} />
    </Svg>
  );
}

export function QuestionCircleIcon({ size = 17, color = '#8B92A6' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9.5} stroke={color} strokeWidth={1.6} />
      <Path
        d="M9.5 9.2a2.5 2.5 0 0 1 4.8.9c0 1.6-2.3 2-2.3 3.4"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <Circle cx={12} cy={16.7} r={0.9} fill={color} />
    </Svg>
  );
}

export function InfoCircleIcon({ size = 17, color = '#8B92A6' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9.5} stroke={color} strokeWidth={1.6} />
      <Path d="M12 11v5.3" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx={12} cy={8.3} r={1} fill={color} />
    </Svg>
  );
}

export function CheckIcon({ size = 12, color = '#fff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12.5L9.5 17L19 7"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PeopleIcon({ size = DEFAULT_SIZE, color = '#8B1E5C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={9} cy={8} r={3} stroke={color} strokeWidth={1.7} />
      <Path
        d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
      <Circle cx={17} cy={9} r={2.4} stroke={color} strokeWidth={1.7} />
      <Path
        d="M15.8 13.2c2.4.2 4.2 1.9 4.2 4.3"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ThumbsUpIcon({ size = DEFAULT_SIZE, color = '#8B1E5C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 11v8H4.5A1.5 1.5 0 0 1 3 17.5v-5A1.5 1.5 0 0 1 4.5 11H7Z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Path
        d="M7 11l3.6-6.2c.3-.5.9-.7 1.4-.4.9.5 1.4 1.5 1.2 2.5L12.6 10H18a2 2 0 0 1 1.9 2.7l-1.9 5A2 2 0 0 1 16.1 19H7"
        stroke={color}
        strokeWidth={1.7}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function FlameIcon({ size = DEFAULT_SIZE, color = '#8B1E5C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2.5c1 2.3-.4 3.6-1.4 4.7C9.4 8.5 8.5 9.9 8.5 12a3.5 3.5 0 0 0 7 0c0-1 .5-1.6.9-1 .8 1.1 1.1 2.4 1.1 3.5a5.5 5.5 0 1 1-11 0c0-4.2 2.7-6 3.7-8.4.5-1.2.8-2.4.8-3.6Z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PhoneIcon({ size = DEFAULT_SIZE, color = '#1E2130' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 4.5h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3c0 1-1 1.6-2 1.4A15.5 15.5 0 0 1 4.6 6.5c-.2-1 .4-2 1.4-2Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LinkedInMark({ size = 15 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <Path d="M6.94 8.5H4.56V19h2.38V8.5zM5.75 4.2A1.38 1.38 0 1 0 5.77 7a1.38 1.38 0 0 0-.02-2.8zM19.44 19h-2.37v-5.6c0-1.34-.48-2.25-1.68-2.25-.92 0-1.46.62-1.7 1.22-.09.21-.11.5-.11.8V19H11.2s.03-9.6 0-10.5h2.38v1.49c.32-.49.88-1.19 2.14-1.19 1.56 0 2.73 1.02 2.73 3.2V19z" />
    </Svg>
  );
}

export function TwitterMark({ size = 15 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <Path d="M6 5l5 6.3L6.2 19h1.8l4-4.9 3.1 4.9H19l-5.3-6.6L18.3 5h-1.8l-3.7 4.6L9.7 5H6z" />
    </Svg>
  );
}
