import LinearSystemPage from "../components/LinearSystemPage";
import { Jacobi } from "../methods";

function JacobiPage() {
  return <LinearSystemPage MethodClass={Jacobi} title="Jacobi" />;
}

export default JacobiPage;
