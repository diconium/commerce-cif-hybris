"use strict";
/*
 * Copyright 2019 diconium
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commerce_cif_hybris_core_1 = require("@diconium/commerce-cif-hybris-core");
const GetShippingMethodsClient_1 = __importDefault(require("../clients/GetShippingMethodsClient"));
const ShippingMethodListMapper_1 = __importDefault(require("../mappers/ShippingMethodListMapper"));
const DeleteShippingMethodClient_1 = __importDefault(require("../clients/DeleteShippingMethodClient"));
const PostShippingMethodClient_1 = __importDefault(require("../clients/PostShippingMethodClient"));
const ERROR_TYPE = 'ShippingMethodsError';
function postShippingMethod(input) {
    return new commerce_cif_hybris_core_1.SequenceAction(input)
        .setClient(PostShippingMethodClient_1.default)
        .setErrorType(ERROR_TYPE)
        .activate();
}
exports.post = postShippingMethod;
function deleteShippingMethod(input) {
    return new commerce_cif_hybris_core_1.SequenceAction(input)
        .setClient(DeleteShippingMethodClient_1.default)
        .setErrorType(ERROR_TYPE)
        .activate();
}
exports.del = deleteShippingMethod;
function getShippingMethod(input) {
    return new commerce_cif_hybris_core_1.SimpleAction(input)
        .setMapper(ShippingMethodListMapper_1.default)
        .setClient(GetShippingMethodsClient_1.default)
        .setErrorType(ERROR_TYPE)
        .activate();
}
exports.get = getShippingMethod;
//# sourceMappingURL=shippingmethods.js.map