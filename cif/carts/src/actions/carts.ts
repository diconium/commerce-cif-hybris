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
import { Input, Output, SequenceAction, SimpleAction } from '@diconium/commerce-cif-hybris-core';
import PostCartClient from '../clients/PostCartClient';
import CartMapper from '../mappers/CartMapper';
import DeleteCartClient from '../clients/DeleteCartClient';
import GetCartByIdClient from '../clients/GetCartByIdClient';

const ERROR_TYPE = 'CartError';

function getCartById(input: Input): Promise<Output<Cart>> {

  return new SimpleAction<Cart>(input)
    .setMapper(CartMapper)
    .setClient(GetCartByIdClient)
    .setErrorType(ERROR_TYPE)
    .activate();

}

export const getById = getCartById;

function deleteCart(input: Input): Promise<Output<Cart>> {

  return new SimpleAction<Cart>(input)
    .setMapper(CartMapper)
    .setClient(DeleteCartClient)
    .setErrorType(ERROR_TYPE)
    .activate();

}

export const deleteById = deleteCart;

function postCart(input: Input): Promise<Input> {

  return new SequenceAction(input)
    .setClient(PostCartClient)
    .setErrorType(ERROR_TYPE)
    .activate();

}

export const post = postCart;
