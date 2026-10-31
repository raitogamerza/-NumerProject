import LinearSystemPage from "../components/LinearSystemPage";
import { ConjugateGradient } from "../methods";

function ConjugateGradientPage() {
  return <LinearSystemPage MethodClass={ConjugateGradient} title="Conjugate Gradient" />;
}

export default ConjugateGradientPage;
