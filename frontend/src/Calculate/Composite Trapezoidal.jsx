import IntegrationPage from "../components/IntegrationPage";
import { CompositeTrapezoidal } from "../methods";

function CompositeTrapezoidalPage() {
  return <IntegrationPage MethodClass={CompositeTrapezoidal} title="Composite Trapezoidal Rule" />;
}

export default CompositeTrapezoidalPage;
