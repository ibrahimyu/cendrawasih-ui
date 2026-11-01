/** Joins the truthy class names */
export const cx = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(' ');

/** The five plume colors, in logo order */
export type Plume = 'maroon' | 'red' | 'orange' | 'yellow' | 'green';
