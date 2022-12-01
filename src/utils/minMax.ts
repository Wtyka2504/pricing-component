export type MinMax = {
  min: number;
  max: number;
  curr: number;
};
export const minMax = ({ min, max, curr }: MinMax) => {
  if (curr < min) return min;
  if (curr > max) return max;
  return curr;
};
