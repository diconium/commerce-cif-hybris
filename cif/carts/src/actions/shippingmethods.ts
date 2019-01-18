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

import { ShippingMethod } from '@adobe/commerce-cif-model';
import { Input, Output, SequenceAction, SimpleAction } from '@diconium/commerce-cif-hybris-core';
import GetShippingMethodsClient from '../clients/GetShippingMethodsClient';
import ShippingMethodListMapper from '../mappers/ShippingMethodListMapper';
import DeleteShippingMethodClient from '../clients/DeleteShippingMethodClient';
import PostShippingMethodClient from '../clients/PostShippingMethodClient';

const ERROR_TYPE = 'ShippingMethodsError';

function postShippingMethod(input: Input): Promise<Input> {

  return new SequenceAction(input)
    .setClient(PostShippingMethodClient)
    .setErrorType(ERROR_TYPE)
    .activate();

}

export const post = postShippingMethod;

function deleteShippingMethod(input: Input): Promise<Input> {

  return new SequenceAction(input)
    .setClient(DeleteShippingMethodClient)
    .setErrorType(ERROR_TYPE)
    .activate();

}

export const del = deleteShippingMethod;

function getShippingMethod(input: Input): Promise<Output<ShippingMethod[]>> {

  return new SimpleAction<ShippingMethod>(input)
    .setMapper(ShippingMethodListMapper)
    .setClient(GetShippingMethodsClient)
    .setErrorType(ERROR_TYPE)
    .activate();

}

export const get = getShippingMethod;
