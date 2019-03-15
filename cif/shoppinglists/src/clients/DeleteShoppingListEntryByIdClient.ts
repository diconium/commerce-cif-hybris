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
import { HttpClient, OrderEntryWsDTO } from '@diconium/commerce-cif-hybris-clients';
import { Cart } from '@adobe/commerce-cif-model';

export default class DeleteShoppingListEntryByIdClient extends HttpClient {

  constructor(input: Input) {
    super(input);
  }

  exec(): Promise<OrderEntryWsDTO> {

    const {
      bearer,
      customerId,
    } = this.input.settings;

    const {
      id,
      entryId,
    } = this.input.parameters;

    return this.delete(`/users/${customerId}/carts/${id}/entries/${entryId}`, { bearer, queryParameters: { } })
      .then(() => undefined)
      .catch(errorOutput => Promise.reject(errorOutput));
  }

}
