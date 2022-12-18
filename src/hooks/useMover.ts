import { useState } from "react";

export type useMoveResult = {
  pos: number;
  total: number;
};
type Props = {
  wrapper: HTMLElement;
  target: HTMLElement;
  touch?: boolean;
  steps?: number;
  direction?: "x" | "y";
  onMove?: (e: useMoveResult) => void;
  onStart?: (e: useMoveResult) => void;
  onEnd?: (e: useMoveResult) => void;
};

type Points = {
  x: number;
  y: number;
};
type DirectionProps = [
  "x" | "y",
  "clientWidth" | "clientHeight",
  "clientX" | "clientY"
];

const minMaxValue = (min: number, curr: number, max: number) =>
  min > curr ? min : curr > max ? max : curr;
const countPercents = (curr: number, max: number) => (curr * 100) / max;
const getClosestStepPoint = (steps: number[], goal: number) =>
  steps.reduce((prev, curr) => {
    return Math.abs(prev - goal) > Math.abs(curr - goal) ? curr : prev;
  }, steps[0]);
export const useMover = ({
  target,
  wrapper,
  steps,
  direction,
  touch,
  onMove,
  onStart,
}: Props) => {
  const targetPoints = target.getBoundingClientRect();
  const wrapperPoints = wrapper.getBoundingClientRect();
  const stepPart = steps && 100 / steps;
  const directionProps: DirectionProps =
    !direction || direction === "x"
      ? ["x", "clientWidth", "clientX"]
      : ["y", "clientHeight", "clientY"];
  const stepsPoints = Array.from(
    { length: steps ? steps + 1 : 0 },
    (_, i) => i
  ).map(step => step * (stepPart !== undefined ? stepPart : 0));
  let active = false;
  let lastPos: number;
  let lastStep: number;
  let total = countPercents(
    targetPoints[directionProps[0]] - wrapperPoints[directionProps[0]],
    wrapper.clientWidth
  );
  function getStep(total: number) {
    if (!stepPart) return [false, 0];
    return [true, total === 100 ? stepPart : Math.round(total % stepPart)];
  }
  function start(e: { preventDefault: () => void }) {
    console.log(target);
    e.preventDefault();
    active = true;
    onStart &&
      onStart({
        pos: minMaxValue(
          0,
          targetPoints[directionProps[0]] - wrapperPoints[directionProps[0]],
          wrapper[directionProps[1]]
        ),
        total,
      });
  }
  function end() {
    active = false;
    if (steps) {
      const closestStep = getClosestStepPoint(stepsPoints, total);
      console.log(closestStep, stepsPoints, total);
      onMove &&
        onMove({
          total: closestStep,
          pos: wrapper[directionProps[1]] * (closestStep / 100),
        });
    }
  }
  function move(e: MouseEvent) {
    if (!active) return;

    const pos = minMaxValue(
      0,
      e[directionProps[2]] - wrapperPoints[directionProps[0]],
      wrapper[directionProps[1]]
    );

    if (pos === lastPos) return;

    lastPos = pos;
    total = countPercents(pos, wrapper[directionProps[1]]);
    onMove && onMove({ total, pos });
  }
  function touchMove(e: TouchEvent) {
    if (!active) return;
    const pos = minMaxValue(
      0,
      e.touches[0][directionProps[2]] - wrapperPoints[directionProps[0]],
      wrapper[directionProps[1]]
    );
    if (pos === lastPos) return;
    lastPos = pos;
    total = countPercents(pos, wrapper[directionProps[1]]);
    onMove && onMove({ total, pos });
  }
  console.log("render");
  target.addEventListener("mousedown", start);
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", end);
  if (touch) {
    target.addEventListener("touchstart", start);
    document.addEventListener("touchstart", touchMove);
    document.addEventListener("touchstart", end);
  }
};
