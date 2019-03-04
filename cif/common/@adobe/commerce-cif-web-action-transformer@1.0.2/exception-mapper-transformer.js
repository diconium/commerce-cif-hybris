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
const ErrorResponse = require('@adobe/commerce-cif-model').ErrorResponse;

const ERROR_NAME_TO_STATUS_CODE = {
    'InvalidArgumentError': HttpStatusCodes.BAD_REQUEST,
    'MissingPropertyError': HttpStatusCodes.BAD_REQUEST,
    'CommerceServiceResourceNotFoundError': HttpStatusCodes.NOT_FOUND,
    'CommerceServiceBadRequestError': HttpStatusCodes.BAD_REQUEST,
    'CommerceServiceForbiddenError': HttpStatusCodes.FORBIDDEN,
    'CommerceServiceUnauthorizedError': HttpStatusCodes.UNAUTHORIZED,
    'NotImplementedError': HttpStatusCodes.NOT_IMPLEMENTED
};

/**
 * If the action ended with an error, this transformer maps the error to a status code and updates the response message.
 *
 * @extends ITransformerPipelineAction
 */
class ExceptionMapperTransformerPipelineAction extends ITransformerPipelineAction {
    transform(httpResponse, resultFromOwSequence) {
        if (!httpResponse.error) {
            return httpResponse;
        }

        let message;
        let reason;
        let type;

        // Set message and status code
        if (ERROR_NAME_TO_STATUS_CODE[httpResponse.error.name]) {
            message = `${httpResponse.error.name}: ${httpResponse.error.message}`;
            httpResponse.statusCode = ERROR_NAME_TO_STATUS_CODE[httpResponse.error.name];
        } else {
            message = `UnexpectedError: ${httpResponse.error.message}`;
            httpResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
        }

        // Set the reason
        if (httpResponse.error.cause && httpResponse.error.cause.message) {
            reason = httpResponse.error.cause.message;
        } else {
            reason = 'unknown reason';
        }

        // Set the type
        if (resultFromOwSequence && resultFromOwSequence.response && resultFromOwSequence.response.errorType) {
            type = resultFromOwSequence.response.errorType;
        } else {
            type = 'unknown type';
        }

        let error = new ErrorResponse.Builder()
            .withMessage(message)
            .withReason(reason)
            .withType(type)
            .build();

        httpResponse.setBody(error);
        return httpResponse;
    }
}

module.exports = ExceptionMapperTransformerPipelineAction;