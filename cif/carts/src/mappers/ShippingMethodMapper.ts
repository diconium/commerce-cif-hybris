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
import { ShippingMethod } from '@adobe/commerce-cif-model';
import { DeliveryModeWsDTO, PriceWsDTO } from '@diconium/commerce-cif-hybris-clients';
import MoneyValueMapper from '@diconium/commerce-cif-hybris-products/lib/mappers/MoneyValueMapper';

export default class ShippingMethodMapper extends Mapper<ShippingMethod> {

  constructor(settings: InputSettings) {
    super(settings);
  }
  /* istanbul ignore next */
  mapFromInputArgsToActionParameters(mappable: any) {
    throw new Error('Unsupported Operation');
  }
  /* istanbul ignore next */
  mapFromEntity(entity: ShippingMethod, mappable?: DeliveryModeWsDTO): DeliveryModeWsDTO {
    throw new Error('Unsupported Operation');
  }

  mapToEntity(dto: DeliveryModeWsDTO, entity?): ShippingMethod {

    const {
      code,
      deliveryCost = new PriceWsDTO(),
      name,
    } = dto;

    return new ShippingMethod.Builder()
      .withId(code)
      .withName(name ? name : code)
      .withCost(new MoneyValueMapper(this.settings).mapToEntity(deliveryCost))
      .build();
  }

}
