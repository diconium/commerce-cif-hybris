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

class Attribute {

    /**
     * Constructs a Attribute based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the Attribute builder
     */
    constructor(builder) {

        /**
         * The unique id for this text attribute, for example 'width'.
         * @type {string}
         */
        this.id = builder.id;

        /**
         * If true, this attribute is a variant attribute. If not set or false, the attribute is a normal/simple attribute.
         * @type {boolean}
         */
        this.isVariantAxis = undefined;

        /**
         * The name for this text attribute.
         * @type {string}
         */
        this.name = builder.name;

        /**
         * The value of the attribute. This can be any arbitrary valid JSON value.
         * @type {object}
         */
        this.value = builder.value;
    }

    /**
     * Builds a Attribute based on API required properties.
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

            withValue(value) {
                this.value = value;
                return this;
            }

            build() {
                return new Attribute(this);
            }
        }
        return Builder;
    }
}
module.exports.Attribute = Attribute;
