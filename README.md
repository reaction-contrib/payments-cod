# Payments-cod: A Cash-on-Delivery payment plugin for Reaction Commerce

A very basic payment provider plugin that offers Cash-On-Delivery.

It does essentially just skip the payment step during checkout workflow and allows ordering without
the need for entering credit card details.

There's a shortcoming when it comes to order processing. The
reason is that a order can't be kept in processing once it gets shipped.

But during the nature of COD, the payment will occur after the order has
been shipped. Therefore it should still be in mode : "processing", which
is not possible ATM. As soon as the order get shipped, it's marked as "Completed".
