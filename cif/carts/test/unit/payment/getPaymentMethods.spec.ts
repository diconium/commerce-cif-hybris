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
import { get as getPaymentMethods } from '../../../src/actions/paymentmethods';
import { get as validateGetPaymentMethods } from '../../../src/validations/paymentmethods';

const { expect } = chai;

const validInput = require('../../resources/valid-get-paymentmethods-input.json');
const invalidInput = require('../../resources/invalid-get-paymentmethods-input.json');

const customerNotAuthorizedExample = require('../../resources/cartNotAuthorized.json');
const validResponse = require('../../resources/paymentdetails-get-response.json');

describe('getPaymentMethods', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity point down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      it('Validation should return error if \'id\' is missing', async () => {
        const { errorOutput } = await validateGetPaymentMethods({});
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'id\' is missing.');
      });

      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await validateGetPaymentMethods({ id: '00000001' });
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.to.haveOwnProperty('id').that.equals('00000001');
      });
    });

    describe('Service', () => {
      it('Should return something', () => {
        expect(getPaymentMethods).to.exist;
      });

      it('Should return MissingPropertyError errorOutput if no id is provided', async () => {
        const { response } = await getPaymentMethods(invalidInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'id\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Should return CommerceServiceForbiddenError if not allowed to get the payment details.', async () => {
        scope.get('/rest/v2/electronics/users/current/paymentdetails')
          .query({ lang: 'en' })
          .query({ access_token: '16bf7f81-ceeb-444e-ab0b-7d7baca1a183' })
          .reply(403, customerNotAuthorizedExample);
        const { response } = await getPaymentMethods(validInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'UnauthorizedError',
          },
          message: 'Full authentication is required to access this resource',
          name: 'CommerceServiceForbiddenError',
        });
      });

      it('Should return 200 with the correct payment informarion', async () => {
        scope.get('/rest/v2/electronics/users/current/paymentdetails')
          .query({ lang: 'en' })
          .query({ access_token: '16bf7f81-ceeb-444e-ab0b-7d7baca1a183' })
          .reply(200, validResponse);
        const { response } = await getPaymentMethods(validInput);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.lengthOf(2);
        expect(response.body[0]).to.haveOwnProperty('name').that.equals('Visa');
      });
    });
  });
});
