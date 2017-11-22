import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "COD payments for Reaction Commerce",
  name: "payments-cod",
  icon: "fa fa-money",
  meta: {
    version: "1.0.0"
  },
  autoEnable: false,
  settings: {
    spreadSheetKey: "",
    pincodes: []
  },
  registry: [
    // Settings panel
    {
      provides: ["paymentSettings"],
      label: "cashOnDelivery", // used as part of translation key
      container: "dashboard",
      template: "codPaymentSettings"
    },
    // Payment form for checkout
    {
      template: "codPaymentForm",
      provides: ["paymentMethod"],
      icon: "fa fa-money"
    }
  ]
});


