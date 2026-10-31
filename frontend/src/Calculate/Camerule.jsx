import LinearSystemPage from "../components/LinearSystemPage";
import { CramerRule } from "../methods";

function Camerule() {
  return <LinearSystemPage MethodClass={CramerRule} title="Cramer's Rule" />;
}

export default Camerule;
