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

import { Category, PagedResponseCategory } from '@adobe/commerce-cif-model';
import { Input, Output, SimpleAction } from '@diconium/commerce-cif-hybris-core';
import GetCategoryByIdClient from '../clients/GetCategoryByIdClient';
import GetCategoriesClient from '../clients/GetCategoriesClient';
import CategoryMapper from '../mappers/CategoryMapper';
import PagedResponseCategoryMapper from '../mappers/PagedResponseCategoryMapper';

const ERROR_TYPE = 'CategoryError';

function getCategoryById(input: Input): Promise<Output<Category>> {

  return new SimpleAction<Category>(input)
    .setMapper(CategoryMapper)
    .setClient(GetCategoryByIdClient)
    .setErrorType(ERROR_TYPE)
    .activate();

}

export const getById = getCategoryById;

function getCategories(input: Input) : Promise<Output<PagedResponseCategory>> {

  return new SimpleAction<PagedResponseCategory>(input)
        .setMapper(PagedResponseCategoryMapper)
        .setClient(GetCategoriesClient)
        .setErrorType(ERROR_TYPE)
        .activate();
}

export const get = getCategories;
