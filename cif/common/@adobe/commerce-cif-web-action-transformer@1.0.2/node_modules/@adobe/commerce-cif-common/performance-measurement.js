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
 * PerformanceMeasurement provides methods to add performance metrics to headers.
 * 
 * To measure the performance of a request, make sure to wrap your HTTP client,
 * similar to the decorateNodeRestClient() method and wrap your OpenWhisk action
 * with decorateActionForSequence().
 * 
 * All requests that have the PERF_ACTIVATE HTTP header set to YES will include
 * performance insights in headers then. If you want to uniquely identify your
 * requests, make sure to give them some kind of ID with the PERF_ACTION_ID header.
 */
class PerformanceMeasurement {

    static get const() {
        return {
            PERF_ACTIVATE: 'Perf-Activate',
            PERF_ACTION_ID: 'Perf-Action-Id',
            PERF_SEQ_START: 'Perf-Ow-Seq-Start',
            PERF_SEQ_END: 'Perf-Ow-Seq-End',
            PERF_BACKEND_REQ_OUT: 'Perf-Backend-Req-Out',
            PERF_BACKEND_REQ_IN: 'Perf-Backend-Req-In',
            PERF_BACKEND_REQ_URL: 'Perf-Backend-Req-Url',
        };
    }

    /**
     * Wraps an exported action and adds logic for performance measurement.
     * Detects the first action in a sequence and adds PERF_SEQ_START header.
     *
     * @param invokeAction  OpenWhisk action
     * @returns {Function}  A wrapped function which performs performance measurement and calls the original one.
     */
    static decorateActionForSequence(invokeAction) {
        return function (params) {
            if (params && !params['seqStart']) {
                params.seqStart = true;
                PerformanceMeasurement.startSequence(params);
            }
            return invokeAction(params);
        };
    }

    /**
     * Wraps the node-rest-client client and adds logic for performance measurement.
     * When a client is wrapped, the execute time of requests is measured in 
     * PERF_BACKEND_REQ_IN and PERF_BACKEND_REQ_OUT headers.
     *
     * @param client    A node-rest-client used for a GET, PUT, POST, or DELETE HTTP call.
     * @param args      OpenWhisk arguments
     * @returns         A client which has the GET, PUT, POST, and DELETE functions wrapped.
     */
    static decorateNodeRestClient(client, args) {
        if (!this.isActive(args)) {
            return client;
        }

        const perfActionId = args.__ow_headers[this.const.PERF_ACTION_ID] || args.__ow_headers[this.const.PERF_ACTION_ID.toLowerCase()];
        args.uri = '';

        const decorate = function (fn, method, url, parameters, callback) {
            args.method = method.toUpperCase();
            const cb = callback;
            callback = function (params) {
                cb(params);
                PerformanceMeasurement.endBackendRequest(args, currentRequestNumber, perfActionId);
            };

            const currentRequestNumber = args.backendRequestCount++;
            PerformanceMeasurement.startBackendRequest(args, currentRequestNumber, perfActionId, url);
            fn(url, parameters, callback);
        };

        const wrapper = function (fn, method) {
            return function (url, parameters, callback) {
                decorate(fn, method, url, parameters, callback);
            };
        };

        const methods = ['get', 'put', 'post', 'delete'];
        for (let i = 0, l = methods.length; i < l; i++) {
            const method = methods[i];
            client[method] = wrapper(client[method], method);
        }

        return client;
    }

    /**
     * Add header to indicate the end of an OpenWhisk sequence.
     *
     * @param args      OpenWhisk arguments
     */
    static endSequence(args) {
        if (args && args.__ow_headers) {
            const perfActionId = args.__ow_headers[this.const.PERF_ACTION_ID] || args.__ow_headers[this.const.PERF_ACTION_ID.toLowerCase()];
            this.logPerfTime(args, [this.const.PERF_SEQ_END, perfActionId].join('-'), false);
        }
    }

    /**
     * Checks if performance measurement is activated for the current request.
     *
     * @param args          OpenWhisk arguments
     * @returns {boolean}   True if performance should be measured and false otherwise.
     */
    static isActive(args) {
        if (!args.__ow_headers) {
            console.warn('__ow_headers not passed. Cannot determine if performance measurement is active.' +
                        ' Assuming is it NOT.');
            return false;
        }

        const perfActivate = args.__ow_headers[this.const.PERF_ACTIVATE] || args.__ow_headers[this.const.PERF_ACTIVATE.toLowerCase()];
        return perfActivate === 'YES';
    }

    /**
     * Add header to indicate the start of a backend request.
     * 
     * @param {*} args              OpenWhisk arguments
     * @param {*} requestCount      Request count
     * @param {*} perfActionId      Current action id
     * @param {*} apiHost           Backend host
     */
    static startBackendRequest(args, requestCount, perfActionId, apiHost) {
        this.logPerfTime(args, [this.const.PERF_BACKEND_REQ_OUT, perfActionId, requestCount].join('-'), true);
        args.response.headers[[this.const.PERF_BACKEND_REQ_URL, perfActionId, requestCount].join('-')] = args.method + ' ' + apiHost + args.uri;
    }
    
    /**
     * Add header to indicate the end of a backend request.
     * 
     * @param {*} args              OpenWhisk arguments
     * @param {*} requestCount      Request count
     * @param {*} perfActionId      Current action id
     */
    static endBackendRequest(args, requestCount, perfActionId) {
        this.logPerfTime(args, [this.const.PERF_BACKEND_REQ_IN, perfActionId, requestCount].join('-'), true);
    }

    /**
     * Add header to indicate the start of an OpenWhisk sequence.
     * 
     * @param {*} args              OpenWhisk arguments
     */
    static startSequence(args) {
        if (args && args.__ow_headers) {
            const perfActionId = args.__ow_headers[this.const.PERF_ACTION_ID] || args.__ow_headers[this.const.PERF_ACTION_ID.toLowerCase()];
            this.logPerfTime(args, [this.const.PERF_SEQ_START, perfActionId].join('-'), false);
            // All actions in sequence share the same request count.
            // If requests contained in the same sequence span across multiple actions, numbering will remain consistent.
            args.backendRequestCount = 0;
        }
    }
    
    /**
     * Add header with a given name and the current timestamp.
     * 
     * @param {*} args                  OpenWhisk arguments
     * @param {*} headerName            Name of the header to be added
     * @param {*} bypassActivation      Bypass the performance logging
     */
    static logPerfTime(args, headerName, bypassActivation) {
        if (!bypassActivation && !this.isActive(args)) {
            return;
        }
    
        const time = new Date().getTime();
        args.response = args.response || {};
        args.response.headers = args.response.headers || {};
        args.response.headers[headerName] = time;
    }

}

module.exports = PerformanceMeasurement;