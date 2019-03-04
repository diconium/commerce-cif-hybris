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
const Customer = require('./Customer.js').Customer;
const MoneyValue = require('./MoneyValue.js').MoneyValue;

class Payment {

    /**
     * Constructs a Payment based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the Payment builder
     */
    constructor(builder) {

        /**
         * The date-time when this object was created. The JSON representation must be in RFC339 / ISO8601 format
         * @type {string}
         */
        this.createdAt = undefined;

        /**
         * The customer the payment belongs to. If this is not set the payment belongs to an anonymous customer.
         * @type {Customer}
         */
        this.customer = undefined;

        /**
         * The id of the payment.
         * @type {string}
         */
        this.id = builder.id;

        /**
         * The date-time when this object was last modified. The JSON representation must be in RFC339 / ISO8601 format
         * @type {string}
         */
        this.lastModifiedAt = undefined;

        /**
         * DEPRECATED. The method for this payment like Card or Cash.
         * @type {string}
         */
        this.method = builder.method;

        /**
         * The id of the payment method for this payment.
         * @type {string}
         */
        this.methodId = builder.methodId;

        /**
         * The external status message/text for the payment.
         * @type {string}
         */
        this.status = undefined;

        /**
         * The external status code for the payment.
         * @type {string}
         */
        this.statusCode = undefined;

        /**
         * The token used to communicate with the payment service provider.
         * @type {string}
         */
        this.token = undefined;

        /**
         * The value of the payment.
         * @type {MoneyValue}
         */
        this.value = undefined;
    }

    /**
     * Builds a Payment based on API required properties.
     */
    static get Builder() {
        class Builder {

            withId(id) {
                this.id = id;
                return this;
            }

            withMethod(method) {
                this.method = method;
                return this;
            }

            withMethodId(methodId) {
                this.methodId = methodId;
                return this;
            }

            build() {
                return new Payment(this);
            }
        }
        return Builder;
    }
}
module.exports.Payment = Payment;
