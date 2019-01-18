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

import { Payment } from '@adobe/commerce-cif-model';
import { DTO, InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { CardTypeWsDTO, PaymentDetailsWsDTO } from '@diconium/commerce-cif-hybris-clients';

export default class PaymentMapper extends Mapper<Payment> {

  constructor(settings: InputSettings) {
    super(settings);
  }

  mapFromInputArgsToActionParameters(mappable: any) {

    const {
      id,
      paymentId,
      payment,
    } = mappable;

    const paymentDTO = payment ? this.mapFromEntity(payment) : undefined;

    return { id, paymentId, payment: paymentDTO };
  }

  mapFromEntity(entity, mappable?: DTO): DTO {

    const paymentDetailsWsDTO = new PaymentDetailsWsDTO();
    // TODO UNMOCK card number
    this.setCustomerInfo(entity, paymentDetailsWsDTO);
    this.setCardInfo(paymentDetailsWsDTO, entity);

    return paymentDetailsWsDTO;
  }

  private setCustomerInfo(entity, paymentDetailsWsDTO) {
    const {
      firstName,
      lastName,
    } = entity.customer;
    paymentDetailsWsDTO.accountHolderName = `${firstName} ${lastName}`;
  }

  private setCardInfo(paymentDetailsWsDTO, entity) {
    const cardType = this.buildCartType(entity);
    paymentDetailsWsDTO.cardType = cardType;

    paymentDetailsWsDTO.cardNumber = '4196431502693644';
    paymentDetailsWsDTO.expiryMonth = '07';
    paymentDetailsWsDTO.expiryYear = '2019';
  }

  private buildCartType(entity) {
    const cardType = new CardTypeWsDTO();
    cardType.code = entity.methodId;
    cardType.name = entity.method;
    return cardType;
  }

  mapToEntity(dto: PaymentDetailsWsDTO, entity?: Payment): Payment {
    const {
      id,
      cardType,
    } = dto;

    const {
      code,
      name = code,
    } = cardType;

    return new Payment.Builder()
      .withId(id)
      .withMethod(name)
      .withMethodId(code)
      .build();
  }

}
