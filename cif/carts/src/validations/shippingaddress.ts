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
import { deleteById as deleteShippingAddress } from './carts';

import { Input } from '@diconium/commerce-cif-hybris-core';
import { Validator } from '@diconium/commerce-cif-hybris-validators';
import AddressWrapperMapper from '../mappers/AddressWrapperMapper';

const ERROR_TYPE = 'ShippingAddressError';

function postShippingAddress(args: any): Input {

  return new Validator<AddressWrapperr>(args, ERROR_TYPE)
    .setMapper(AddressWrapperMapper)
    .checkArguments()
    .mandatoryParameter('id')
    .mandatoryParameter('address')
    .input();

}

export const post = postShippingAddress;
export const del = deleteShippingAddress;
