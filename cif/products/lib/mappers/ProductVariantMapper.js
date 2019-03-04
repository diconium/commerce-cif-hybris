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
Object.defineProperty(exports, "__esModule", { value: true });
const commerce_cif_hybris_core_1 = require("@diconium/commerce-cif-hybris-core");
const commerce_cif_model_1 = require("@adobe/commerce-cif-model");
const ProductsHelper_1 = require("../helpers/ProductsHelper");
const commerce_cif_hybris_i18n_1 = require("@diconium/commerce-cif-hybris-i18n");
class ProductVariantMapper extends commerce_cif_hybris_core_1.Mapper {
    constructor(settings) {
        super(settings, commerce_cif_hybris_i18n_1.dahcTranslator);
    }
    /* istanbul ignore next */
    mapFromInputArgsToActionParameters(mappable) {
        throw new Error('Unsupported Operation');
    }
    /* istanbul ignore next */
    mapFromEntity(entity, mappable) {
        throw new Error('Unsupported Operation');
    }
    mapToEntity(dto, entity) {
        const { code, priceData, stock, variantOptionQualifiers, } = dto;
        const variant = new commerce_cif_model_1.ProductVariant.Builder()
            .withId(code)
            .withName(this.getVariantName(variantOptionQualifiers))
            .withPrices(ProductsHelper_1.ProductsHelper.pushPrice(priceData, this.settings))
            .withAvailable(stock && stock.stockLevelStatus === 'inStock')
            .withSku(code)
            .build();
        if (variantOptionQualifiers) {
            variant.attributes = variantOptionQualifiers
                .map(attribute => this.mapAttribute(attribute));
        }
        return variant;
    }
    mapAttribute(attribute) {
        const { qualifier, name = qualifier, value } = attribute;
        const mappedAttribute = new commerce_cif_model_1.Attribute.Builder()
            .withId(qualifier)
            .withName(name)
            .withValue(value);
        mappedAttribute.isVariantAxis = true;
        return mappedAttribute;
    }
    getVariantName(variantOptionQualifiers) {
        let name = '';
        if (variantOptionQualifiers) {
            const nameQualifier = variantOptionQualifiers.find(qualifier => qualifier.qualifier === 'name');
            if (nameQualifier) {
                name = nameQualifier.value;
            }
        }
        return name;
    }
}
exports.default = ProductVariantMapper;
//# sourceMappingURL=ProductVariantMapper.js.map