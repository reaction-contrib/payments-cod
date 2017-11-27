import { composeWithTracker } from "@reactioncommerce/reaction-components";
import CodPaymentSettings from "../components/codPaymentSettings";
import { i18nextDep } from  "/client/api";


function composer(props, onData) {
  i18nextDep.depend();
  onData(null, {});
}

export default composeWithTracker(composer)(CodPaymentSettings);
