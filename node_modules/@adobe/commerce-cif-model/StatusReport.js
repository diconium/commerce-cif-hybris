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

class StatusReport {

    /**
     * Constructs a StatusReport based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the StatusReport builder
     */
    constructor(builder) {

        /**
         * Indicates if scope is healthy or not.
         * @type {boolean}
         */
        this.healthy = builder.healthy;

        /**
         * Optional message to accompany the reported healthy status. Typically useful when scope is not healthy.
         * @type {string}
         */
        this.message = undefined;

        /**
         * The scope that was checked.
         * @type {string}
         */
        this.scope = builder.scope;
    }

    /**
     * Builds a StatusReport based on API required properties.
     */
    static get Builder() {
        class Builder {

            withHealthy(healthy) {
                this.healthy = healthy;
                return this;
            }

            withScope(scope) {
                this.scope = scope;
                return this;
            }

            build() {
                return new StatusReport(this);
            }
        }
        return Builder;
    }
}
module.exports.StatusReport = StatusReport;
