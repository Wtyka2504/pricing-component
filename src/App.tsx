import { Card } from "./components/Card/Card";
import { Header } from "./components/Header/Header";
import { RangeSlider } from "./components/RangeSlider/RangeSlider";

export function App() {
  return (
    <div className="container flex flex-col my-auto px-24 max-w-[540px] box-content">
      <div className="grid grid-rows-[auto_1fr] gap-y-12 desktop:gap-y-20">
        <Header />
        <main className="container radius bg my-32">
          <Card />
        </main>
      </div>
    </div>
  );
}
