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
import { Attribute, Facet } from '@adobe/commerce-cif-model';
import { FacetValueWsDTO, FacetWsDTO } from '@diconium/commerce-cif-hybris-clients';
import { ProductsHelper } from '../helpers/ProductsHelper';

export default class FacetMapper extends Mapper<Facet> {

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

  mapToEntity(dto: FacetWsDTO, entity?): Facet {

    const {
      name = '',
      multiSelect,
      values = [],
    } = dto;

    const id = this.getFacetId(values[0]);

    const facet = new Facet.Builder()
      .withId(id)
      .withName(name)
      .withType('text')
      .withValues(ProductsHelper.mapFacetValues(values, this.settings))
      .build();

    facet.multiSelect = multiSelect;
    return facet;
  }

  private getFacetId(facetValueWsDTO: FacetValueWsDTO) {
    const valueSplited = facetValueWsDTO.query.query.value.split(':');
    return valueSplited[valueSplited.length - 2];
  }
}
