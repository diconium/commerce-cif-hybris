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

class AuthenticationResponse {

    /**
     * Constructs a AuthenticationResponse based on its enclosed builder.
     * @constructor 
     * @param {Builder} builder the AuthenticationResponse builder
     */
    constructor(builder) {

        /**
         * The access token string as issued by the commerce backend.
         * @type {string}
         */
        this.access_token = builder.access_token;

        /**
         * If the access token expires, the backend specifies a number of seconds after which the access token expires, and is no longer valid. Expiration of access tokens is optional.
         * @type {integer}
         */
        this.expires_in = undefined;

        /**
         * The refresh token is used to obtain a new access token after the original access token is expired. A refresh token will not be returned in case the access token does not expire or the commerce engine does not support it.
         * @type {string}
         */
        this.refresh_token = undefined;

        /**
         * The scope the user granted to if supported by commerce backend.
         * @type {string}
         */
        this.scope = undefined;

        /**
         * The type of token this is, typically just the string "bearer".
         * @type {string}
         */
        this.token_type = builder.token_type;
    }

    /**
     * Builds a AuthenticationResponse based on API required properties.
     */
    static get Builder() {
        class Builder {

            withAccess_token(access_token) {
                this.access_token = access_token;
                return this;
            }

            withToken_type(token_type) {
                this.token_type = token_type;
                return this;
            }

            build() {
                return new AuthenticationResponse(this);
            }
        }
        return Builder;
    }
}
module.exports.AuthenticationResponse = AuthenticationResponse;
