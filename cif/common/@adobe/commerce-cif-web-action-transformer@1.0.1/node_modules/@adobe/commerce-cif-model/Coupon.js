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

class Coupon {

    /**
     * Constructs a Coupon based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the Coupon builder
     */
    constructor(builder) {
        /**
         * The id of the coupon instance applied to a cart. If not supported by commerce engine, should be equal to code.
         * @type {string}
         */
        this.id = builder.id;

        /**
         * The code to activate the coupon.
         * @type {string}
         */
        this.code = builder.code;

        /**
         * The description of the coupon.
         * @type {string}
         */
        this.description = undefined;

    }

    /**
     * Builds a Coupon based on API required properties.
     */
    static get Builder() {
        class Builder {
            withCode(code) {
                this.code = code;
                return this;
            }

            withId(id) {
                this.id = id;
                return this;
            }

            build() {
                return new Coupon(this);
            }
        }
        return Builder;
    }
}
module.exports.Coupon = Coupon;
