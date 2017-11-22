import Alert from "sweetalert2";
import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

import { i18next } from "/client/api";
import { Components } from "@reactioncommerce/reaction-components";
import Validation from "/imports/plugins/core/collections/lib/validation";


class CodPaymentSettings extends React.Component {
  static propTypes = {
    settings: PropTypes.shape({
      additionalCharge: PropTypes.number.isRequired,
      spreadSheetKey: PropTypes.string
    })
  };

  static defaultProps = {
    settings: {
      spreadSheetKey: "",
      additionalCharge: 0.0
    }
  };

  static schema = new SimpleSchema({
    spreadSheetKey: {
      optional: true,
      type: String
    },
    additionalCharge: {
      decimal: true,
      type: Number,
      defaultValue: 0.0
    }
  });

  constructor(props) {
    super(...arguments);
    this.state = {
      settings: props.settings,
      messages: {
      },
      saving: false
    };
    this.validator = new Validation(CodPaymentSettings.schema, {});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      settings: nextProps.settings
    });
  }

  handleChange = (event, value, field) => {
    this.setState({ settings: { ...this.state.settings, [field]: value } });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { isValid, messages } = this.validator.validate(this.state.settings);
    this.setState({ messages });
    if (isValid) {
      this.setState({ isSaving: true });
      Meteor.call("payments-cod/updateSettings", this.state.settings, (error) => {
        this.setState({ isSaving: false });
        if (error) {
          Alert(i18next.t("app.error"),
            i18next.t("alerts.saveFailed", { error: error.reason }),
            "error").catch(() => void 0);
          return;
        }
        Alert({
          title: i18next.t("app.success"),
          text: i18next.t("alerts.saveSuccess"),
          type: "success",
          timer: 1700
        }).catch(() => void 0);
      });
    }
  };

  handleBlur = (event) => {
    const { messages } = this.validator.validate(this.state.settings);
    this.setState({ messages });
    event.stopPropagation();
    event.preventDefault();
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <Components.TextField
          i18nKeyLabel="additionalCharge"
          i18nKeyPlaceholder="additionalCharge"
          placeholder="additionalCharge"
          label="additionalCharge"
          name="additionalCharge"
          ref="additionalCharge"
          value={this.state.settings.additionalCharge}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onReturnKeyDown={this.handleBlur}
          validation={{ messages: this.state.messages }}
        />
        <Components.TextField
          i18nKeyLabel="spreadSheetKey"
          i18nKeyPlaceholder="spreadSheetKey"
          placeholder="spreadSheetKey"
          label="spreadSheetKey"
          name="spreadSheetKey"
          ref="spreadSheetKey"
          value={this.state.settings.spreadSheetKey}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onReturnKeyDown={this.handleBlur}
          validation={{ messages: this.state.messages }}
        />

        <div className="form-group">
          <Components.Button
            bezelStyle="solid"
            status="primary"
            className="pull-right"
            type="submit"
            disabled={this.state.isSaving}
          >
            {this.state.isSaving
              ? <i className="fa fa-refresh fa-spin"/>
              : <span data-i18n="app.saveChanges">Save changes</span>}
          </Components.Button>
        </div>
      </form>
    );
  }
}

export default CodPaymentSettings;
