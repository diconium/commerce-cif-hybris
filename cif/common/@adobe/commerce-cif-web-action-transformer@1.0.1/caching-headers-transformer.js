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

const ITransformerPipelineAction = require('./transformer-pipeline').ITransformerPipelineAction;
const HttpStatusCodes = require('http-status-codes');

/**
 * Handles the caching headers for HttpResponses.
 *
 * @extends ITransformerPipelineAction
 */
class CachingHeadersTransformerPipelineAction extends ITransformerPipelineAction {

    transform(httpResponse, resultFromOwSequence) {
        httpResponse.headers = httpResponse.headers || {};
        switch (httpResponse.statusCode) {
            case HttpStatusCodes.OK: {
                if (resultFromOwSequence.cacheControl) {
                    httpResponse.headers['Cache-Control'] = resultFromOwSequence.cacheControl;
                } else if (Number.isInteger(resultFromOwSequence.cachetime)) {
                    httpResponse.headers['Cache-Control'] = 'public, max-age=' + resultFromOwSequence.cachetime;
                    httpResponse.headers['Expires'] =
                        new Date(Date.now() + resultFromOwSequence.cachetime * 1000).toUTCString();
                }
                break;
            }
            case HttpStatusCodes.NOT_FOUND: {
                httpResponse.headers['Cache-Control'] = 'no-cache, no-store, no-transform, must-revalidate';
                break;
            }
            case HttpStatusCodes.BAD_REQUEST: {
                httpResponse.headers['Cache-Control'] = 'no-cache, no-store, no-transform, must-revalidate';
                break;
            }
            default: {
                delete httpResponse.headers['Cache-Control'];
                delete httpResponse.headers['Expires'];
            }
        }

        return httpResponse;
    }
}

module.exports = CachingHeadersTransformerPipelineAction;