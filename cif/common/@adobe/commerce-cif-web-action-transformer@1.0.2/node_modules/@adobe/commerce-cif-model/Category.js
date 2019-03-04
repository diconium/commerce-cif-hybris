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

class Category {

    /**
     * Constructs a Category based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the Category builder
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
         * The internal unique ID of the category in the commerce backend system.
         * @type {string}
         */
        this.id = builder.id;

        /**
         * The name of the category.
         * @type {string}
         */
        this.name = undefined;

        /**
         * The description of the category.
         * @type {string}
         */
        this.description = undefined;

        /**
         * The id of the main parent category (if this category has multiple parents).
         * @type {string}
         */
        this.mainParentId = undefined;

        /**
         * The list of parent categories for this category. Depending on the backend system, the returned items may only have their ids being set.
         * @type {Category[]}
         */
        this.parents = undefined;

        /**
         * The list of subcategories for this category. Depending on the backend system, the returned items may only have their ids being set.
         * @type {Category[]}
         */
        this.children = undefined;

    }

    /**
     * Builds a Category based on API required properties.
     */
    static get Builder() {
        class Builder {
            withId(id) {
                this.id = id;
                return this;
            }

            build() {
                return new Category(this);
            }
        }
        return Builder;
    }
}
module.exports.Category = Category;
