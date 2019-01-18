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

import { ShippingInfo, ShippingMethod } from '@adobe/commerce-cif-model';
import { deleteById as deleteShippingMethod } from './carts';

import { Input } from '@diconium/commerce-cif-hybris-core';
import { Validator } from '@diconium/commerce-cif-hybris-validators';
import ShippingInfoMapper from '../mappers/ShippingInfoMapper';
import ShippingMethodListMapper from '../mappers/ShippingMethodListMapper';

const ERROR_TYPE = 'ShippingMethodsError';

function postShippingMethod(args: any): Input {

  return new Validator<ShippingInfo>(args, ERROR_TYPE)
    .setMapper(ShippingInfoMapper)
    .checkArguments()
    .mandatoryParameter('id')
    .mandatoryParameter('shippingMethodId')
    .input();

}

function getShippingMethod(args: any): Input {

  return new Validator<ShippingMethod[]>(args, ERROR_TYPE)
    .setMapper(ShippingMethodListMapper)
    .checkArguments()
    .mandatoryParameter('id')
    .input();

}

export const post = postShippingMethod;
export const get = getShippingMethod;
export const del = deleteShippingMethod;
