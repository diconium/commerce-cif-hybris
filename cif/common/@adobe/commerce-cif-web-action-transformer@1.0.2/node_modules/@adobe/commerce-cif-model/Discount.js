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

class Discount {

    /**
     * Constructs a Discount based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the Discount builder
     */
    constructor(builder) {
        /**
         * The id for the discount.
         * @type {string}
         */
        this.id = builder.id;

        /**
         * The type of the discount.
         * @type {string}
         */
        this.type = builder.type;

        /**
         * The name of the discount.
         * @type {string}
         */
        this.name = undefined;

        /**
         * The description associated with the discount. May be displayed in the UI.
         * @type {string}
         */
        this.description = undefined;

        /**
         * The value which is discounted.
         * @type {MoneyValue}
         */
        this.value = builder.value;

    }

    /**
     * Builds a Discount based on API required properties.
     */
    static get Builder() {
        class Builder {
            withId(id) {
                this.id = id;
                return this;
            }

            withType(type) {
                this.type = type;
                return this;
            }

            withValue(value) {
                this.value = value;
                return this;
            }

            build() {
                return new Discount(this);
            }
        }
        return Builder;
    }
}
module.exports.Discount = Discount;
