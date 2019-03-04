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
const commerce_cif_hybris_clients_1 = require("@diconium/commerce-cif-hybris-clients");
class SearchProductClient extends commerce_cif_hybris_clients_1.HttpClient {
    constructor(input) {
        super(input);
    }
    exec() {
        return this.get('/products/search', { queryParameters: this.buildQueryParameters() })
            .then(productSearchPageDto => productSearchPageDto)
            .catch(errorOutput => Promise.reject(errorOutput));
    }
    buildQueryParameters() {
        return Object.assign({}, this.input.parameters, { fields: 'FULL' });
    }
}
exports.default = SearchProductClient;
//# sourceMappingURL=SearchProductClient.js.map