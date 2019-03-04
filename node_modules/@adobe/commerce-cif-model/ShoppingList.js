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
const ShoppingListEntry = require('./ShoppingListEntry.js').ShoppingListEntry;

class ShoppingList {

    /**
     * Constructs a ShoppingList based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the ShoppingList builder
     */
    constructor(builder) {

        /**
         * The date-time when this object was created. The JSON representation must be in RFC339 / ISO8601 format
         * @type {string}
         */
        this.createdAt = undefined;

        /**
         * The customer id that owns this shopping list.
         * @type {string}
         */
        this.customerId = undefined;

        /**
         * The description of the shopping list.
         * @type {string}
         */
        this.description = undefined;

        /**
         * The entries of the shopping list.
         * @type {ShoppingListEntry[]}
         */
        this.entries = builder.entries;

        /**
         * The id of the shopping list.
         * @type {string}
         */
        this.id = builder.id;

        /**
         * The date-time when this object was last modified. The JSON representation must be in RFC339 / ISO8601 format
         * @type {string}
         */
        this.lastModifiedAt = undefined;

        /**
         * The name of the shopping list.
         * @type {string}
         */
        this.name = builder.name;
    }

    /**
     * Builds a ShoppingList based on API required properties.
     */
    static get Builder() {
        class Builder {

            withEntries(entries) {
                this.entries = entries;
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

            build() {
                return new ShoppingList(this);
            }
        }
        return Builder;
    }
}
module.exports.ShoppingList = ShoppingList;
