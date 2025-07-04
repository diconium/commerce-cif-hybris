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

import { CartEntry } from '@adobe/commerce-cif-model';

import { Input } from '@diconium/commerce-cif-hybris-core';
import { Validator } from '@diconium/commerce-cif-hybris-validators';
import CartEntryMapper from '../mappers/CartEntryMapper';

const ERROR_TYPE = 'CartError';

function postCartEntry(args: any): Input {

  return new Validator<CartEntry>(args, ERROR_TYPE)
    .setMapper(CartEntryMapper)
    .checkArguments()
    .mandatoryParameter('id')
    .mandatoryParameter('quantity')
    .isInteger('quantity')
    .isInsideInterval('quantity', 1)
    .input();

}

export const post = postCartEntry;

function putCartEntry(args: any): Input {

  return new Validator<CartEntry>(args, ERROR_TYPE)
    .setMapper(CartEntryMapper)
    .checkArguments()
    .mandatoryParameter('id')
    .mandatoryParameter('cartEntryId')
    .mandatoryParameter('quantity')
    .isInteger('quantity')
    .isInsideInterval('quantity', 0)
    .input();

}

export const put = putCartEntry;

function deleteCartEntry(args: any): Input {

  return new Validator<CartEntry>(args, ERROR_TYPE)
    .setMapper(CartEntryMapper)
    .checkArguments()
    .mandatoryParameter('id')
    .mandatoryParameter('cartEntryId')
    .input();

}

export const deleteById = deleteCartEntry;
