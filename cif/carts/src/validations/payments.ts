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

import { Payment } from '@adobe/commerce-cif-model';

import { Input } from '@diconium/commerce-cif-hybris-core';
import { Validator } from '@diconium/commerce-cif-hybris-validators';
import PaymentMapper from '../mappers/PaymentMapper';

const ERROR_TYPE = 'PaymentError';

function postPayment(args: any): Input {

  return new Validator<Payment>(args, ERROR_TYPE)
    .setMapper(PaymentMapper)
    .checkArguments()
    .mandatoryParameter('id')
    .mandatoryParameter('payment')
    .input();

}

export const post = postPayment;

function deletePayment(args: any): Input {

  return new Validator<Payment>(args, ERROR_TYPE)
    .setMapper(PaymentMapper)
    .checkArguments()
    .mandatoryParameter('id')
    .mandatoryParameter('paymentId')
    .input();

}

export const deleteById = deletePayment;
