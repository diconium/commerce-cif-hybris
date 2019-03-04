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
 * @version 1.4.0
 */
const ProductVariant = require('./ProductVariant.js').ProductVariant;
const MoneyValue = require('./MoneyValue.js').MoneyValue;
const Discount = require('./Discount.js').Discount;
const TaxInfo = require('./TaxInfo.js').TaxInfo;

class CartEntry {

    /**
     * Constructs a CartEntry based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the CartEntry builder
     */
    constructor(builder) {

        /**
         * The cart entry price after all discounts have been applied.
         * @type {MoneyValue}
         */
        this.discountedPrice = undefined;

        /**
         * A list of all applied discounts.
         * @type {Discount[]}
         */
        this.discounts = undefined;

        /**
         * The id for the entry.
         * @type {string}
         */
        this.id = builder.id;

        /**
         * The calculated cart entry price. May or may not include taxes, depending on the tax policy.
         * @type {MoneyValue}
         */
        this.price = builder.price;

        /**
         * The ProductVariant for the entry.
         * @type {ProductVariant}
         */
        this.productVariant = builder.productVariant;

        /**
         * The quantity for the entry.
         * @type {integer}
         */
        this.quantity = builder.quantity;

        /**
         * The cart entry tax info. Until a shipping address is set, this field is typically not set.
         * @type {TaxInfo}
         */
        this.taxInfo = undefined;

        /**
         * Cart entry type.
         * @type {string}
         */
        this.type = builder.type;

        /**
         * The product variant item price.
         * @type {MoneyValue}
         */
        this.unitPrice = builder.unitPrice;
    }

    /**
     * Builds a CartEntry based on API required properties.
     */
    static get Builder() {
        class Builder {

            withId(id) {
                this.id = id;
                return this;
            }

            withPrice(price) {
                this.price = price;
                return this;
            }

            withProductVariant(productVariant) {
                this.productVariant = productVariant;
                return this;
            }

            withQuantity(quantity) {
                this.quantity = quantity;
                return this;
            }

            withType(type) {
                this.type = type;
                return this;
            }

            withUnitPrice(unitPrice) {
                this.unitPrice = unitPrice;
                return this;
            }

            build() {
                return new CartEntry(this);
            }
        }
        return Builder;
    }
}
module.exports.CartEntry = CartEntry;
