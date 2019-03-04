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
const commerce_cif_hybris_validators_1 = require("@diconium/commerce-cif-hybris-validators");
const CartEntryMapper_1 = __importDefault(require("../mappers/CartEntryMapper"));
const ERROR_TYPE = 'CartError';
function postCartEntry(args) {
    return new commerce_cif_hybris_validators_1.Validator(args, ERROR_TYPE)
        .setMapper(CartEntryMapper_1.default)
        .checkArguments()
        .mandatoryParameter('id')
        .mandatoryParameter('productVariantId')
        .mandatoryParameter('quantity')
        .isInteger('quantity')
        .isInsideInterval('quantity', 1)
        .input();
}
exports.post = postCartEntry;
function putCartEntry(args) {
    return new commerce_cif_hybris_validators_1.Validator(args, ERROR_TYPE)
        .setMapper(CartEntryMapper_1.default)
        .checkArguments()
        .mandatoryParameter('id')
        .mandatoryParameter('cartEntryId')
        .mandatoryParameter('quantity')
        .isInteger('quantity')
        .isInsideInterval('quantity', 0)
        .input();
}
exports.put = putCartEntry;
function deleteCartEntry(args) {
    return new commerce_cif_hybris_validators_1.Validator(args, ERROR_TYPE)
        .setMapper(CartEntryMapper_1.default)
        .checkArguments()
        .mandatoryParameter('id')
        .mandatoryParameter('cartEntryId')
        .input();
}
exports.deleteById = deleteCartEntry;
//# sourceMappingURL=entries.js.map