import { CSSProperties, useEffect, useRef, useState } from "react";
import { RangeSliderResult, useRangeSlider } from "../../hooks/useRangeSlider";
import { IconSlider } from "../CustomIcons/IconSlider";
import style from "./RangeSlider.module.scss";

interface RangeSliderProps {
  min?: number;
  max?: number;
  initValue?: number;
  onChange?: (value: number) => void;
  onInit?: (value: number) => void;
}

export function RangeSlider({
  min,
  max,
  initValue,
  onChange,
  onInit,
}: RangeSliderProps) {
  const target = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const onMoveHandler = ({ relativeX, value }: RangeSliderResult) => {
    setX(relativeX);
    onChange && onChange(value);
  };
  const onEndHandler = ({ relativeX, value }: RangeSliderResult) => {
    setX(relativeX);
    onChange && onChange(value);
  };
  const onInitHandler = ({ relativeX, value }: RangeSliderResult) => {
    setX(relativeX);
    onInit && onInit(value);
  };

  useEffect(() => {
    useRangeSlider({
      target: target.current as HTMLElement,
      wrapper: wrapper.current as HTMLElement,
      min,
      max,
      value: initValue,
      onMove: onMoveHandler,
      onEnd: onEndHandler,
      onInit: onInitHandler,
    });
  }, []);

  return (
    <div
      className={style.wrapper}
      ref={wrapper}
      style={{ "--x": `${x}%` } as CSSProperties}
    >
      <div className={style.bar}>
        <div className={style["progress-bar"]}></div>
      </div>
      <div className={style.circle} ref={target}>
        <IconSlider />
      </div>
    </div>
  );
}
