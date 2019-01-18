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

import { Input } from '@diconium/commerce-cif-hybris-core';
import { Validator } from '@diconium/commerce-cif-hybris-validators';
import CategoryMapper from '../mappers/CategoryMapper';
import PagedResponseCategoryMapper from '../mappers/PagedResponseCategoryMapper';

const ERROR_TYPE = 'CategoryError';

function getCategoryById(args: any): Input {

  return new Validator<Category>(args, ERROR_TYPE)
    .setMapper(CategoryMapper)
    .checkArguments()
    .mandatoryParameter('id')
    .input();

}

export const getById = getCategoryById;

function getCategories(args: any): Input {

  return new Validator<PagedResponseCategory>(args, ERROR_TYPE)
    .setMapper(PagedResponseCategoryMapper)
    .checkArguments()
    .isInsideInterval('limit', 1)
    .isInsideInterval('offset', 0)
    .input();

}

export const get = getCategories;
