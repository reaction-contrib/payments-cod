import { Template } from "meteor/templating";
import CodPaymentForm from "../containers/codPaymentForm";


Template.codPaymentForm.helpers({
  PaymentForm() {
    return CodPaymentForm;
  }
});
