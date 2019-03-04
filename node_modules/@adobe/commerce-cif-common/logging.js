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

let globalLog = require('global-request-logger');

module.exports.initLog = function () {

    globalLog.initialize();

    globalLog.on('success', function (request, response) {
        const body = response.body.length <= 200 ? response.body : (response.body.substring(0, 200) + '...');

        console.log('REQUEST:  ' + request.method + ' ' + request.href);
        console.log('RESPONSE: ' + response.statusCode + ' ' + body);
    });
    globalLog.on('error', function (request, response) {
        const body = response.body ?
                   response.body.length <= 200 ? response.body : (response.body.substring(0, 200) + '...') : '';

        console.log('REQUEST:  ' + request.method + ': ' + request.href);
        console.log('RESPONSE: ' + response.statusCode + ': ' + body);
    });

};