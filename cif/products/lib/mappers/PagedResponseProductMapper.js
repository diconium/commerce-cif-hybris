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
const ProductMapper_1 = __importDefault(require("./ProductMapper"));
const FacetMapper_1 = __importDefault(require("./FacetMapper"));
const PagedResponseHelper_1 = require("../helpers/PagedResponseHelper");
const commerce_cif_hybris_i18n_1 = require("@diconium/commerce-cif-hybris-i18n");
class PagedResponseProductMapper extends commerce_cif_hybris_core_1.Mapper {
    constructor(settings) {
        super(settings, commerce_cif_hybris_i18n_1.dahcTranslator);
    }
    mapFromInputArgsToActionParameters(mappable) {
        const { text = '', selectedFacets = '', sort = '', offset = 0, limit = 20, } = mappable;
        const facets = selectedFacets.replace('|', ':');
        return { query: `${text}:${sort}:${facets}`, pageSize: limit, currentPage: offset / limit };
    }
    /* istanbul ignore next */
    mapFromEntity(entity, mappable) {
        throw new Error('Unsupported Operation');
    }
    mapToEntity(dto, entity) {
        const { products = [], pagination, facets, breadcrumbs, } = dto;
        const { totalResults, currentPage, pageSize, } = pagination;
        const results = products.map(productDto => new ProductMapper_1.default(this.settings).mapToEntity(productDto));
        const pagedResponseProduct = new commerce_cif_model_1.PagedResponseProduct.Builder()
            .withResults(results)
            .withCount(results.length)
            .withTotal(totalResults)
            .withOffset(currentPage * pageSize)
            .build();
        if (facets) {
            pagedResponseProduct.facets = facets.map(facetDto => new FacetMapper_1.default(this.settings).mapToEntity(facetDto));
        }
        if (breadcrumbs) {
            breadcrumbs.forEach((breadcrumb) => {
                const facet = pagedResponseProduct.facets.find(facet => facet.name === breadcrumb.facetName);
                if (facet) {
                    this.updateFacetFromBreadcrumb(breadcrumb, facet, totalResults);
                }
                else {
                    pagedResponseProduct.facets.push(this.buildFacetFromBreadcrumb(breadcrumb, totalResults));
                }
            });
        }
        return pagedResponseProduct;
    }
    updateFacetFromBreadcrumb({ facetCode, facetValueCode, facetValueName }, facet, totalResults) {
        const facetValue = facet.values.find(value => value.id === facetValueCode);
        facet.id = facetCode;
        if (facetValue) {
            facetValue.id = facetValueName;
            facetValue.value = facetValueCode;
        }
        else {
            if (!facet.values) {
                facet.values = [];
            }
            facet.values.push(PagedResponseHelper_1.PagedResponseHelper.buildFacetValue({ facetValueCode, facetValueName, totalResults }));
        }
    }
    buildFacetFromBreadcrumb({ facetName, facetCode, facetValueCode, facetValueName }, totalResults) {
        return PagedResponseHelper_1.PagedResponseHelper.buildFacet({
            facetCode,
            facetName,
            facetValueCode,
            facetValueName,
            totalResults,
        });
    }
}
exports.default = PagedResponseProductMapper;
//# sourceMappingURL=PagedResponseProductMapper.js.map