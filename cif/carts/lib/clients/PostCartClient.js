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
const commerce_cif_hybris_clients_1 = require("@diconium/commerce-cif-hybris-clients");
const CartEntryMapper_1 = __importDefault(require("../mappers/CartEntryMapper"));
class GetCartByIdClient extends commerce_cif_hybris_clients_1.HttpClient {
    constructor(input) {
        super(input);
    }
    exec() {
        const { bearer, customerId, } = this.input.settings;
        const { curr, } = this.input.parameters;
        return this.post(`/users/${customerId}/carts`, {}, { bearer, queryParameters: { curr, fields: 'FULL' } })
            .then(cartDto => this.modifyInputs(cartDto))
            .catch(errorOutput => Promise.reject(errorOutput));
    }
    modifyInputs(cartDto) {
        this.input.settings.customerId === 'current' ? this.input.parameters.id = cartDto.code : this.input.parameters.id = cartDto.guid;
        const { quantity = 1, productVariantId, } = this.input.parameters;
        if (productVariantId) {
            const orderEntry = new CartEntryMapper_1.default(this.input.settings).mapFromEntity({ quantity, productVariantId });
            this.input.parameters.entry = orderEntry;
        }
        return cartDto;
    }
}
exports.default = GetCartByIdClient;
//# sourceMappingURL=PostCartClient.js.map