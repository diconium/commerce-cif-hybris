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

import { PagedResponseShoppingListEntry, PagedResponseShoppingList, ShoppingList, ShoppingListEntry } from '@adobe/commerce-cif-model';
import { Input, Output, SimpleAction } from '@diconium/commerce-cif-hybris-core';

import DeleteShoppingListEntryByIdClient from '../clients/DeleteShoppingListEntryByIdClient';
import GetShoppingListEntryClient from '../clients/GetShoppingListEntryClient';
import GetShoppingListEntryByIdClient from '../clients/GetShoppingListEntryByIdClient';
import PostShoppingListEntryClient from '../clients/PostShoppingListEntryClient';

import PagedResponseShoppingListEntryMapper from '../mappers/PagedResponseShoppingListEntryMapper';
import ShoppingListEntryMapper from '../mappers/ShoppingListEntryMapper';
import ShoppingListEntryModificationMapper from '../mappers/ShoppingListEntryModificationMapper';

const ERROR_TYPE = 'ShoppingListEntryError';

function getShoppingListEntries(input: Input): Promise<Output<PagedResponseShoppingListEntry>> {
  return new SimpleAction<PagedResponseShoppingListEntry>(input)
    .setMapper(PagedResponseShoppingListEntryMapper)
    .setClient(GetShoppingListEntryClient)
    .setErrorType(ERROR_TYPE)
    .activate();
}
export const get = getShoppingListEntries;

function getShoppingListEntryById(input: Input): Promise<Output<ShoppingListEntry>> {
  return new SimpleAction<ShoppingListEntry>(input)
    .setMapper(ShoppingListEntryMapper)
    .setClient(GetShoppingListEntryByIdClient)
    .setErrorType(ERROR_TYPE)
    .activate();
}
export const getById = getShoppingListEntryById;

function postShoppingListEntry(input: Input): Promise<Output<ShoppingListEntry>> {
  return new SimpleAction<ShoppingListEntry>(input)
    .setMapper(ShoppingListEntryModificationMapper)
    .setClient(PostShoppingListEntryClient)
    .setErrorType(ERROR_TYPE)
    .activate();
}
export const post = postShoppingListEntry;

function deleteShoppingListEntry(input: Input): Promise<Output<ShoppingListEntry>> {
  return new SimpleAction<ShoppingListEntry>(input)
    .setMapper(ShoppingListEntryMapper)
    .setClient(DeleteShoppingListEntryByIdClient)
    .setErrorType(ERROR_TYPE)
    .activate();
}
export const deleteById = deleteShoppingListEntry;
