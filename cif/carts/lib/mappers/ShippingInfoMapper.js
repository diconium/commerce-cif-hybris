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
const commerce_cif_model_1 = require("@adobe/commerce-cif-model");
const commerce_cif_hybris_clients_1 = require("@diconium/commerce-cif-hybris-clients");
const MoneyValueMapper_1 = __importDefault(require("@diconium/commerce-cif-hybris-products/lib/mappers/MoneyValueMapper"));
class ShippingInfoMapper extends commerce_cif_hybris_core_1.Mapper {
    constructor(settings) {
        super(settings);
    }
    mapFromInputArgsToActionParameters(mappable) {
        const { id, shippingMethodId: deliveryModeId, } = mappable;
        return { id, deliveryModeId };
    }
    /* istanbul ignore next */
    mapFromEntity(entity, mappable) {
        throw new Error('Unsupported Operation');
    }
    mapToEntity(dto, entity) {
        const { code, deliveryCost = new commerce_cif_hybris_clients_1.PriceWsDTO(), name, } = dto;
        const moneyValueMapper = new MoneyValueMapper_1.default(this.settings);
        const taxInfo = new commerce_cif_model_1.TaxInfo.Builder()
            .withValue(moneyValueMapper.mapToEntity(deliveryCost))
            .build();
        return new commerce_cif_model_1.ShippingInfo.Builder()
            .withId(code)
            .withName(name ? name : code)
            .withCost(new MoneyValueMapper_1.default(this.settings).mapToEntity(deliveryCost))
            .withTaxInfo(taxInfo)
            .build();
    }
}
exports.default = ShippingInfoMapper;
//# sourceMappingURL=ShippingInfoMapper.js.map