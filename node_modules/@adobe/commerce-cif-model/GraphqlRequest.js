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

class GraphqlRequest {

    /**
     * Constructs a GraphqlRequest based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the GraphqlRequest builder
     */
    constructor(builder) {

        /**
         * Only required if multiple operations are present in the query.
         * @type {string}
         */
        this.operationName = undefined;

        /**
         * The query string in graphQL query format.
         * @type {string}
         */
        this.query = builder.query;

        /**
         * An optional JSON object defining variables for the query.
         * @type {object}
         */
        this.variables = undefined;
    }

    /**
     * Builds a GraphqlRequest based on API required properties.
     */
    static get Builder() {
        class Builder {

            withQuery(query) {
                this.query = query;
                return this;
            }

            build() {
                return new GraphqlRequest(this);
            }
        }
        return Builder;
    }
}
module.exports.GraphqlRequest = GraphqlRequest;
