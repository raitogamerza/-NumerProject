import LinearSystemPage from "../components/LinearSystemPage";
import { GaussElimination } from "../methods";

function GaussEliminationPage() {
  return <LinearSystemPage MethodClass={GaussElimination} title="Gauss Elimination" />;
}

export default GaussEliminationPage;
