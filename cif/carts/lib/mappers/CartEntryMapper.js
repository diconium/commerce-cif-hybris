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
const ProductMapper_1 = __importDefault(require("@diconium/commerce-cif-hybris-products/lib/mappers/ProductMapper"));
class CartEntryMapper extends commerce_cif_hybris_core_1.Mapper {
    constructor(settings) {
        super(settings);
    }
    mapFromInputArgsToActionParameters(mappable) {
        const { id, productVariantId, quantity, cartEntryId, } = mappable;
        const orderEntry = this.mapFromEntity({
            productVariantId,
            quantity,
            cartEntryId,
        });
        return {
            id,
            cartEntryId,
            entry: orderEntry,
        };
    }
    mapFromEntity(entity, mappable) {
        const orderEntry = new commerce_cif_hybris_clients_1.OrderEntryWsDTO();
        const product = new commerce_cif_hybris_clients_1.ProductWsDTO();
        product.code = entity.productVariantId;
        orderEntry.product = product;
        orderEntry.quantity = entity.quantity;
        orderEntry.entryNumber = entity.cartEntryId;
        return orderEntry;
    }
    mapToEntity(dto, entity) {
        const { basePrice, entryNumber, product, quantity, totalPrice, } = dto;
        const moneyValueMapper = new MoneyValueMapper_1.default(this.settings);
        const cartEntry = new commerce_cif_model_1.CartEntry.Builder()
            .withId(String(entryNumber))
            .withQuantity(quantity)
            .withProductVariant(this.mapProductVariant(product))
            .withPrice(moneyValueMapper.mapToEntity(totalPrice))
            .withUnitPrice(moneyValueMapper.mapToEntity(basePrice))
            .withType('REGULAR')
            .build();
        return cartEntry;
    }
    mapProductVariant(product) {
        const productVariant = new ProductMapper_1.default(this.settings).mapToEntity(product);
        const { variants } = productVariant;
        if (variants[0]) {
            productVariant.attributes = [...productVariant.attributes, variants[0].attributes];
        }
        productVariant.variants = undefined;
        productVariant.sku = productVariant.id;
        return productVariant;
    }
}
exports.default = CartEntryMapper;
//# sourceMappingURL=CartEntryMapper.js.map