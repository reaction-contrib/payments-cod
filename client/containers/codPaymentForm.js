import { Meteor } from "meteor/meteor";
import { i18nextDep, Reaction } from  "/client/api";
import { Cart } from "/lib/collections";
import { composeWithTracker } from "@reactioncommerce/reaction-components";
import CodPaymentForm from "../components/codPaymentForm";


function composer(props, onData) {
  i18nextDep.depend();
  const cart = Cart.findOne({
    userId: Meteor.userId()
  });

  if (!(cart)) {
    // Show Loader
    onData(null, null);
  } else {
    Meteor.call("payments-cod/getPackageData", (error, packageData) => {
      onData(null, {
        cartTotal: cart.getTotal(),
        settings: packageData.settings,
        paymentPackageId: packageData._id,
        shopId: Reaction.getShopId()
      });
    });
  }
}

export default composeWithTracker(composer)(CodPaymentForm);
