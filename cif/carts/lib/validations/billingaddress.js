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
const shippingaddress_1 = require("./shippingaddress");
const commerce_cif_hybris_core_1 = require("@diconium/commerce-cif-hybris-core");
const commerce_cif_hybris_validators_1 = require("@diconium/commerce-cif-hybris-validators");
const AddressWrapperMapper_1 = __importDefault(require("../mappers/AddressWrapperMapper"));
exports.post = shippingaddress_1.post;
const ERROR_TYPE = 'BillingAddress';
function deleteBillingAddress(args) {
    const input = new commerce_cif_hybris_validators_1.Validator(args, ERROR_TYPE)
        .setMapper(AddressWrapperMapper_1.default)
        .isNotImplemented()
        .input();
    return new commerce_cif_hybris_core_1.Output({
        accessToken: input.settings.bearer,
        error: input.errorOutput,
        errorType: ERROR_TYPE,
    });
}
exports.del = deleteBillingAddress;
//# sourceMappingURL=billingaddress.js.map