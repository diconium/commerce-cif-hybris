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
const carts_1 = require("./carts");
const commerce_cif_hybris_validators_1 = require("@diconium/commerce-cif-hybris-validators");
const ShippingInfoMapper_1 = __importDefault(require("../mappers/ShippingInfoMapper"));
const ShippingMethodListMapper_1 = __importDefault(require("../mappers/ShippingMethodListMapper"));
const ERROR_TYPE = 'ShippingMethodsError';
function postShippingMethod(args) {
    return new commerce_cif_hybris_validators_1.Validator(args, ERROR_TYPE)
        .setMapper(ShippingInfoMapper_1.default)
        .checkArguments()
        .mandatoryParameter('id')
        .mandatoryParameter('shippingMethodId')
        .input();
}
function getShippingMethod(args) {
    return new commerce_cif_hybris_validators_1.Validator(args, ERROR_TYPE)
        .setMapper(ShippingMethodListMapper_1.default)
        .checkArguments()
        .mandatoryParameter('id')
        .input();
}
exports.post = postShippingMethod;
exports.get = getShippingMethod;
exports.del = carts_1.deleteById;
//# sourceMappingURL=shippingmethods.js.map