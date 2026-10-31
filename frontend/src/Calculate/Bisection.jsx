import BracketingPage from "../components/BracketingPage";
import { Bisection as BisectionMethod } from "../methods";

function Bisection() {
  return (
    <BracketingPage
      MethodClass={BisectionMethod}
      title="Bisection Method"
      defaults={{ fx: "43x-180", x0: "0", x1: "10" }}
    />
  );
}

export default Bisection;
