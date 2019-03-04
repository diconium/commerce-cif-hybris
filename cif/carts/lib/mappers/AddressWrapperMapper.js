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
const AddressMapper_1 = __importDefault(require("./AddressMapper"));
class AddressWrapperMapper extends commerce_cif_hybris_core_1.Mapper {
    constructor(settings) {
        super(settings);
    }
    mapFromInputArgsToActionParameters(mappable) {
        const { address, id, } = mappable;
        return { id, address: this.mapFromEntity(address) };
    }
    mapFromEntity(entity, mappable) {
        return new AddressMapper_1.default(this.settings).mapFromEntity(entity);
    }
    /* istanbul ignore next */
    mapToEntity(dto, entity) {
        throw new Error('Unsupported Operation');
    }
}
exports.default = AddressWrapperMapper;
//# sourceMappingURL=AddressWrapperMapper.js.map