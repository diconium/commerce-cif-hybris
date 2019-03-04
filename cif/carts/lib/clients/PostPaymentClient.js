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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commerce_cif_hybris_clients_1 = require("@diconium/commerce-cif-hybris-clients");
class PostPaymentClient extends commerce_cif_hybris_clients_1.HttpClient {
    constructor(input) {
        super(input);
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            const { bearer, customerId, } = this.input.settings;
            const { id, payment, } = this.input.parameters;
            payment.billingAddress = this.getBillingAddress(yield this.getAddressesDto());
            return this.post(`/users/${customerId}/carts/${id}/paymentdetails`, payment, { bearer })
                .then(paymentDto => paymentDto)
                .catch(errorOutput => Promise.reject(errorOutput));
        });
    }
    getAddressesDto() {
        return __awaiter(this, void 0, void 0, function* () {
            const { bearer, customerId, } = this.input.settings;
            return yield this.get(`/users/${customerId}/addresses`, { bearer, queryParameters: { fields: 'FULL' } });
        });
    }
    getBillingAddress(addressesDto) {
        return addressesDto.addresses
            .find(address => this.isBillingAddress(address));
    }
    isBillingAddress(address) {
        return address.defaultAddress === true;
    }
}
exports.default = PostPaymentClient;
//# sourceMappingURL=PostPaymentClient.js.map