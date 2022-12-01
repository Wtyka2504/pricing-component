import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { minMax } from "../../utils/minMax";
import { IconSlider } from "../icons/IconSlider";
import style from "./ProgressBar.module.scss";

export function ProgressBar({
  init,
  steps,
  onChange,
  onStep,
}: {
  init?: number;
  steps?: number;
  onChange?: (total: number) => void;
  onStep?: (step: number) => void;
}) {
  const [active, setActive] = useState(false);
  const [x, setX] = useState(init || 0);
  const wrapper = useRef(null);
  const step = 100 / (steps || 1);
  const start = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setActive(true);
  };
  const end = () => {
    setActive(false);
  };
  const move = (e: MouseEvent) => {
    if (!active || !wrapper.current) return;
    const wrapperX = (wrapper.current as HTMLElement).getBoundingClientRect().x;
    const width = (wrapper.current as HTMLElement).clientWidth;
    const pos = Math.round(e.clientX - wrapperX);
    const total = Math.round(
      (minMax({ min: 0, max: width, curr: pos }) * 100) / width
    );
    const _step = total % step;
    if (_step !== 0) return;
    setX(total);
    if (onChange) onChange(total);
    if (onStep) onStep(total / step + 1);
  };
  const touchMove = (e: TouchEvent) => {
    if (!active || !wrapper.current) return;
    const wrapperX = (wrapper.current as HTMLElement).getBoundingClientRect().x;
    const width = (wrapper.current as HTMLElement).clientWidth;
    const pos = Math.round(e.touches[0].clientX - wrapperX);
    const total = Math.round(
      (minMax({ min: 0, max: width, curr: pos }) * 100) / width
    );
    setX(total);
    if (onChange) onChange(total);
  };
  useEffect(() => {
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", end);
    document.addEventListener("touchmove", touchMove);
    document.addEventListener("touchend", end);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", end);
      document.removeEventListener("touchmove", touchMove);
      document.removeEventListener("touchend", end);
    };
  }, [active]);

  return (
    <div
      className={style.wrapper}
      style={{ "--x": `${x}%` } as CSSProperties}
      ref={wrapper}
    >
      <div className={style.bar}>
        <div className={style["progress-bar"]}></div>
      </div>
      <div
        className={style.circle}
        onMouseDown={() => setActive(true)}
        onTouchStart={start}
      >
        <IconSlider />
      </div>
    </div>
  );
}
