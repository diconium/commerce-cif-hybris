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

class GraphqlResponse {

    /**
     * Constructs a GraphqlResponse based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the GraphqlResponse builder
     */
    constructor(builder) {

        /**
         * If successful, this contains the JSON data returned by a graphQL request.
         * @type {object}
         */
        this.data = undefined;

        /**
         * If any, this contains a JSON array of the errors encountered while executing a graphQL request.
         * @type {object[]}
         */
        this.errors = undefined;
    }

    /**
     * Builds a GraphqlResponse based on API required properties.
     */
    static get Builder() {
        class Builder {

            build() {
                return new GraphqlResponse(this);
            }
        }
        return Builder;
    }
}
module.exports.GraphqlResponse = GraphqlResponse;
