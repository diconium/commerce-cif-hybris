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

let PerformanceMeasurement = require('@adobe/commerce-cif-common/performance-measurement.js');

const TransformerPipeline = require('./transformer-pipeline').TransformerPipeline;
const ExceptionMapperTransformerPipelineAction = require('./exception-mapper-transformer');
const CachingHeadersTransformerPipelineAction = require('./caching-headers-transformer');
const PerformanceHeadersTransformerPipelineAction = require('./performance-headers-transformer');


/**
 * Generic action result transform which converts the result of the previous action into a JSON format used by web
 * actions. Optionally it can be used to set a Cache-Control header.
 */
function transformer(args) {
    let pipeline = new TransformerPipeline();
    pipeline.pushTransformer(new ExceptionMapperTransformerPipelineAction());
    pipeline.pushTransformer(new CachingHeadersTransformerPipelineAction());
    pipeline.pushTransformer(new PerformanceHeadersTransformerPipelineAction());

    const response = pipeline.perform(args).toJson();
    PerformanceMeasurement.endSequence({response: response, __ow_headers: args.__ow_headers});
    return response;
}

module.exports.main = transformer;