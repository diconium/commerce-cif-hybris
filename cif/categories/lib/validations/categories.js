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
const commerce_cif_hybris_validators_1 = require("@diconium/commerce-cif-hybris-validators");
const CategoryMapper_1 = __importDefault(require("../mappers/CategoryMapper"));
const PagedResponseCategoryMapper_1 = __importDefault(require("../mappers/PagedResponseCategoryMapper"));
const ERROR_TYPE = 'CategoryError';
function getCategoryById(args) {
    return new commerce_cif_hybris_validators_1.Validator(args, ERROR_TYPE)
        .setMapper(CategoryMapper_1.default)
        .checkArguments()
        .mandatoryParameter('id')
        .input();
}
exports.getById = getCategoryById;
function getCategories(args) {
    return new commerce_cif_hybris_validators_1.Validator(args, ERROR_TYPE)
        .setMapper(PagedResponseCategoryMapper_1.default)
        .checkArguments()
        .isInsideInterval('limit', 1)
        .isInsideInterval('offset', 0)
        .input();
}
exports.get = getCategories;
//# sourceMappingURL=categories.js.map