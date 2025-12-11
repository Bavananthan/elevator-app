export const FLOORS = [0, 1, 2, 3, 4] as const;
export type Floor = (typeof FLOORS)[number];

export const MIN_FLOOR = 0;
export const MAX_FLOOR = 4;
