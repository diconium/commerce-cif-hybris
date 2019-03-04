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
class ProductMapper extends commerce_cif_hybris_core_1.Mapper {
    constructor(settings) {
        super(settings, commerce_cif_hybris_i18n_1.dahcTranslator);
    }
    mapFromInputArgsToActionParameters(mappable) {
        const { id, } = mappable;
        return { id };
    }
    /* istanbul ignore next */
    mapFromEntity(entity, mappable) {
        throw new Error('Unsupported Operation');
    }
    mapToEntity(dto, entity) {
        const { baseProduct, code: id, categories = [], description, images, name = '', price, variantOptions, } = dto;
        const product = new commerce_cif_model_1.Product.Builder()
            .withMasterVariantId(baseProduct)
            .withId(id)
            .withName(name)
            .withPrices([])
            .withVariants([])
            .build();
        product.prices = ProductsHelper_1.ProductsHelper.pushPrice(price, this.settings);
        product.categories = ProductsHelper_1.ProductsHelper.buildCategories(categories, this.settings);
        product.description = description;
        product.attributes = ProductsHelper_1.ProductsHelper.buildAttributes(dto, this.translationService);
        product.variants = ProductsHelper_1.ProductsHelper.pushProductVariant(variantOptions, this.settings);
        product.assets = ProductsHelper_1.ProductsHelper.buildAssets(images, this.settings);
        return product;
    }
}
exports.default = ProductMapper;
//# sourceMappingURL=ProductMapper.js.map