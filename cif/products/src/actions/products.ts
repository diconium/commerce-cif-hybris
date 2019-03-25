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

import { PagedResponseProduct, Product } from '@adobe/commerce-cif-model';
import { Input, Output, SimpleAction } from '@diconium/commerce-cif-hybris-core';
import GetProductByIdClient from '../clients/GetProductByIdClient';
import GetProductBySlugClient from '../clients/GetProductBySlugClient';
import ProductMapper from '../mappers/ProductMapper';
import SearchProductClient from '../clients/SearchProductClient';
import PagedResponseProductMapper from '../mappers/PagedResponseProductMapper';

const ERROR_TYPE = 'ProductError';

function getProductById(input: Input): Promise<Output<Product>> {

  return new SimpleAction<Product>(input)
    .setMapper(ProductMapper)
    .setClient(GetProductByIdClient)
    .setErrorType(ERROR_TYPE)
    .activate();
}

export const getById = getProductById;

function searchProducts(input: Input): Promise<Output<PagedResponseProduct>> {

  return new SimpleAction<PagedResponseProduct>(input)
    .setMapper(PagedResponseProductMapper)
    .setClient(SearchProductClient)
    .setErrorType(ERROR_TYPE)
    .activate();

}

export const search = searchProducts;

function getProductBySlug(input: Input): Promise<Output<Product>> {

  return new SimpleAction<Product>(input)
    .setMapper(ProductMapper)
    .setClient(GetProductBySlugClient)
    .setErrorType(ERROR_TYPE)
    .activate();
}

export const getBySlug = getProductBySlug;
