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
import { PagedResponseShoppingListEntry } from '@adobe/commerce-cif-model';
import { OrderEntryListWsDTO } from '@diconium/commerce-cif-hybris-clients';
import { dahcTranslator } from '@diconium/commerce-cif-hybris-i18n';
import ShoppingListEntryMapper from './ShoppingListEntryMapper';

export default class PagedResponseShoppingListEntryMapper extends Mapper<PagedResponseShoppingListEntry> {

  offset: number = 0;  // TODO: pode-se fazer isto para passar contexto?
  limit: number = 20;

  constructor(settings: InputSettings) {
    super(settings, dahcTranslator);
  }

  mapFromInputArgsToActionParameters(mappable: any) {
    const {
      offset = 0,
      limit = 20,
      id,
    } = mappable;
    this.offset = offset;
    this.limit = limit;

    return { id, pageSize: limit, currentPage: offset / limit };
  }

  /* istanbul ignore next */
  mapFromEntity(entity, mappable?: OrderEntryListWsDTO): OrderEntryListWsDTO {
    throw new Error('Unsupported Operation');
  }

  mapToEntity(dto: OrderEntryListWsDTO, entity?): PagedResponseShoppingListEntry {

    const {
      orderEntries = [],
    } = dto;
    const totalResults = orderEntries.length;

    if (this.offset >= totalResults) {    // Empty result TODO: refactor me
      return new PagedResponseShoppingListEntry.Builder()
        .withResults({})
        .withCount(0)
        .withTotal(0)
        .withOffset(this.offset)
        .build();
    }

    const page = orderEntries.slice(this.offset, this.offset + this.limit);
    const results = page.map(entryDto => new ShoppingListEntryMapper(this.settings).mapToEntity(entryDto));

    const pagedResponseShoppingListEntry = new PagedResponseShoppingListEntry.Builder()
      .withResults(results)
      .withCount(results.length)
      .withTotal(totalResults)
      .withOffset(this.offset)
      .build();

    return pagedResponseShoppingListEntry;
  }
}
