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
const commerce_cif_model_1 = require("@adobe/commerce-cif-model");
class PagedResponseHelper {
    static buildFacet({ facetCode, facetName, facetValueCode, facetValueName, totalResults }) {
        return new commerce_cif_model_1.Facet.Builder()
            .withId(facetCode)
            .withName(facetName)
            .withType('text')
            .withValues(this.buildFacetValues({ facetValueCode, facetValueName, totalResults }))
            .build();
    }
    static buildFacetValue({ facetValueCode, facetValueName, totalResults }) {
        const facetValue = new commerce_cif_model_1.FacetValue.Builder()
            .withId(facetValueCode)
            .withValue(facetValueName)
            .build();
        facetValue.selected = true;
        facetValue.occurrences = totalResults;
        return facetValue;
    }
    static buildFacetValues({ facetValueCode, facetValueName, totalResults }) {
        return [this.buildFacetValue({ facetValueCode, facetValueName, totalResults })];
    }
}
exports.PagedResponseHelper = PagedResponseHelper;
//# sourceMappingURL=PagedResponseHelper.js.map