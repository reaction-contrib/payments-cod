import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { i18next } from "/client/api";
import { Components } from "@reactioncommerce/reaction-components";


class CodPaymentForm extends React.Component {
  static propTypes = {
    cartTotal: PropTypes.string.isRequired,
    paymentPackageId: PropTypes.string.isRequired,
    shopId: PropTypes.string.isRequired
  };

  handleClick = () => {
    const paymentMethod = {
      processor: "payments-cod",
      paymentPackageId: this.props.paymentPackageId,
      method: "credit",
      amount: Number(this.props.cartTotal),
      paymentSettingsKey: "payments-cod",
      transactionId: Random.id(),
      riskLevel: "normal",
      status: "created",
      mode: "void",
      createdAt: new Date(),
      transactions: [],
      shopId: this.props.shopId
    };

    Meteor.call("cart/submitPayment", paymentMethod, (error) => {
      if (error) {
        Alerts.toast(i18next.t("alerts.errorSubmitPayment"), "error");
      }
    });
  };

  render() {
    return (
      <div>
        <div data-i18n="paymentMethod">Cash-on-delivery</div>
        <Components.Button
          bezelStyle="solid"
          status="primary"
          className="pull-right"
          type="button"
          onClick={this.handleClick}
        >
          <span data-i18n="">Order</span>
        </Components.Button>
      </div>
    );
  }
}

export default CodPaymentForm;
