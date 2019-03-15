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

  constructor(settings: InputSettings, actionParameters?: any) {
    super(settings, dahcTranslator.setLocale(settings.language), actionParameters);
  }

  mapFromInputArgsToActionParameters(mappable: any) {
    const {
      id,
      offset,
      limit,
    } = mappable;

    return { id, limit, offset };
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

    const {
      limit = 20,
      offset = 0,
    } = this.actionParameters;

    if (offset >= totalResults) {
      return new PagedResponseShoppingListEntry.Builder()
        .withResults({})
        .withCount(0)
        .withTotal(0)
        .withOffset(offset)
        .build();
    }

    const page = orderEntries.slice(offset, offset + limit);
    const results = page.map(entryDto => new ShoppingListEntryMapper(this.settings).mapToEntity(entryDto));

    return new PagedResponseShoppingListEntry.Builder()
      .withResults(results)
      .withCount(results.length)
      .withTotal(totalResults)
      .withOffset(offset)
      .build();
  }
}
