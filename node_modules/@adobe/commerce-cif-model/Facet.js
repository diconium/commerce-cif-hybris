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
const FacetValue = require('./FacetValue.js').FacetValue;

class Facet {

    /**
     * Constructs a Facet based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the Facet builder
     */
    constructor(builder) {

        /**
         * The id of the facet.
         * @type {string}
         */
        this.id = builder.id;

        /**
         * The number of missed items.
         * @type {integer}
         */
        this.missed = undefined;

        /**
         * Indicates if the facet is multi selectable.
         * @type {boolean}
         */
        this.multiSelect = undefined;

        /**
         * The name of the facet.
         * @type {string}
         */
        this.name = builder.name;

        /**
         * The type of the facet.
         * @type {string}
         */
        this.type = builder.type;

        /**
         * List of facetValues calculated for this facet.
         * @type {FacetValue[]}
         */
        this.values = builder.values;
    }

    /**
     * Builds a Facet based on API required properties.
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

            withType(type) {
                this.type = type;
                return this;
            }

            withValues(values) {
                this.values = values;
                return this;
            }

            build() {
                return new Facet(this);
            }
        }
        return Builder;
    }
}
module.exports.Facet = Facet;
