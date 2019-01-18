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
import { AddressListWsDTO, AddressWsDTO, HttpClient, PaymentDetailsWsDTO } from '@diconium/commerce-cif-hybris-clients';

export default class PostPaymentClient extends HttpClient {

  constructor(input: Input) {
    super(input);
  }

  async exec(): Promise<PaymentDetailsWsDTO> {

    const {
      bearer,
      customerId,
    } = this.input.settings;

    const {
      id,
      payment,
    } = this.input.parameters;

    payment.billingAddress = this.getBillingAddress(await this.getAddressesDto());

    return this.post(`/users/${customerId}/carts/${id}/paymentdetails`, payment, { bearer })
      .then(paymentDto => paymentDto)
      .catch(errorOutput => Promise.reject(errorOutput));

  }

  private async getAddressesDto() {
    const {
      bearer,
      customerId,
    } = this.input.settings;

    return await this.get(`/users/${customerId}/addresses`, { bearer, queryParameters: { fields: 'FULL' } });
  }

  private getBillingAddress(addressesDto: AddressListWsDTO): AddressWsDTO {
    return addressesDto.addresses
      .find(address => this.isBillingAddress(address));
  }

  private isBillingAddress(address) {
    return address.defaultAddress === true;
  }

}
