import { ACard } from "./components/atoms/card/index";
import { LoginForm } from "./components/molecules/login-form/index";
import { Blank } from "./components/templates/blank/index";

export const App = () => {
  return (
    <Blank>
      <div className="h-screen flex items-center">
        <ACard className="flex m-auto w-3/5">
          <img
            alt="photos"
            width="100"
            height="224"
            className="w-3/5 bg-cover"
            src="/images/bg-cover.jpg"
          />
          <LoginForm className="w-full" />
        </ACard>
      </div>
    </Blank>
  );
};
