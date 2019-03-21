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

import { Input } from '@diconium/commerce-cif-hybris-core';
import { CartWsDTO, HttpClient, OrderEntryWsDTO } from '@diconium/commerce-cif-hybris-clients';
import { Cart } from '@adobe/commerce-cif-model';
import CartEntryMapper from '../mappers/CartEntryMapper';

export default class GetCartByIdClient extends HttpClient {

  constructor(input: Input) {
    super(input);
  }

  exec(): Promise<CartWsDTO> {

    const {
      bearer,
      customerId,
    } = this.input.settings;

    const {
      curr,
      oldCartId,
    } = this.input.parameters;

    return this.post(`/users/${customerId}/carts`, {}, { bearer, queryParameters: { curr, oldCartId, fields: 'FULL' } })
      .then(cartDto => this.modifyInputs(cartDto))
      .catch(errorOutput => Promise.reject(errorOutput));

  }

  private modifyInputs(cartDto: CartWsDTO) {

    this.input.settings.customerId === 'current' ? this.input.parameters.id = cartDto.code : this.input.parameters.id = cartDto.guid;

    const {
      quantity = 1,
      productVariantId,
    } = this.input.parameters;

    if (productVariantId) {
      const orderEntry: OrderEntryWsDTO = new CartEntryMapper(this.input.settings).mapFromEntity({ quantity, productVariantId });
      this.input.parameters.entry = orderEntry;
    }

    return cartDto;

  }

}
