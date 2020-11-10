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

const ProductVariant = require('./ProductVariant.js').ProductVariant;

class ShoppingListEntry {

    /**
     * Constructs a ShoppingListEntry based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the ShoppingListEntry builder
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
         * The id of the entry.
         * @type {string}
         */
        this.id = builder.id;

        /**
         * The product variant for the entry.
         * @type {ProductVariant}
         */
        this.productVariant = builder.productVariant;

        /**
         * The quantity for the entry.
         * @type {integer}
         */
        this.quantity = builder.quantity;

    }

    /**
     * Builds a ShoppingListEntry based on API required properties.
     */
    static get Builder() {
        class Builder {
            withId(id) {
                this.id = id;
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

            build() {
                return new ShoppingListEntry(this);
            }
        }
        return Builder;
    }
}
module.exports.ShoppingListEntry = ShoppingListEntry;
