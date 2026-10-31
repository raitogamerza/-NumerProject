import LinearSystemPage from "../components/LinearSystemPage";
import { LUDecomposition } from "../methods";

function LUDecompositionPage() {
  return <LinearSystemPage MethodClass={LUDecomposition} title="LU Decomposition" />;
}

export default LUDecompositionPage;
