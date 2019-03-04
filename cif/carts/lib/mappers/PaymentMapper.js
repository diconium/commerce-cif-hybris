"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const commerce_cif_model_1 = require("@adobe/commerce-cif-model");
const commerce_cif_hybris_core_1 = require("@diconium/commerce-cif-hybris-core");
const commerce_cif_hybris_clients_1 = require("@diconium/commerce-cif-hybris-clients");
class PaymentMapper extends commerce_cif_hybris_core_1.Mapper {
    constructor(settings) {
        super(settings);
    }
    mapFromInputArgsToActionParameters(mappable) {
        const { id, paymentId, payment, } = mappable;
        const paymentDTO = payment ? this.mapFromEntity(payment) : undefined;
        return { id, paymentId, payment: paymentDTO };
    }
    mapFromEntity(entity, mappable) {
        const paymentDetailsWsDTO = new commerce_cif_hybris_clients_1.PaymentDetailsWsDTO();
        // TODO UNMOCK card number
        this.setCustomerInfo(entity, paymentDetailsWsDTO);
        this.setCardInfo(paymentDetailsWsDTO, entity);
        return paymentDetailsWsDTO;
    }
    setCustomerInfo(entity, paymentDetailsWsDTO) {
        const { firstName, lastName, } = entity.customer;
        paymentDetailsWsDTO.accountHolderName = `${firstName} ${lastName}`;
    }
    setCardInfo(paymentDetailsWsDTO, entity) {
        const cardType = this.buildCartType(entity);
        paymentDetailsWsDTO.cardType = cardType;
        paymentDetailsWsDTO.cardNumber = '4196431502693644';
        paymentDetailsWsDTO.expiryMonth = '07';
        paymentDetailsWsDTO.expiryYear = '2019';
    }
    buildCartType(entity) {
        const cardType = new commerce_cif_hybris_clients_1.CardTypeWsDTO();
        cardType.code = entity.methodId;
        cardType.name = entity.method;
        return cardType;
    }
    mapToEntity(dto, entity) {
        const { id, cardType, } = dto;
        const { code, name = code, } = cardType;
        return new commerce_cif_model_1.Payment.Builder()
            .withId(id)
            .withMethod(name)
            .withMethodId(code)
            .build();
    }
}
exports.default = PaymentMapper;
//# sourceMappingURL=PaymentMapper.js.map