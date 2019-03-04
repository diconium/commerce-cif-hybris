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
class AssetMapper extends commerce_cif_hybris_core_1.Mapper {
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
        const { galleryIndex, url, } = dto;
        return new commerce_cif_model_1.Asset.Builder()
            .withId(String(galleryIndex))
            .withUrl(this.buildAbsoluteUrl(url))
            .build();
    }
    buildAbsoluteUrl(path) {
        return this.getAssetHost() + path;
    }
    getAssetHost() {
        const { CT_ASSETS_HOST, HB_API_HOST, HB_PROTOCOL, } = this.settings;
        if (CT_ASSETS_HOST) {
            return CT_ASSETS_HOST;
        }
        return `${HB_PROTOCOL}://${HB_API_HOST}`;
    }
}
exports.default = AssetMapper;
//# sourceMappingURL=AssetMapper.js.map