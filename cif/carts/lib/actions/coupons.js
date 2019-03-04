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
const PostCouponClient_1 = __importDefault(require("../clients/PostCouponClient"));
const DeleteCouponClient_1 = __importDefault(require("../clients/DeleteCouponClient"));
const ERROR_TYPE = 'CartError';
function postCoupon(input) {
    return new commerce_cif_hybris_core_1.SequenceAction(input)
        .setClient(PostCouponClient_1.default)
        .setErrorType(ERROR_TYPE)
        .activate();
}
exports.post = postCoupon;
function deleteCouponById(input) {
    return new commerce_cif_hybris_core_1.SequenceAction(input)
        .setClient(DeleteCouponClient_1.default)
        .setErrorType(ERROR_TYPE)
        .activate();
}
exports.deleteById = deleteCouponById;
//# sourceMappingURL=coupons.js.map