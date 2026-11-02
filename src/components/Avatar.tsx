'use client';
import { useState, type ReactNode } from 'react';
import { cx, type Plume } from './cx.js';

export interface AvatarProps {
  /** Whose avatar. Gives the initials, the color and the accessible name */
  name: string;
  /** A photo or a logo. Falls back to initials if it fails to load */
  src?: string;
  /** sm 24px, md 32px, lg 40px, xl 56px. Default md */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** person: a circle. org: a rounded square, for stores, companies and connected tools. Default person */
  kind?: 'person' | 'org';
  /** The fill behind the initials. Default: picked from the name, so the same name always gets the same plume */
  tone?: Plume;
  /** Hide it from screen readers when the name is written beside it */
  decorative?: boolean;
  className?: string;
}

const tones: Plume[] = ['maroon', 'green', 'orange', 'red', 'yellow'];

/** Up to two initials: the first letters of the first and last words. "Toko Sinar Abadi" → TA */
function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const first = words[0]?.[0] ?? '';
  const last = words.length > 1 ? words[words.length - 1]![0] : '';
  return (first + last).toUpperCase();
}

function toneFor(name: string): Plume {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.codePointAt(0)!) >>> 0;
  return tones[hash % tones.length]!;
}

/**
 * A person or an organization, as a photo or as initials on a plume fill. Small, so filled: the same
 * name always gets the same color
 */
export function Avatar({ name, src, size = 'md', kind = 'person', tone, decorative, className }: AvatarProps) {
  // Remember which src failed, so a new src gets its own try
  const [failed, setFailed] = useState<string>();
  const photo = src && failed !== src;
  return (
    <span
      className={cx('cx-avatar', `cx-avatar--${size}`, `cx-avatar--${kind}`, !photo && `cx-avatar--${tone ?? toneFor(name)}`, className)}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : name}
      aria-hidden={decorative || undefined}
      title={decorative ? undefined : name}
    >
      {photo ? <img src={src} alt="" onError={() => setFailed(src)} /> : initials(name)}
    </span>
  );
}

export interface AvatarGroupProps {
  /** The avatars, in order of importance */
  children: ReactNode[];
  /** How many to show before "+3". Default 4 */
  max?: number;
  /** Names the whole group: "5 people on this workspace" */
  label: string;
  size?: AvatarProps['size'];
  className?: string;
}

/** Overlapping avatars for a team or the tools on a flow, with the rest as a feather count */
export function AvatarGroup({ children, max = 4, label, size = 'md', className }: AvatarGroupProps) {
  const shown = children.slice(0, max);
  const rest = children.length - shown.length;
  return (
    <span className={cx('cx-avatar-group', `cx-avatar-group--${size}`, className)} role="group" aria-label={label}>
      {shown}
      {rest > 0 ? <span className="cx-avatar-group__more" aria-hidden>+{rest}</span> : null}
    </span>
  );
}
