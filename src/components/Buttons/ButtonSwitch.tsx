import { useState } from "react";
import style from "./ButtonSwitch.module.scss";

export function ButtonSwitch({
  onChange,
}: {
  onChange?: (active: boolean) => void;
}) {
  const [active, setActive] = useState(false);
  const clickHandler = () => {
    setActive(a => (a ? false : true));
    if (onChange) onChange(active);
  };
  return (
    <label
      className={
        active ? [style.wrapper, style.active].join(" ") : style.wrapper
      }
      onClick={clickHandler}
    >
      <div className={style.circle}></div>
    </label>
  );
}
