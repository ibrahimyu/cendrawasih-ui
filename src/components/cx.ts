/** Joins the truthy class names */
export const cx = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(' ');

/** The five brand roles, in plume-bar order. A brand's palette decides what each one looks like */
export type Tone = 'primary' | 'secondary' | 'tertiary' | 'spotlight' | 'accent';

/** Status colors. The system owns them, so a brand never has to supply a red or a green */
export type Status = 'success' | 'warning' | 'danger';
