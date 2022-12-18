type RangeSliderProps<
  Target extends HTMLElement,
  Wrapper extends HTMLElement
> = {
  target: Target;
  wrapper?: Wrapper;
  steps?: number;
  min?: number;
  max?: number;
  closest?: boolean;
  value?: number;
  onStart?: () => void;
  onMove?: (props: RangeSliderResult) => void;
  onEnd?: (props: RangeSliderResult) => void;
  onInit?: (props: RangeSliderResult) => void;
};
export type RangeSliderResult = {
  relativeX: number;
  total: number;
  value: number;
  step: number;
};
const countValueFromPercents = (percents: number, maxValue: number) =>
  (maxValue * percents) / 100;
const countPercentsFromValue = (value: number, maxValue: number) =>
  (value * 100) / maxValue;
const minMaxValue = (min: number, curr: number, max: number) =>
  min > curr ? min : curr > max ? max : curr;
const isTouchEvent = (e: TouchEvent | MouseEvent): e is TouchEvent => {
  return e && "touches" in e;
};
const isMouseEvent = (e: TouchEvent | MouseEvent): e is TouchEvent => {
  return e && "clientX" in e;
};
export function useRangeSlider<
  Target extends HTMLElement,
  Wrapper extends HTMLElement
>({
  target,
  wrapper,
  steps,
  min,
  max,
  closest,
  value,
  onMove,
  onStart,
  onEnd,
  onInit,
}: RangeSliderProps<Target, Wrapper>) {
  if (wrapper === undefined) wrapper = document.body as Wrapper;
  if (min === undefined) min = 1;
  if (max === undefined) max = 100;
  if (closest === undefined) closest = false;
  if (steps === undefined) steps = (max - min) / max;

  const step = Math.floor((max - min) / steps);
  const stepsValuesPer = Array.from({ length: step + 1 }, (_, i) => i * steps!);
  const maxValue = stepsValuesPer[stepsValuesPer.length - 1];
  let relativeX = 0;
  let maxRange = wrapper!.clientWidth - target!.clientWidth;
  let targetMouseDiff = 0;
  let isClicked = false;
  let total = 0;
  let currStep = 0;

  const getClosestValue = (goal: number) =>
    stepsValuesPer.reduce(
      (curr, prev) =>
        Math.abs(goal - curr) > Math.abs(goal - prev) ? prev : curr,
      0
    );
  const getInitTotal = (val: number): RangeSliderResult => {
    const currVal = maxValue * val;
    const closestVal = getClosestValue(currVal);

    total = (val * 100) / maxValue;
    relativeX = Number(((maxRange * total) / wrapper!.clientWidth).toFixed(2));

    return {
      relativeX,
      value: closestVal,
      step: stepsValuesPer.indexOf(closestVal),
      total,
    };
  };
  const onStartHandler = (x: number) => {
    const targetPosition = target.getBoundingClientRect();

    isClicked = true;
    targetMouseDiff = x - targetPosition.x;
    maxRange = wrapper!.clientWidth - target.clientWidth;
    onStart && onStart();
  };
  const onStartListener = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    addDocumentEvents();
    if (isTouchEvent(e)) return onStartHandler(e.touches[0].clientX);
    if (isMouseEvent(e)) return onStartHandler(e.clientX);
  };
  const onMoveHandler = (mouseX: number) => {
    const wrapperCoords = wrapper!.getBoundingClientRect();

    const x = minMaxValue(
      0,
      mouseX - wrapperCoords.x - targetMouseDiff,
      maxRange
    );

    relativeX = (x * 100) / wrapper!.clientWidth;
    total = Math.round((x * 100) / maxRange);
    currStep = Math.floor(total / (100 / step));

    onMove &&
      onMove({
        relativeX,
        value: getClosestValue((maxValue * total) / 100),
        total,
        step: currStep,
      });
  };
  const onMoveListener = (e: MouseEvent | TouchEvent) => {
    if (!isClicked) return;
    if (isTouchEvent(e)) return onMoveHandler(e.touches[0].clientX);
    if (isMouseEvent(e)) return onMoveHandler(e.clientX);
  };
  const onEndHandler = () => {
    if (!isClicked) return;

    const closestValue = getClosestValue(maxValue * (total / 100));

    isClicked = false;

    clearDocumentEvents();
    onEnd &&
      onEnd({
        relativeX: Number(
          (
            (closestValue / maxValue) *
            ((maxRange * 100) / wrapper!.clientWidth)
          ).toFixed(2)
        ),
        value: closestValue,
        total,
        step: stepsValuesPer.indexOf(closestValue),
      });
  };
  const addDocumentEvents = () => {
    document.addEventListener("mousemove", onMoveListener);
    document.addEventListener("touchmove", onMoveListener);
    document.addEventListener("mouseup", onEndHandler);
    document.addEventListener("touchend", onEndHandler);
  };
  const clearDocumentEvents = () => {
    document.removeEventListener("mousemove", onMoveListener);
    document.removeEventListener("touchmove", onMoveListener);
    document.removeEventListener("mouseup", onEndHandler);
    document.removeEventListener("touchend", onEndHandler);
  };
  const addEvents = () => {
    target.addEventListener("mousedown", onStartListener);
    target.addEventListener("touchstart", onStartListener);
  };
  addEvents();
  onInit && value && onInit(getInitTotal(value));
}
