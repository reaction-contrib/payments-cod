import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { Packages } from "/lib/collections";

Meteor.methods({
  "payments-cod/updateSettings": function (settings) {
    check(settings, {
      spreadSheetKey: Match.Maybe(String),
      additionalCharge: Number });

    Packages.update({ name: "payments-cod" }, { $set: { settings } });
  }
});
