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
import { ShippingMethod } from '@adobe/commerce-cif-model';
import { DeliveryModeListWsDTO } from '@diconium/commerce-cif-hybris-clients';
import ShippingMethodMapper from './ShippingMethodMapper';

export default class ShippingMethodListMapper extends Mapper<ShippingMethod[]> {

  constructor(settings: InputSettings) {
    super(settings);
  }

  mapFromInputArgsToActionParameters(mappable: any) {

    const {
      id,
    } = mappable;

    return { id };
  }
  /* istanbul ignore next */
  mapFromEntity(entity, mappable?: DTO): DTO {
    throw new Error('Unsupported Operation');
  }

  mapToEntity(dto: DeliveryModeListWsDTO, entity?): ShippingMethod[] {
    const shippingMethodMapper =  new ShippingMethodMapper(this.settings);
    return dto.deliveryModes.map(deliveryMode => shippingMethodMapper.mapToEntity(deliveryMode));
  }

}
