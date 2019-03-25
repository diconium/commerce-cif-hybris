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

import { Product, PagedResponseProduct } from '@adobe/commerce-cif-model';
import { Input } from '@diconium/commerce-cif-hybris-core';
import { Validator } from '@diconium/commerce-cif-hybris-validators';
import ProductMapper from '../mappers/ProductMapper';
import PagedResponseProductMapper from '../mappers/PagedResponseProductMapper';

const ERROR_TYPE = 'ProductError';

function getProductById(args: any): Input {

  return new Validator<Product>(args, ERROR_TYPE)
    .setMapper(ProductMapper)
    .checkArguments()
    .mandatoryParameter('id')
    .input();

}

export const getById = getProductById;

function searchProducts(args: any): Input {

  return new Validator<PagedResponseProduct>(args, ERROR_TYPE)
    .setMapper(PagedResponseProductMapper)
    .checkArguments()
    .isInteger('limit')
    .isInsideInterval('limit', 1)
    .isInteger('offset')
    .isInsideInterval('offset', 0)
    .isIntegerDivision('offset', 'limit')
    .input();

}

export const search = searchProducts;

function getProductBySlug(args: any): Input {

  return new Validator<Product>(args, ERROR_TYPE)
    .setMapper(ProductMapper)
    .checkArguments()
    .mandatoryParameter('slug')
    .input();

}

export const getBySlug = getProductBySlug;
