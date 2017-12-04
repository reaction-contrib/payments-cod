import React from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";


class CodPaymentMethodApproved extends React.Component {
  onPaymentReceived = () => {
    // Finish up workflow
    this.props.paymentMethodWorkflow.pushNextState("paymentReceived");
  }

  render() {
    return (
      <div className="flex">
        <a
          className="btn btn-link"
          href={this.props.printOrder}
          target="_blank"
          data-i18n="app.print"
        >
          Print
        </a>

        <button
          className="btn btn-success flex-item-fill"
          type="button"
          data-event-action="capturePayment"
          onClick={this.onPaymentReceived}
        >
          <span id="btn-capture-payment" data-i18n="">Payment received</span>
        </button>
      </div>
    );
  }
}

registerComponent("CodPaymentMethodApproved", CodPaymentMethodApproved);
