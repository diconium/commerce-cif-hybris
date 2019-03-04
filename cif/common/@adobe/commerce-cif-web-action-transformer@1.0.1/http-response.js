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

'use strict';

/**
 * Container for a HTTP response structured to be used by OpenWhisk web actions.
 */
class HttpResponse {

    /**
     *
     * @constructor
     * @param {Object} body
     * @param {Number} statusCode
     * @param {Object} headers
     */
    constructor(body, statusCode = 200, headers = {}) {
        /**
         *
         * @type {Object}
         */
        this.body = undefined;

        /**
         *
         * @type {Number}
         */
        this.statusCode = statusCode;

        /**
         *
         * @type {Object}
         */
        this.headers = headers;

        /**
         *
         * @type {Error}
         */
        this.error = undefined;


        this.setBody(body);
        this.headers = this.headers || {};
        this.headers['Content-Type'] = 'application/json';
    }

    setBody(body) {
        if (body) {
            this.body = new Buffer(JSON.stringify(body)).toString('base64');
        }
    }

    toJson() {
        return {
            'body': this.body,
            'statusCode': this.statusCode,
            'headers': this.headers
        };
    }
}

module.exports = HttpResponse;