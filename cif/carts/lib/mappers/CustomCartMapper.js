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
const CartMapper_1 = __importDefault(require("./CartMapper"));
const CustomMoneyValueMapper_1 = __importDefault(require("../../../products/src/mappers/CustomMoneyValueMapper"));
class CustomCartMapper extends CartMapper_1.default {
    constructor(settings) {
        super(settings);
    }
    mapToEntity(dto, entity) {
        const cart = super.mapToEntity(dto, entity, new CustomMoneyValueMapper_1.default(this.settings));
        return cart;
    }
}
exports.default = CustomCartMapper;
//# sourceMappingURL=CustomCartMapper.js.map