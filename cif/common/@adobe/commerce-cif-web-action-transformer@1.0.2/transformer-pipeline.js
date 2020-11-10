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

const HttpResponse = require('./http-response');
const HttpStatusCodes = require('http-status-codes');

/**
 * A simple pipeline which receives the response from an OpenWhisk action, creates a HttpResponse and applies the
 * transformers (filters) to the response. The result is ready to be sent to the user.
 */
class TransformerPipeline {

    constructor() {
        /**
         *
         * @type {ITransformerPipelineAction[]}
         */
        this._pipelineActions = [];
    }


    /**
     * Adds a transformer to the stack.
     *
     * @param {ITransformerPipelineAction} transformerAction
     */
    pushTransformer(transformerAction) {
        this._pipelineActions.push(transformerAction);
    }

    /**
     * Given the result from the OW sequence execution, constructs a HttpResponse which is processed by all
     * transformers in the pipeline.
     *
     * @param {Object} resultFromOwSequence
     * @returns {HttpResponse}
     */
    perform(resultFromOwSequence) {
        let httpResponse = null;
        if (resultFromOwSequence.response && resultFromOwSequence.response.body) {
            httpResponse = new HttpResponse(resultFromOwSequence.response.body,
                                            resultFromOwSequence.response.statusCode,
                                            resultFromOwSequence.response.headers);
        } else if (resultFromOwSequence.response && resultFromOwSequence.response.error) {
            httpResponse = new HttpResponse({});
            httpResponse.error = resultFromOwSequence.response.error;
        } else {
            httpResponse = new HttpResponse({
                                                message: 'Cannot transform response from action to web',
                                                code: HttpStatusCodes.INTERNAL_SERVER_ERROR
                                            },
                                            HttpStatusCodes.INTERNAL_SERVER_ERROR);
        }

        this._pipelineActions.forEach(action => {
            httpResponse = action.transform(httpResponse, resultFromOwSequence);
        });

        return httpResponse;
    }
}

/**
 * Defines structure for transformers.
 *
 * @interface
 */
class ITransformerPipelineAction {

    /**
     * Takes the current state of the response, adds changes to it and then it returns it.
     *
     * @param {HttpResponse} httpResponse The current state of the HttpResponse.
     * @param {Object} resultFromOwSequence The original OW response.
     * @returns {HttpResponse}
     */
    //eslint-disable-next-line no-unused-vars
    transform(httpResponse, resultFromOwSequence) {
    }
}

module.exports.TransformerPipeline = TransformerPipeline;
module.exports.ITransformerPipelineAction = ITransformerPipelineAction;