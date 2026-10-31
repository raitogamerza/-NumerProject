import LinearSystemPage from "../components/LinearSystemPage";
import { GaussSeidel } from "../methods";

function GaussSeidelPage() {
  return <LinearSystemPage MethodClass={GaussSeidel} title="Gauss Seidel" />;
}

export default GaussSeidelPage;
