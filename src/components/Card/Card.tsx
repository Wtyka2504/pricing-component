import { useState } from "react";
import { pricingPerMonth } from "../../constants/pricing";
import { ButtonSwitch } from "../Buttons/ButtonSwitch";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import style from "./Card.module.css";
type Billing = "yearly" | "monthly";

const pricingPerMonthSortByMin = pricingPerMonth.sort(
  ({ price }, { price: priceB }) => {
    return price > priceB ? price : priceB;
  }
);

function CardList() {
  const items = ["Unlimited websites", "100% data ownership", "Email reports"];
  return (
    <ul className="flex flex-col justify-center items-center space-y-10">
      {items.map((item, index) => (
        <li
          className={`${style["list-item"]} font-semibold font-3xs text-cool-grey`}
          key={index}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Card() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [pricing, setPricing] = useState(pricingPerMonthSortByMin[2]);
  const discount = 0.25;
  const setPricingHandler = (index: number) => {
    const pricingPerMonthObj = pricingPerMonthSortByMin[index - 1];
    setPricing(p => {
      return {
        ...pricingPerMonthObj,
        price:
          billing === "monthly"
            ? pricingPerMonthObj.price
            : pricingPerMonthObj.price * discount,
      };
    });
  };
  const viewsToShortForm = (views: number) => {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
    ];
    const item = lookup.reverse().find(function (item) {
      return views >= item.value;
    });
    return item ? views / item.value + item.symbol : "0";
  };
  return (
    <div className="bg-white py-34 rounded-basic shadow-basic">
      <div className="grid place-items-center gap-y-24 desktop:grid-cols-2 px-24 ">
        <div className="desktop:justify-self-start">
          <p className="font-extrabold text-3xs desktop:text-xs uppercase text-cool-grey">
            {viewsToShortForm(pricing.views)} PAGEVIEWS
          </p>
        </div>
        <div className="desktop:justify-self-end">
          <span className="text-xl desktop:text-2xl font-extrabold">
            ${pricing.price.toFixed(2)}
          </span>
          <span className="text-xs desktop:text-m font-semibold text-cool-grey">
            <span>/</span>
            <span>{billing === "monthly" ? "month" : "year"}</span>
          </span>
        </div>
        <div className="w-full row-start-2 desktop:row-start-auto desktop:col-span-full">
          <ProgressBar
            init={50}
            steps={pricingPerMonth.length - 1}
            onStep={step => setPricingHandler(step)}
          />
        </div>
      </div>
      <div className="w-full h-[1px] bg-ghost-white mt-38 mb-24"></div>
      {
        <ButtonSwitch
          onChange={() =>
            setBilling(b => (b === "monthly" ? "yearly" : "monthly"))
          }
        />
      }
      {<CardList />}
      <div className="flex justify-center mt-32 px-24 ">
        <button className="bg-space-cadet px-46 py-12 rounded-btn text-lavender-blue text-12 font-extrabold">
          Start my trial
        </button>
      </div>
    </div>
  );
}
