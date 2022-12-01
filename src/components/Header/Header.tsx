import style from "./Header.module.css";

export function Header() {
  return (
    <header>
      <div className={`container ${style.wrapper}`}>
        <div className="text-center space-y-8 py-32">
          <h1 className="font-extrabold text-l text-space-cadet desktop:text-2xl">
            Simple, traffic-based pricing
          </h1>
          <p className="font-semibold text-2xs text-cool-grey desktop:text-s">
            <span>Sign-up for our 30-day trial.</span>{" "}
            <br className="desktop:hidden" />
            <span>No credit card required.</span>
          </p>
        </div>
      </div>
    </header>
  );
}
