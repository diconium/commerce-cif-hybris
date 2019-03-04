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

class MoneyValue {

    /**
     * Constructs a MoneyValue based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the MoneyValue builder
     */
    constructor(builder) {

        /**
         * The amount in cents of this money value.
         * @type {number}
         */
        this.amount = builder.amount;

        /**
         * The country code for this money value.
         * @type {string}
         */
        this.country = undefined;

        /**
         * The currency code for this money value.
         * @type {string}
         */
        this.currency = builder.currency;
    }

    /**
     * Builds a MoneyValue based on API required properties.
     */
    static get Builder() {
        class Builder {

            withAmount(amount) {
                this.amount = amount;
                return this;
            }

            withCurrency(currency) {
                this.currency = currency;
                return this;
            }

            build() {
                return new MoneyValue(this);
            }
        }
        return Builder;
    }
}
module.exports.MoneyValue = MoneyValue;
