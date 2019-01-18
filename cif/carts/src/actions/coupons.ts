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

import { Coupon } from '@adobe/commerce-cif-model';
import { Input, SequenceAction } from '@diconium/commerce-cif-hybris-core';
import PostCouponClient from '../clients/PostCouponClient';
import DeleteCouponClient from '../clients/DeleteCouponClient';

const ERROR_TYPE = 'CartError';

function postCoupon(input: Input): Promise<Input> {

  return new SequenceAction(input)
    .setClient(PostCouponClient)
    .setErrorType(ERROR_TYPE)
    .activate();

}

export const post = postCoupon;

function deleteCouponById(input: Input): Promise<Input> {

  return new SequenceAction(input)
    .setClient(DeleteCouponClient)
    .setErrorType(ERROR_TYPE)
    .activate();

}

export const deleteById = deleteCouponById;
