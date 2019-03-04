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

class PaymentMethod {

    /**
     * Constructs a PaymentMethod based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the PaymentMethod builder
     */
    constructor(builder) {

        /**
         * The description of the payment method.
         * @type {string}
         */
        this.description = undefined;

        /**
         * The id of the payment method.
         * @type {string}
         */
        this.id = builder.id;

        /**
         * The name of the payment method.
         * @type {string}
         */
        this.name = builder.name;
    }

    /**
     * Builds a PaymentMethod based on API required properties.
     */
    static get Builder() {
        class Builder {

            withId(id) {
                this.id = id;
                return this;
            }

            withName(name) {
                this.name = name;
                return this;
            }

            build() {
                return new PaymentMethod(this);
            }
        }
        return Builder;
    }
}
module.exports.PaymentMethod = PaymentMethod;
