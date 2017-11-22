import { Template } from "meteor/templating";
import CodPaymentSettings from "../containers/codPaymentSettings";


Template.codPaymentSettings.helpers({
  PaymentSettings: () => CodPaymentSettings
});
