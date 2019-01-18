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
import { PaymentMethod } from '@adobe/commerce-cif-model';
import { PaymentDetailsWsDTO } from '@diconium/commerce-cif-hybris-clients';

export default class PaymentMethodMapper extends Mapper<PaymentMethod> {

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

  mapToEntity(dto: PaymentDetailsWsDTO, entity?) {
    const {
      id,
      cardType,
    } = dto;

    return new PaymentMethod.Builder()
      .withId(id)
      .withName(cardType.name)
      .build();
  }
}
