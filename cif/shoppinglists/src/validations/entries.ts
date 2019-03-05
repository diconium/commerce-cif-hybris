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
import PagedResponseShoppingListEntryMapper from '../mappers/PagedResponseShoppingListEntryMapper';
import ShoppingListEntryMapper from '../mappers/ShoppingListEntryMapper';
import ShoppingListEntryModificationMapper from '../mappers/ShoppingListEntryModificationMapper';

const ERROR_TYPE = 'ShoppingListError';

function getShoppingListEntries(args: any): Input {
  return new Validator<ShoppingList>(args, ERROR_TYPE)
    .setMapper(PagedResponseShoppingListEntryMapper)
    .checkArguments()
    .mandatoryParameter('id')
    .isInteger('limit')
    .isInsideInterval('limit', 1)
    .isInteger('offset')
    .isInsideInterval('offset', 0)
    .isIntegerDivision('offset', 'limit')
    .input();
}
export const get = getShoppingListEntries;

function getShoppingListEntryById(args: any): Input {
  return new Validator<ShoppingList>(args, ERROR_TYPE)
    .setMapper(ShoppingListEntryMapper)
    .checkArguments()
    .mandatoryParameter('id')
    .mandatoryParameter('entryId')
    .input();
}
export const getById = getShoppingListEntryById;
export const deleteById = getShoppingListEntryById;

function postShoppingListEntry(args: any): Input {
  return new Validator<ShoppingList>(args, ERROR_TYPE)
    .setMapper(ShoppingListEntryModificationMapper)
    .checkArguments()
    .mandatoryParameter('id')
    .mandatoryParameter('quantity')
    .mandatoryParameter('productVariantId')
    .isInteger('quantity')
    .isInsideInterval('quantity', 1)
    .input();
}
export const post = postShoppingListEntry;

function putShoppingListEntry(args: any): Input {
  return new Validator<ShoppingList>(args, ERROR_TYPE)
    .setMapper(ShoppingListEntryMapper)
    .isNotImplemented()
    .input();
}
export const put = putShoppingListEntry;
