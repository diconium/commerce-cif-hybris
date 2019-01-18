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
import { PaymentDetailsListWsDTO } from '@diconium/commerce-cif-hybris-clients';
import PaymentMethodMapper from './PaymentMethodMapper';

export default class PaymentMethodListMapper extends Mapper<PaymentMethod[]> {

  constructor(settings: InputSettings) {
    super(settings);
  }
  /* istanbul ignore next */
  mapFromInputArgsToActionParameters(mappable: any) {
    throw new Error('Unsupported Operation');

  }
  /* istanbul ignore next */
  mapFromEntity(entity, mappable?: DTO): DTO {
    throw new Error('Unsupported Operation');
  }

  mapToEntity(dto: PaymentDetailsListWsDTO, entity?) {
    const paymentMethodMapper =  new PaymentMethodMapper(this.settings);
    return dto.payments.map(payment => paymentMethodMapper.mapToEntity(payment));
  }

}
