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
import GetShoppingListByIdClient from '../clients/GetShoppingListByIdClient';
import ShoppingListMapper from '../mappers/ShoppingListMapper';
import PatchShoppingListClient from '../clients/PatchShoppingListClient';

const ERROR_TYPE = 'ShoppingListError';

function getShoppingListById(input: Input): Promise<Output<Cart>> {
  return new SimpleAction<Cart>(input)
    .setMapper(ShoppingListMapper)
    .setClient(GetShoppingListByIdClient)
    .setErrorType(ERROR_TYPE)
    .activate();
}

export const getById = getShoppingListById;

function patchShoppingList(input: Input): Promise<Output<Cart>> {
  return new SimpleAction<Cart>(input)
    .setMapper(ShoppingListMapper)
    .setClient(PatchShoppingListClient)
    .setErrorType(ERROR_TYPE)
    .activate();
}

export const patch = patchShoppingList;
