import LinearSystemPage from "../components/LinearSystemPage";
import { GaussJordan } from "../methods";

function GaussJordanPage() {
  return <LinearSystemPage MethodClass={GaussJordan} title="Gauss Jordan" />;
}

export default GaussJordanPage;
