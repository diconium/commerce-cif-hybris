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
class FacetMapper extends commerce_cif_hybris_core_1.Mapper {
    constructor(settings) {
        super(settings);
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
        const { multiSelect, name = '', values = [], } = dto;
        const id = this.getFacetId(values[0]);
        const facet = new commerce_cif_model_1.Facet.Builder()
            .withId(id)
            .withName(name)
            .withType('text')
            .withValues(ProductsHelper_1.ProductsHelper.mapFacetValues(values, this.settings))
            .build();
        facet.multiSelect = multiSelect;
        return facet;
    }
    getFacetId(facetValueWsDTO) {
        const valueSplited = facetValueWsDTO.query.query.value.split(':');
        return valueSplited[valueSplited.length - 2];
    }
}
exports.default = FacetMapper;
//# sourceMappingURL=FacetMapper.js.map