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

class Asset {

    /**
     * Constructs a Asset based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the Asset builder
     */
    constructor(builder) {
        /**
         * The id of the asset.
         * @type {string}
         */
        this.id = builder.id;

        /**
         * The url of the asset.
         * @type {string}
         */
        this.url = builder.url;

    }

    /**
     * Builds a Asset based on API required properties.
     */
    static get Builder() {
        class Builder {
            withId(id) {
                this.id = id;
                return this;
            }

            withUrl(url) {
                this.url = url;
                return this;
            }

            build() {
                return new Asset(this);
            }
        }
        return Builder;
    }
}
module.exports.Asset = Asset;
