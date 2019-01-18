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
import { Attribute, FacetValue } from '@adobe/commerce-cif-model';
import { FacetValueWsDTO, FacetWsDTO } from '@diconium/commerce-cif-hybris-clients';

export default class FacetValueMapper extends Mapper<FacetValue> {

  constructor(settings: InputSettings) {
    super(settings);
  }
  /* istanbul ignore next */
  mapFromInputArgsToActionParameters(mappable: any) {
    throw new Error('Unsupported Operation');
  }
  /* istanbul ignore next */
  mapFromEntity(entity, mappable?: FacetWsDTO): FacetWsDTO {
    throw new Error('Unsupported Operation');
  }

  mapToEntity(dto: FacetValueWsDTO, entity?): FacetValue {

    const {
      selected,
      name = '',
      count,
      query,
    } = dto;

    const value = this.getFacetValue(query.query.value);

    const facetValue = new FacetValue.Builder()
      .withId(name)
      .withValue(value)
      .build();

    facetValue.selected = selected;
    facetValue.occurrences = count;
    return facetValue;
  }

  private getFacetValue(queryValue: string): string {
    const querySplitted = queryValue.split(':');
    return querySplitted[querySplitted.length - 1];
  }
}
