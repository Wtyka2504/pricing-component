import { useEffect, useState } from "react";
import { pricingPerMonth } from "../../constants/pricing";
import { ButtonSwitch } from "../Buttons/Switch/ButtonSwitch";
import { IconCheck } from "../Icons/IconCheck";
import { RangeSlider } from "../RangeSlider/RangeSlider";

type Billing = "yearly" | "monthly";

const pricingPerMonthSortByMin = pricingPerMonth.sort(
  ({ price }, { price: priceB }) => {
    return price > priceB ? price : priceB;
  }
);

function CardList() {
  const items = ["Unlimited websites", "100% data ownership", "Email reports"];

  return (
    <ul className="flex flex-col justify-center items-center space-y-10 desktop:items-start">
      {items.map((item, index) => (
        <li
          className={`flex items-center font-semibold font-3xs text-cool-grey space-x-16`}
          key={index}
        >
          <span>
            <IconCheck />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
const viewsToShortForm = (views: number) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
  ];
  const item = lookup
    .sort(({ value: a }, { value: b }) => (a > b ? a : b))
    .find(({ value }) => {
      return views >= value;
    });
  return item ? views / item.value + item.symbol : "0";
};
export function Card() {
  const [val, setVal] = useState(Math.floor((pricingPerMonth.length - 1) / 2));
  const [billing, setBilling] = useState<Billing>("monthly");
  const [pricing, setPricing] = useState(pricingPerMonthSortByMin[val]);
  const discount = 0.25;
  const setPricingHandler = (index: number) => {
    const { price, views } = pricingPerMonthSortByMin[index];

    setPricing(() => {
      return {
        views,
        price: billing === "monthly" ? price : price - price * discount,
      };
    });
  };

  useEffect(() => {
    setPricingHandler(val);
  }, [billing, val]);

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
          <RangeSlider
            min={0}
            max={pricingPerMonth.length - 1}
            initValue={val}
            onChange={value => {
              setVal(value);
            }}
          />
        </div>
      </div>
      <div className="flex justify-center items-center my-38 space-x-12">
        <span>Monthly Billing</span>
        {
          <ButtonSwitch
            size="1.6rem"
            onChange={() => {
              setBilling(b => (b === "monthly" ? "yearly" : "monthly"));
            }}
            className={active => (active ? ["!bg-turquoise"] : [])}
          />
        }
        <span>Yearly Billing</span>
        <p className="text-coral bg-seashell font-bold p-5 rounded-full">
          -{discount * 100}%
          <span className=" ml-5 hidden desktop:inline">discount</span>
        </p>
      </div>
      <div className="w-full h-[1px] bg-ghost-white mt-38 mb-24"></div>
      <div className="flex flex-col justify-between items-center px-24 space-y-32 desktop:flex-row desktop:space-y-0">
        {<CardList />}
        <div className="flex justify-center px-24 ">
          <button className="bg-space-cadet px-46 py-12 rounded-full text-lavender-blue text-12 font-extrabold hover:text-ghost-white-body transition-colors duration-300">
            Start my trial
          </button>
        </div>
      </div>
    </div>
  );
}
