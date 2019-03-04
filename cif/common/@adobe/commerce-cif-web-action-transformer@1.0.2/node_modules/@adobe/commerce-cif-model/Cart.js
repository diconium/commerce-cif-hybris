/*******************************************************************************
 *
 *    Copyright 2018 Adobe. All rights reserved.
 *    This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License. You may obtain a copy
 *    of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software distributed under
 *    the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *    OF ANY KIND, either express or implied. See the License for the specific language
 *    governing permissions and limitations under the License.
 *
 ******************************************************************************/

/**
 * Auto generated code based on Swagger definition.
 * Dot not edit manually. Manual changes will be overridden.
 *
 * @version 1.0.0
 */

const CartEntry = require('./CartEntry.js').CartEntry;
const MoneyValue = require('./MoneyValue.js').MoneyValue;
const TaxInfo = require('./TaxInfo.js').TaxInfo;
const Address = require('./Address.js').Address;
const ShippingInfo = require('./ShippingInfo.js').ShippingInfo;
const Discount = require('./Discount.js').Discount;
const Payment = require('./Payment.js').Payment;
const Coupon = require('./Coupon.js').Coupon;

class Cart {

    /**
     * Constructs a Cart based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the Cart builder
     */
    constructor(builder) {
        /**
         * The date-time when this object was created. The JSON representation must be in RFC339 / ISO8601 format
         * @type {string}
         */
        this.createdAt = undefined;

        /**
         * The date-time when this object was last modified. The JSON representation must be in RFC339 / ISO8601 format
         * @type {string}
         */
        this.lastModifiedAt = undefined;

        /**
         * The id for the cart.
         * @type {string}
         */
        this.id = builder.id;

        /**
         * The list of the entries in the cart.
         * @type {CartEntry[]}
         */
        this.entries = builder.entries;

        /**
         * If set, this defines the customer owning this cart. If not set, the cart is an anonymous cart.
         * @type {string}
         */
        this.customerId = undefined;

        /**
         * The net total price for the cart, including discounts, and shipping, but excluding any taxes. Until a shipping address is set, this field is typically not set.
         * @type {MoneyValue}
         */
        this.netTotalPrice = undefined;

        /**
         * The gross total price for the cart, including discounts, shipping, and all taxes. Until a shipping address is set, this field is typically not set.
         * @type {MoneyValue}
         */
        this.grossTotalPrice = undefined;

        /**
         * The product subtotal for the cart, including discounts and with or without taxes depending if the product prices include taxes or not.Until a shipping address is set, this field is typically used as the temporary cart total until it is known if prices include taxes or not.
         * @type {MoneyValue}
         */
        this.productTotalPrice = builder.productTotalPrice;

        /**
         * The cart tax info, including cart entries tax and shipping info tax. Until a shipping address is set, this field is typically not set.
         * @type {TaxInfo}
         */
        this.taxInfo = undefined;

        /**
         * Indicates if taxes are included or not in all the prices. Until a shipping address is set, this field is typically not set.
         * @type {boolean}
         */
        this.taxIncludedInPrices = undefined;

        /**
         * The shipping address for the cart products.
         * @type {Address}
         */
        this.shippingAddress = undefined;

        /**
         * The shipping info for the cart.
         * @type {ShippingInfo}
         */
        this.shippingInfo = undefined;

        /**
         * A list of all applied discounts.
         * @type {Discount[]}
         */
        this.discounts = undefined;

        /**
         * The billing address for the cart.
         * @type {Address}
         */
        this.billingAddress = undefined;

        /**
         * The payment details for the cart.
         * @type {Payment}
         */
        this.payment = undefined;

        /**
         * The currency for the cart.
         * @type {string}
         */
        this.currency = builder.currency;

        /**
         * A list of all coupons of the cart.
         * @type {Coupon[]}
         */
        this.coupons = undefined;

    }

    /**
     * Builds a Cart based on API required properties.
     */
    static get Builder() {
        class Builder {
            withCurrency(currency) {
                this.currency = currency;
                return this;
            }

            withEntries(entries) {
                this.entries = entries;
                return this;
            }

            withId(id) {
                this.id = id;
                return this;
            }

            withProductTotalPrice(productTotalPrice) {
                this.productTotalPrice = productTotalPrice;
                return this;
            }

            build() {
                return new Cart(this);
            }
        }
        return Builder;
    }
}
module.exports.Cart = Cart;
