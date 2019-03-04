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

class FacetValue {

    /**
     * Constructs a FacetValue based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the FacetValue builder
     */
    constructor(builder) {

        /**
         * The id for this facet.
         * @type {string}
         */
        this.id = builder.id;

        /**
         * The number of facet value occurrences.
         * @type {integer}
         */
        this.occurrences = undefined;

        /**
         * Indicates if the current facet value was selected.
         * @type {boolean}
         */
        this.selected = undefined;

        /**
         * The value for this facet.
         * @type {object}
         */
        this.value = builder.value;
    }

    /**
     * Builds a FacetValue based on API required properties.
     */
    static get Builder() {
        class Builder {

            withId(id) {
                this.id = id;
                return this;
            }

            withValue(value) {
                this.value = value;
                return this;
            }

            build() {
                return new FacetValue(this);
            }
        }
        return Builder;
    }
}
module.exports.FacetValue = FacetValue;
