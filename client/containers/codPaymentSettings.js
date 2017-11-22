import { composeWithTracker } from "@reactioncommerce/reaction-components";
import CodPaymentSettings from "../components/codPaymentSettings";
import { i18nextDep } from  "/client/api";
import { Packages } from "/lib/collections";


function composer(props, onData) {
  i18nextDep.depend();
  const { settings } = Packages.findOne({ name: "payments-cod" });
  onData(null, {
    settings
  });
}

export default composeWithTracker(composer)(CodPaymentSettings);
