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
const ProductVariantMapper_1 = __importDefault(require("../mappers/ProductVariantMapper"));
const MoneyValueMapper_1 = __importDefault(require("../mappers/MoneyValueMapper"));
const CategoryMapper_1 = __importDefault(require("../mappers/CategoryMapper"));
const AssetMapper_1 = __importDefault(require("../mappers/AssetMapper"));
const commerce_cif_model_1 = require("@adobe/commerce-cif-model");
const FacetValueMapper_1 = __importDefault(require("../mappers/FacetValueMapper"));
class ProductsHelper {
    static pushProductVariant(variantOption, settings) {
        if (variantOption) {
            return variantOption.map(variant => new ProductVariantMapper_1.default(settings).mapToEntity(variant));
        }
        return [];
    }
    static pushPrice(price, settings) {
        const prices = [];
        if (price) {
            prices.push(new MoneyValueMapper_1.default(settings).mapToEntity(price));
        }
        return prices;
    }
    static buildAttributes(dto, translationService) {
        const attributes = ['manufacturer', 'averageRating', 'numberOfReviews', 'availableForPickup', 'summary'];
        return attributes
            .filter(attribute => dto[attribute])
            .map(attribute => this.buildAttribute(attribute, dto, translationService));
    }
    static buildAttribute(attribute, dto, translationService) {
        return new commerce_cif_model_1.Attribute.Builder()
            .withId(attribute)
            .withName(translationService.translate(attribute))
            .withValue(dto[attribute])
            .build();
    }
    static buildCategories(categories, settings) {
        return categories.map(category => new CategoryMapper_1.default(settings).mapToEntity(category));
    }
    static buildAssets(images, settings) {
        if (images) {
            return images.map(image => new AssetMapper_1.default(settings).mapToEntity(image));
        }
        return [];
    }
    static mapFacetValues(facetValuesDto, settings) {
        return facetValuesDto.map(facetValue => new FacetValueMapper_1.default(settings).mapToEntity(facetValue));
    }
}
exports.ProductsHelper = ProductsHelper;
//# sourceMappingURL=ProductsHelper.js.map