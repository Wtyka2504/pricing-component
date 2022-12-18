import { CSSProperties, useState } from "react";
import style from "./ButtonSwitch.module.scss";

export function ButtonSwitch({
  onChange,
  size,
  initActive,
  className,
}: {
  size?: string;
  initActive?: boolean;
  className?: (active: boolean) => string[];
  onChange?: (active: boolean) => void;
}) {
  const [active, setActive] = useState(
    initActive !== undefined ? initActive : false
  );
  const clickHandler = () => {
    setActive(a => (a ? false : true));
    if (onChange) onChange(active);
  };
  const extraClassName = className && className(active).join(" ");
  return (
    <button
      className={
        active
          ? [style.wrapper, style.active, extraClassName].join(" ")
          : [style.wrapper, extraClassName].join(" ")
      }
      style={size ? ({ "--size": size } as CSSProperties) : {}}
      onClick={clickHandler}
    >
      <div className={style.circle}></div>
    </button>
  );
}
