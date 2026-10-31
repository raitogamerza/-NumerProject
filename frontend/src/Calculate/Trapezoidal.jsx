import IntegrationPage from "../components/IntegrationPage";
import { Trapezoidal } from "../methods";

function TrapezoidalPage() {
  return <IntegrationPage MethodClass={Trapezoidal} title="Trapezoidal Rule" />;
}

export default TrapezoidalPage;
