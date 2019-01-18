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

import { Address } from '@adobe/commerce-cif-model';
import { Input, SequenceAction } from '@diconium/commerce-cif-hybris-core';
import PostShippingAddressClient from '../clients/PostShippingAddressClient';
import DeleteShippingAddressClient from '../clients/DeleteShippingAddressClient';

const ERROR_TYPE = 'ShippingAddressError';

function postShippingAddress(input: Input): Promise<Input> {

  return new SequenceAction(input)
    .setClient(PostShippingAddressClient)
    .setErrorType(ERROR_TYPE)
    .activate();

}

export const post = postShippingAddress;

function deleteShippingAddress(input: Input): Promise<Input> {

  return new SequenceAction(input)
    .setClient(DeleteShippingAddressClient)
    .setErrorType(ERROR_TYPE)
    .activate();

}

export const del = deleteShippingAddress;
