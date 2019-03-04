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

import { ShoppingList } from '@adobe/commerce-cif-model';
import { Input } from '@diconium/commerce-cif-hybris-core';
import { Validator } from '@diconium/commerce-cif-hybris-validators';
import ShoppingListMapper from '../mappers/ShoppingListMapper';
import PagedResponseShoppingListMapper from '../mappers/PagedResponseShoppingListMapper';

const ERROR_TYPE = 'ShoppingListError';

function getShoppingListById(args: any): Input {
  return new Validator<ShoppingList>(args, ERROR_TYPE)
    .setMapper(ShoppingListMapper)
    .checkArguments()
    .mandatoryParameter('id')
    .input();

}
export const getById = getShoppingListById;
export const deleteById = getShoppingListById;

function getShoppingLists(args: any): Input {
  return new Validator<ShoppingList>(args, ERROR_TYPE)
    .setMapper(PagedResponseShoppingListMapper)
    .checkArguments()
    .isInteger('limit')
    .isInsideInterval('limit', 1)
    .isInteger('offset')
    .isInsideInterval('offset', 0)
    .input();

}
export const get = getShoppingLists;

function postShoppingList(args: any): Input {
  return new Validator<ShoppingList>(args, ERROR_TYPE)
    .setMapper(ShoppingListMapper)
    .checkArguments()
    .mandatoryParameter('saveCartName')
    .input();
}
export const post = postShoppingList;

function patchShoppingList(args: any): Input {
  return new Validator<ShoppingList>(args, ERROR_TYPE)
    .setMapper(ShoppingListMapper)
    .checkArguments()
    .mandatoryParameter('id')
    .mandatoryParameter('saveCartName')
    .input();
}
export const patch = patchShoppingList;
