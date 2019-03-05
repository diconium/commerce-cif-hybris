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

import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { PagedResponseShoppingList } from '@adobe/commerce-cif-model';
import { CartListWsDTO } from '@diconium/commerce-cif-hybris-clients';
import { dahcTranslator } from '@diconium/commerce-cif-hybris-i18n';
import ShoppingListMapper from './ShoppingListMapper';

export default class PagedResponseShoppingListMapper extends Mapper<PagedResponseShoppingList> {

  offset: number = 0;  // TODO: pode-se fazer isto para passar contexto?
  limit: number = 20;

  constructor(settings: InputSettings) {
    super(settings, dahcTranslator);
  }

  mapFromInputArgsToActionParameters(mappable: any) {
    const {
      offset = 0,
      limit = 20,
    } = mappable;
    this.offset = offset;
    this.limit = limit;

    return { pageSize: limit, currentPage: String(offset / limit) };
  }

  /* istanbul ignore next */
  mapFromEntity(entity, mappable?: CartListWsDTO): CartListWsDTO {
    throw new Error('Unsupported Operation');
  }

  mapToEntity(dto: CartListWsDTO, entity?): PagedResponseShoppingList {

    const {
      carts = [],
    } = dto;

    const totalResults = carts.length;   // TODO: como saber o total real?  fazer outra chamada com "fields = BASIC" e sem limites para saber?
    const results = carts.map(cartDto => new ShoppingListMapper(this.settings).mapToEntity(cartDto));

    const pagedResponseShoppingList = new PagedResponseShoppingList.Builder()
      .withResults(results)
      .withCount(results.length)
      .withTotal(totalResults)
      .withOffset(this.offset)
      .build();

    return pagedResponseShoppingList;
  }
}
