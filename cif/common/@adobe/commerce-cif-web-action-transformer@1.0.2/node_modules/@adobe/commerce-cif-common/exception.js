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
 * Base error for all errors returned by user facing OpenWhisk actions. These are NOT exceptions and are NOT meant
 * to be thrown. They are meant to be returned as response from OpenWhisk actions.
 */
class BaseCcifError {
    constructor(message, cause, name) {
        this.name = name;
        this.message = message;
        this.cause = cause;
    }
}

/**
 * Error returned by used facing actions when the commerce service responds saying a resource was not found.
 */
class CommerceServiceResourceNotFoundError extends BaseCcifError {
    constructor(message, cause) {
        super(message, cause, 'CommerceServiceResourceNotFoundError');
    }
}

/**
 * Error returned by used facing actions when the commerce service responds with bad request.
 */
class CommerceServiceBadRequestError extends BaseCcifError {
    constructor(message, cause) {
        super(message, cause, 'CommerceServiceBadRequestError');
    }
}

/**
 * Error returned by used facing actions when the commerce service responds with forbidden request.
 */
class CommerceServiceForbiddenError extends BaseCcifError {
    constructor(message, cause) {
        super(message, cause, 'CommerceServiceForbiddenError');
    }
}

/**
 * Error returned by used facing actions when the commerce service responds with unauthorized request.
 */
class CommerceServiceUnauthorizedError extends BaseCcifError {
    constructor(message, cause) {
        super(message, cause, 'CommerceServiceUnauthorizedError');
    }
}

/**
 * Error returned when something we did not consider happened.
 */
class UnexpectedError extends BaseCcifError {
    constructor(message, cause) {
        super(message, cause, 'UnexpectedError');
    }
}

/**
 * Error returned when the value for a user facing parameter did not respect the format.
 */
class InvalidArgumentError extends BaseCcifError {
    constructor(message) {
        super(message, { message: 'invalid-argument' }, 'InvalidArgumentError');
    }
}

/**
 * Error returned when a mandatory input parameter is missing.
 */
class MissingPropertyError extends BaseCcifError {
    constructor(message) {
        super(message, { message: 'missing-property' }, 'MissingPropertyError');
    }
}

/**
 * Error returned when an action is not implemented.
 */
class NotImplementedError extends BaseCcifError {
    constructor(message) {
        super(message, { message: 'not-implemented' }, 'NotImplementedError');
    }
}

module.exports.InvalidArgumentError = InvalidArgumentError;
module.exports.MissingPropertyError = MissingPropertyError;
module.exports.CommerceServiceResourceNotFoundError = CommerceServiceResourceNotFoundError;
module.exports.CommerceServiceBadRequestError = CommerceServiceBadRequestError;
module.exports.CommerceServiceForbiddenError = CommerceServiceForbiddenError;
module.exports.CommerceServiceUnauthorizedError = CommerceServiceUnauthorizedError;
module.exports.UnexpectedError = UnexpectedError;
module.exports.NotImplementedError = NotImplementedError;
module.exports.BaseCcifError = BaseCcifError;