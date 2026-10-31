import LinearSystemPage from "../components/LinearSystemPage";
import { MatrixInversion } from "../methods";

function MatrixInversionPage() {
  return <LinearSystemPage MethodClass={MatrixInversion} title="Matrix Inversion" />;
}

export default MatrixInversionPage;
