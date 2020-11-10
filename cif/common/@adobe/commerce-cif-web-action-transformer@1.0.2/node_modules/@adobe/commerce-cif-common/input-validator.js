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

const InvalidArgumentError = require('./exception').InvalidArgumentError;
const MissingPropertyError = require('./exception').MissingPropertyError;

/**
 * Collection of validators for user input.
 */
class InputValidator {

    static get PRODUCT_VARIANT_ID_REGEXP() {
        return /^([0-9a-z-]+?)-([\d]{1,3})$/;
    }

    static get CART_ENTRY_ID_REGEXP() {
        return /^([0-9a-z-])+$/;
    }

    constructor(args, errorType) {

        /**
         * The arguments received by OpenWhisk action. It is used to search all validated properties.
         *
         * @type {Object}
         */
        this.args = args;

        /**
         * The first error found while validating.
         *
         * @type {BaseCcifError}
         */
        this.error = null;

        /**
         * The error type for ErrorResponse.
         */
        this.errorType = errorType;
    }

    /**
     * Ensures that the parameter is present.
     *
     * @param {String} parameterName  Name of the parameter to validate.
     * @returns {InputValidator}      Returns 'this' so methods can be chained.
     */
    mandatoryParameter(parameterName) {
        if (this.error) {
            return this;
        }
        if (typeof this.args[parameterName] === 'undefined') {
            this.error = new MissingPropertyError(`Parameter '${parameterName}' is missing.`);
        }
        return this;
    }

    /**
     * If the parameter is set, checks if it is currency code as pe ISO 4217.
     * If the parameter is not set the check will pass. To enforce this parameter must have a value use 'mandatoryPrameter' or 'atLeastOneParameter'.
     *
     * @param {String} parameterName  Name of the parameter to validate.
     * @returns {InputValidator}      Returns 'this' so methods can be chained.
     */
    isCurrencyCode(parameterName) {
        if (this.error) {
            return this;
        }
        const reg = /^([A-Za-z]){3}$/;
        const parameterValue = this.args[parameterName];
        if (typeof parameterValue !== 'undefined' && !reg.exec(parameterValue)) {
            this.error = new InvalidArgumentError(`Invalid currency code '${parameterValue}'`);
        }
        return this;
    }

    /**
     * If the parameter is set, checks if its value represents an integer. The value can be a string as long as it
     * only contains an integer number.
     * If the parameter is not set the check will pass. To enforce this parameter must have a value use 'mandatoryPrameter' or 'atLeastOneParameter'.
     *
     * @param {String} parameterName  Name of the parameter to validate.
     * @returns {InputValidator}      Returns 'this' so methods can be chained.
     */
    isInteger(parameterName) {
        if (this.error) {
            return this;
        }
        const parameterValue = this.args[parameterName];
        if (typeof parameterValue !== 'undefined' && !Number.isInteger(parseFloat(parameterValue))) {
            this.error = new InvalidArgumentError(`Parameter '${parameterName}' must be an integer`);
        }
        return this;
    }

    /**
     * If the parameter is set, checks if its value is a number and is inside the interval determined by [left, right].
     * Either one of the interval edges can be missing and it will have the default value of infinity
     * (i.e. in case left side is missing, the interval is considered to be (-infinity, right] ).
     * If the parameter is not set the check will pass. To enforce this parameter must have a value use 'mandatoryPrameter' or 'atLeastOneParameter'.
     *
     * @param {String} parameterName Name of the parameter to validate.
     * @param {Number} left          Left edge of the closed interval. If it is missing, the interval is considered to be (-infinity, right].
     * @param {Number} right         Right edge of the closed interval. If it is missing, the interval is consodered to be [left, infinity).
     */
    isInsideInterval(parameterName, left, right) {
        if (this.error) {
            return this;
        }
        const parameterValue = this.args[parameterName];
        if (typeof parameterValue === 'undefined') {
            // Parameter is not mandatory. If it does not have a value do not throw an error.
            return this;
        }
        const numericalValue = parseFloat(parameterValue);
        if (!Number.isFinite(numericalValue)) {
            // If the parameter cannot be parsed to a finite number it can not be part of an interval.
            this.error = new InvalidArgumentError(`Parameter '${parameterName}' must have a numerical value`);
            return this;
        }

        if (typeof left === 'undefined' && typeof right === 'undefined') {
            // If both of the interval edges are missing, ignore the check.
            return this;
        }

        if ((typeof left !== 'undefined' && numericalValue < left) || (typeof right !== 'undefined' && numericalValue > right)) {
            let message;
            if (typeof left !== 'undefined' && typeof right !== 'undefined') {
                message = `in interval [${left}, ${right}]`;
            } else if (typeof left !== 'undefined') {
                message = `greater or equal to ${left}`;
            } else {
                message = `lower or equal to ${right}`;
            }
            this.error = new InvalidArgumentError(`Parameter '${parameterName}' must be ${message}`);
        }

        return this;
    }

    /**
     * If the parameter is set, checks if its value matches a regular expression.
     * If the parameter is not set the check will pass. To enforce this parameter must have a value use 'mandatoryPrameter' or 'atLeastOneParameter'.
     *
     * @param {String} parameterName  Name of the parameter to validate.
     * @param {RegExp} regexp         A regular exception which the value must match.
     * @returns {InputValidator}      Returns 'this' so methods can be chained.
     */
    matchRegexp(parameterName, regexp) {
        if (this.error) {
            return this;
        }
        const parameterValue = this.args[parameterName];
        if (typeof parameterValue !== 'undefined' && !regexp.exec(parameterValue)) {
            this.error = new InvalidArgumentError(
                `Invalid value '${parameterValue}' for property '${parameterName}'. Must match ${regexp.toString()}`);
        }
        return this;
    }

    /**
     * Checks if the args received from OpenWhisk action are present.
     *
     * @returns {InputValidator} Returns 'this' so methods can be chained.
     */
    checkArguments() {
        if (this.error) {
            return this;
        }
        if (typeof this.args === 'undefined' || !this.args) {
            this.error = new InvalidArgumentError('invalid arguments');
        }
        return this;
    }

    /**
     * Checks if at least one of the parameters names specified is present in the input.
     *
     * @param {String[]} parameterNames   A list of parameter names.
     * @returns {InputValidator}          Returns 'this' so methods can be chained.
     */
    atLeastOneParameter(parameterNames) {
        if (this.error) {
            return this;
        }
        let union = parameterNames.map(parameterName => this.args[parameterName])
                                  .reduce((currentResult, parameterValue) => currentResult || parameterValue, false);
        if (!union) {
            this.error = new MissingPropertyError(
                `At least one parameter from [${parameterNames.join(', ')}] must be specified.`);
        }
        return this;
    }

    /**
     * Builds an error response which can be returned directly from the actions.
     *
     * @returns {Promise.<Object>}
     */
    buildErrorResponse() {
        this.args = this.args || {};
        this.args['response'] = {'error': this.error};

        if (this.errorType) {
            this.args.response.errorType = this.errorType;
        }

        return Promise.resolve(this.args);
    }
}

module.exports = InputValidator;