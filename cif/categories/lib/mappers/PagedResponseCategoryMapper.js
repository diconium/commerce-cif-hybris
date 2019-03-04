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
const CategoryMapper_1 = __importDefault(require("./CategoryMapper"));
const commerce_cif_hybris_i18n_1 = require("@diconium/commerce-cif-hybris-i18n");
class PagedResponseCategoryMapper extends commerce_cif_hybris_core_1.Mapper {
    constructor(settings, actionParameters) {
        super(settings, commerce_cif_hybris_i18n_1.dahcTranslator.setLocale(settings.language), actionParameters);
    }
    mapFromInputArgsToActionParameters(mappable) {
        const { sort, offset, limit, type, depth, } = mappable;
        return { sort, offset, limit, type, depth };
    }
    /* istanbul ignore next */
    mapFromEntity(entity, mappable) {
        throw new Error('Unsupported Operation');
    }
    mapToEntity(dto, entity) {
        const { categories, } = dto;
        const { depth, limit = 50, offset = 0, type, } = this.actionParameters;
        let results = [];
        if (type === 'tree') {
            results = this.cutChildren(categories, depth);
        }
        else {
            results = this.flatten(categories);
        }
        const total = results.length;
        results = results.slice(offset, offset + limit);
        const categoryMapper = new CategoryMapper_1.default(this.settings);
        results = results.map(category => categoryMapper.mapToEntity(category));
        return new commerce_cif_model_1.PagedResponseCategory.Builder()
            .withCount(results.length)
            .withTotal(total)
            .withResults(results)
            .build();
    }
    flatten(categories) {
        return categories.reduce((acc, value) => this.flattenReducer(acc, value), []);
    }
    flattenReducer(acc, value) {
        let result = acc;
        result.push(value);
        if (value.subcategories) {
            result = result.concat(this.flatten(value.subcategories));
            delete value.subcategories;
        }
        return result;
    }
    cutChildren(categories = [], depth) {
        const results = [];
        categories.forEach((category) => {
            const categoryDto = this.buildCategoryDto(category);
            if (this.isMaxDepthNotReached(depth)) {
                categoryDto.subcategories = this.cutChildren(category.subcategories, depth - 1);
            }
            results.push(categoryDto);
        });
        return results;
    }
    buildCategoryDto(category) {
        const categoryDto = new commerce_cif_hybris_clients_1.CategoryHierarchyWsDTO();
        categoryDto.id = category.id;
        categoryDto.name = category.name;
        categoryDto.lastModified = category.lastModified;
        categoryDto.subcategories = [];
        return categoryDto;
    }
    isMaxDepthNotReached(depth) {
        return typeof depth === 'undefined' || isNaN(depth) || depth > 0;
    }
}
exports.default = PagedResponseCategoryMapper;
//# sourceMappingURL=PagedResponseCategoryMapper.js.map