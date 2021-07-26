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

import { Cart } from '@adobe/commerce-cif-model';

import { Input } from '@diconium/commerce-cif-hybris-core';
import { Validator } from '@diconium/commerce-cif-hybris-validators';
import CartMapper from '../mappers/CartMapper';

const ERROR_TYPE = 'CartError';

function getCartById(args: any): Input {

  return new Validator<Cart>(args, ERROR_TYPE)
    .setMapper(CartMapper)
    .checkArguments()
    .mandatoryParameter('id')
    .input();

}

export const getById = getCartById;
export const deleteById = getCartById;

function postCart(args: any): Input {

  return new Validator<Cart>(args, ERROR_TYPE)
    .setMapper(CartMapper)
    .checkArguments()
    .isCurrencyCode('currency')
    .isInteger('quantity')
    .isInsideInterval('quantity', 1)
    .input();

}

export const post = postCart;
