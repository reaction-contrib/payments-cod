import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "COD payments for Reaction Commerce",
  name: "payments-cod",
  icon: "fa fa-money",
  meta: {
    version: "1.0.0"
  },
  autoEnable: true,
  settings: {
    "payments-cod": {
      enabled: false,
      support: [
        "Authorize",
        "Capture"
      ]
    }
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
  ],
  layout: [{
    state: "approved",
    template: "CodPaymentMethodApproved",
    workflow: "paymentMethod"
  }, {
    state: "completed",
    // template: "", // no template to render for now
    workflow: "paymentMethod"
  }],
  stateflows: [{
    name: "payments-cod", // same as in paymentSettingsKey
    workflow: "paymentMethod",
    collection: "Orders",
    querySelector: "{ \"_id\": \"${this.docId}\", \"billing.shopId\": \"${this.shopId}\"}",
    locationPath: "billing.$.paymentMethod.workflow",
    strategy: "StateflowSimpleStrategy",
    fsm: {
      init: "created",
      transitions: [
        { name: "approvePayment", from: "created", to: "approved" },
        { name: "paymentReceived", from: "approved", to: "completed" }
      ]
    }
  }]
});


