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

const MoneyValue = require('./MoneyValue.js').MoneyValue;
const TaxInfo = require('./TaxInfo.js').TaxInfo;

class ShippingInfo {

    /**
     * Constructs a ShippingInfo based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the ShippingInfo builder
     */
    constructor(builder) {
        /**
         * The shipping method id.
         * @type {string}
         */
        this.id = builder.id;

        /**
         * The shipping method name.
         * @type {string}
         */
        this.name = builder.name;

        /**
         * The cost of the shipping.
         * @type {MoneyValue}
         */
        this.cost = builder.cost;

        /**
         * The discounted shipping cost.
         * @type {MoneyValue}
         */
        this.discountedCost = undefined;

        /**
         * The tax for the shipping.
         * @type {TaxInfo}
         */
        this.taxInfo = builder.taxInfo;

    }

    /**
     * Builds a ShippingInfo based on API required properties.
     */
    static get Builder() {
        class Builder {
            withCost(cost) {
                this.cost = cost;
                return this;
            }

            withId(id) {
                this.id = id;
                return this;
            }

            withName(name) {
                this.name = name;
                return this;
            }

            withTaxInfo(taxInfo) {
                this.taxInfo = taxInfo;
                return this;
            }

            build() {
                return new ShippingInfo(this);
            }
        }
        return Builder;
    }
}
module.exports.ShippingInfo = ShippingInfo;
