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

import { Cart, PagedResponseShoppingList, ShoppingList } from '@adobe/commerce-cif-model';
import { Input, Output, SequenceAction, SimpleAction } from '@diconium/commerce-cif-hybris-core';
import GetShoppingListClient from '../clients/GetShoppingListClient';
import GetShoppingListByIdClient from '../clients/GetShoppingListByIdClient';
import DeleteCartClient from '@diconium/commerce-cif-hybris-carts/lib/clients/DeleteCartClient';
import PostShoppingListClient from '../clients/PostShoppingListClient';
import ShoppingListMapper from '../mappers/ShoppingListMapper';
import PatchShoppingListClient from '../clients/PatchShoppingListClient';
import PagedResponseShoppingListMapper from '../mappers/PagedResponseShoppingListMapper';
import PagedResponseProductMapper from '@diconium/commerce-cif-hybris-products/lib/mappers/PagedResponseProductMapper';
import SearchProductClient from '@diconium/commerce-cif-hybris-products/lib/clients/SearchProductClient';

const ERROR_TYPE = 'ShoppingListError';

function getShoppingListById(input: Input): Promise<Output<ShoppingList>> {
  return new SimpleAction<ShoppingList>(input)
    .setMapper(ShoppingListMapper)
    .setClient(GetShoppingListByIdClient)
    .setErrorType(ERROR_TYPE)
    .activate();
}

export const getById = getShoppingListById;

function getShoppingLists(input: Input): Promise<Output<PagedResponseShoppingList>> {
  return new SimpleAction<PagedResponseShoppingList>(input)
    .setMapper(PagedResponseShoppingListMapper)
    .setClient(GetShoppingListClient)
    .setErrorType(ERROR_TYPE)
    .activate();
}

export const get = getShoppingLists;

function deleteShoppingList(input: Input): Promise<Output<ShoppingList>> {
  return new SimpleAction<ShoppingList>(input)
    .setMapper(ShoppingListMapper)
    .setClient(DeleteCartClient)
    .setErrorType(ERROR_TYPE)
    .activate();
}
export const deleteById = deleteShoppingList;

function patchShoppingList(input: Input): Promise<Output<ShoppingList>> {
  return new SimpleAction<ShoppingList>(input)
    .setMapper(ShoppingListMapper)
    .setClient(PatchShoppingListClient)
    .setErrorType(ERROR_TYPE)
    .activate();
}

export const patch = patchShoppingList;

function postShoppingList(input: Input): Promise<Input> {
  return new SequenceAction(input)
    .setClient(PostShoppingListClient)
    .setErrorType(ERROR_TYPE)
    .activate();
}
export const post = postShoppingList;
