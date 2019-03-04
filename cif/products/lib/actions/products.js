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
const GetProductByIdClient_1 = __importDefault(require("../clients/GetProductByIdClient"));
const ProductMapper_1 = __importDefault(require("../mappers/ProductMapper"));
const SearchProductClient_1 = __importDefault(require("../clients/SearchProductClient"));
const PagedResponseProductMapper_1 = __importDefault(require("../mappers/PagedResponseProductMapper"));
const ERROR_TYPE = 'ProductError';
function getProductById(input) {
    return new commerce_cif_hybris_core_1.SimpleAction(input)
        .setMapper(ProductMapper_1.default)
        .setClient(GetProductByIdClient_1.default)
        .setErrorType(ERROR_TYPE)
        .activate();
}
exports.getById = getProductById;
function searchProducts(input) {
    return new commerce_cif_hybris_core_1.SimpleAction(input)
        .setMapper(PagedResponseProductMapper_1.default)
        .setClient(SearchProductClient_1.default)
        .setErrorType(ERROR_TYPE)
        .activate();
}
exports.search = searchProducts;
//# sourceMappingURL=products.js.map