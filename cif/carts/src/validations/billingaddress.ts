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

import { AddressWrapperr } from '@adobe/commerce-cif-model';
import { post as postBillingAddress } from './shippingaddress';
import { Output } from '@diconium/commerce-cif-hybris-core';
import { Validator } from '@diconium/commerce-cif-hybris-validators';
import AddressWrapperMapper from '../mappers/AddressWrapperMapper';

export const post = postBillingAddress;

const ERROR_TYPE = 'BillingAddress';

function deleteBillingAddress(args: any): Output<AddressWrapperr> {

  const input = new Validator<AddressWrapperr>(args, ERROR_TYPE)
    .setMapper(AddressWrapperMapper)
    .isNotImplemented()
    .input();

  return new Output<AddressWrapperr>({
    accessToken: input.settings.bearer,
    error: input.errorOutput,
    errorType: ERROR_TYPE,
  });

}

export const del = deleteBillingAddress;
