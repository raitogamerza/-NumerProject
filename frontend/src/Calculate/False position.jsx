import BracketingPage from "../components/BracketingPage";
import { FalsePosition } from "../methods";

function Falseposition() {
  return (
    <BracketingPage
      MethodClass={FalsePosition}
      title="False Position Method"
      defaults={{ fx: "x*x-13", x0: "0", x1: "10" }}
    />
  );
}

export default Falseposition;
