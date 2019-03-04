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

class Address {

    /**
     * Constructs a Address based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the Address builder
     */
    constructor(builder) {
        /**
         * Address unique identifier.
         * @type {string}
         */
        this.id = builder.id;

        /**
         * Address title
         * @type {string}
         */
        this.title = undefined;

        /**
         * Address salutation
         * @type {string}
         */
        this.salutation = undefined;

        /**
         * First name.
         * @type {string}
         */
        this.firstName = builder.firstName;

        /**
         * Last name.
         * @type {string}
         */
        this.lastName = builder.lastName;

        /**
         * Email.
         * @type {string}
         */
        this.email = undefined;

        /**
         * Phone.
         * @type {string}
         */
        this.phone = undefined;

        /**
         * Mobile.
         * @type {string}
         */
        this.mobile = undefined;

        /**
         * Fax.
         * @type {string}
         */
        this.fax = undefined;

        /**
         * Country code as per ISO 3166-1.
         * @type {string}
         */
        this.country = builder.country;

        /**
         * Region.
         * @type {string}
         */
        this.region = undefined;

        /**
         * City.
         * @type {string}
         */
        this.city = builder.city;

        /**
         * Postal code.
         * @type {string}
         */
        this.postalCode = builder.postalCode;

        /**
         * Organization name. Can be company name.
         * @type {string}
         */
        this.organizationName = undefined;

        /**
         * Department.
         * @type {string}
         */
        this.department = undefined;

        /**
         * Street name.
         * @type {string}
         */
        this.streetName = builder.streetName;

        /**
         * Street no.
         * @type {string}
         */
        this.streetNumber = undefined;

        /**
         * Additional details for the street address.
         * @type {string}
         */
        this.additionalStreetInfo = undefined;

        /**
         * Additional details for the address.
         * @type {string}
         */
        this.additionalAddressInfo = undefined;

    }

    /**
     * Builds a Address based on API required properties.
     */
    static get Builder() {
        class Builder {
            withCity(city) {
                this.city = city;
                return this;
            }

            withCountry(country) {
                this.country = country;
                return this;
            }

            withFirstName(firstName) {
                this.firstName = firstName;
                return this;
            }

            withId(id) {
                this.id = id;
                return this;
            }

            withLastName(lastName) {
                this.lastName = lastName;
                return this;
            }

            withPostalCode(postalCode) {
                this.postalCode = postalCode;
                return this;
            }

            withStreetName(streetName) {
                this.streetName = streetName;
                return this;
            }

            build() {
                return new Address(this);
            }
        }
        return Builder;
    }
}
module.exports.Address = Address;
