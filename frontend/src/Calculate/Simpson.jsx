import IntegrationPage from "../components/IntegrationPage";
import { Simpson } from "../methods";

function SimpsonPage() {
  return <IntegrationPage MethodClass={Simpson} title="Simpson's Rule" />;
}

export default SimpsonPage;
