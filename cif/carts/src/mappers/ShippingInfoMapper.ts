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
import { ShippingInfo, TaxInfo } from '@adobe/commerce-cif-model';
import { DeliveryModeWsDTO, PriceWsDTO } from '@diconium/commerce-cif-hybris-clients';
import MoneyValueMapper from '@diconium/commerce-cif-hybris-products/lib/mappers/MoneyValueMapper';

export default class ShippingInfoMapper extends Mapper<ShippingInfo> {

  constructor(settings: InputSettings) {
    super(settings);
  }

  mapFromInputArgsToActionParameters(mappable: any) {

    const {
      id,
      shippingMethodId: deliveryModeId,
    } = mappable;

    return { id, deliveryModeId };
  }
  /* istanbul ignore next */
  mapFromEntity(entity: ShippingInfo, mappable?: DeliveryModeWsDTO): DeliveryModeWsDTO {
    throw new Error('Unsupported Operation');
  }

  mapToEntity(dto: DeliveryModeWsDTO, entity?): ShippingInfo {

    const {
      code,
      deliveryCost = new PriceWsDTO(),
      name,
    } = dto;

    const moneyValueMapper = new MoneyValueMapper(this.settings);
    const taxInfo = new TaxInfo.Builder()
        .withValue(moneyValueMapper.mapToEntity(deliveryCost))
        .build();

    return new ShippingInfo.Builder()
      .withId(code)
      .withName(name ? name : code)
      .withCost(new MoneyValueMapper(this.settings).mapToEntity(deliveryCost))
      .withTaxInfo(taxInfo)
      .build();
  }

}
