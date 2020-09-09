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

import chai from 'chai';
import nock from 'nock';
import { deleteById as deletePaymentById } from '../../../src/actions/payments';
import { deleteById as validateDeletePaymentById } from '../../../src/validations/payments';

const { expect } = chai;

const validInput = require('../../resources/payment/delete/valid-post-payment-input.json');
const invalidInput = require('../../resources/payment/delete/invalid-post-payment-input.json');
const deletePaymentFailed = require('../../resources/payment/delete/delete-payment-failed.json');
const deletePaymentNotAuthorized = require('../../resources/payment/delete/delete-payment-notauthorized.json');

describe('Delete payment', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    describe('Validation', () => {
      it('Validation should return error if \'id\' is missing', async () => {
        const { errorOutput } = await validateDeletePaymentById({});
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'id\' is missing.');
      });

      it('Validation should return error if \'id\' is missing', async () => {
        const { errorOutput } = await validateDeletePaymentById({ id: '00000001' });
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'paymentId\' is missing.');
      });

      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await validateDeletePaymentById({ id: '00000001', paymentId: '8796099280938' });
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.to.haveOwnProperty('id').that.equals('00000001');
      });
    });

    describe('Service', () => {
      it('Should return MissingPropertyError errorOutput if invalid id is supplied.', async () => {
        const { errorOutput } = await deletePaymentById(invalidInput);
        expect(errorOutput).to.haveOwnProperty('message').that.equals('Parameter \'paymentId\' is missing.');
      });

      it('Should return CommerceServiceResourceNotFoundError errorOutput if the it is not available to delete the payment.', async () => {
        scope.delete('/rest/v2/electronics/users/current/paymentdetails/8796099280938').query({ lang: 'en' })
          .reply(401, deletePaymentFailed);
        const { errorOutput } = await deletePaymentById(validInput);
        expect(errorOutput).to.haveOwnProperty('message').that.equals('Payment details [8796108161066] not found.');
      });

      it('Should return CommerceServiceForbiddenError errorOutput if the it is not authorized to delete the payment.', async () => {
        scope.delete('/rest/v2/electronics/users/current/paymentdetails/8796099280938').query({ lang: 'en' })
          .reply(403, deletePaymentNotAuthorized);
        const { errorOutput } = await deletePaymentById(validInput);
        expect(errorOutput).to.haveOwnProperty('message').that.equals('Access is denied');
      });

      it('Should return a 200 if the payment was removed successfully ', async () => {
        scope.delete('/rest/v2/electronics/users/current/paymentdetails/8796099280938').query({ lang: 'en' })
          .reply(200);
        const { parameters, settings } = await deletePaymentById(validInput);
        expect(parameters.id).to.be.equals('00000003');
        expect(settings.customerId).to.be.equals('current');
      });

    });
  });
});
