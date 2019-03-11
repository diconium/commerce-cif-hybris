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
import { CartWsDTO, HttpClient, PrincipalWsDTO } from '@diconium/commerce-cif-hybris-clients';
import { Cart } from '@adobe/commerce-cif-model';

export default class PatchShoppingListClient extends HttpClient {

  constructor(input: Input) {
    super(input);
  }

  exec(): Promise<CartWsDTO> {

    const {
      bearer,
      customerId,
    } = this.input.settings;

    const {
      name,
      description,
    } = this.input.parameters;

    const id = this.input.parameters.id ? this.input.parameters.id : this.input.responseExtension.id;

    return this.patch(`/users/${customerId}/carts/${id}/save`, {}, { bearer, queryParameters: { description, saveCartName: name, fields: 'FULL' } })
      .then(shoppingListDto => this.buildCartDto(shoppingListDto.savedCartData, customerId))
      .catch(errorOutput => Promise.reject(errorOutput));
  }

  private buildCartDto(cartDto, customerId): CartWsDTO {
    cartDto.user = new PrincipalWsDTO();
    cartDto.user.name = customerId;
    return cartDto;
  }

}
