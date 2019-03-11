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

import { DTO, InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { ShoppingList } from '@adobe/commerce-cif-model';
import { CartWsDTO } from '@diconium/commerce-cif-hybris-clients';
import ShoppingListEntryMapper from './ShoppingListEntryMapper';

export default class ShoppingListMapper extends Mapper<ShoppingList> {

  constructor(settings: InputSettings) {
    super(settings);
  }

  mapFromInputArgsToActionParameters(mappable: any) {
    const {
      id,
      name,
    } = mappable;

    return { id, name };
  }

  /* istanbul ignore next */
  mapFromEntity(entity, mappable?: DTO): DTO {
    throw new Error('Unsupported Operation');
  }

  mapToEntity(dto: CartWsDTO, entity?: ShoppingList): ShoppingList {
    const {
      code,
      entries = [],
      name,
      description,
    } = dto;

    const shoppingList = new ShoppingList.Builder()
      .withId(code)
      .withName(name)
      .withEntries(entries.map(entry => new ShoppingListEntryMapper(this.settings).mapToEntity(entry)))
      .build();

    if (description) {
      shoppingList.description = description;
    }

    return shoppingList;
  }
}
