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
import chaiShallowDeepEqual from 'chai-shallow-deep-equal';
import nock from 'nock';
import { post as postPayment } from '../../../src/actions/payments';
import { post as validatePostPayment } from '../../../src/validations/payments';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const validInput = require('../../resources/payment/valid-post-payment-input.json');
const invalidInput = require('../../resources/payment/invalid-post-payment-input.json');
const hybrisInputBody = require('../../resources/payment/hybris-valid-post-payment-body-input.json');

const hybrisValidResponse = require('../../resources/payment/valid-post-payment-hybris-response.json');
const hybrisCartNotFoundResponse = require('../../resources/cartNotFound.json');
const hybrisForbidden = require('../../resources/payment/unauthorized-post-payment-hybris-response.json');
const addressesListExample = require('../../resources/get-addresses-hybris-response.json');

const args = {
  id: '269524',
  payment: {
    token: '1234',
    customer: {
      id: 'customer@example.com',
      firstName: 'First',
      lastName: 'Last',
    },
    method: 'Visa',
    methodId: 'visa',
    amount: {
      currency: 'USD',
      centAmount: 166474,
    },
    status: 'Paid',
  },
};

describe('postPayment', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    beforeEach(() => {

      scope.get('/rest/v2/electronics/users/current/addresses')
        .query({ lang: 'en' })
        .query({ access_token: '8330c161-6b0c-441a-b4d6-3c111c5bac54' })
        .query({ fields: 'FULL' })
        .reply(200, addressesListExample);
    });

    it('Gravity point down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      it('Validation should return error if \'id\' is mandatory', async () => {
        const { errorOutput } = await validatePostPayment({});
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'id\' is missing.');
      });

      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await validatePostPayment(args);
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.to.haveOwnProperty('payment').to.shallowDeepEqual({
          cardNumber: '4196431502693644',
          cardType: {
            code: 'visa',
            name: 'Visa',
          },
          expiryMonth: '07',
          expiryYear: '2019',
          accountHolderName: 'First Last',
        });
      });
    });

    describe('Service', () => {
      it('Should return CommerceServiceForbiddenError errorOutput if user is not not allowed to set the payment.', async () => {
        scope.post('/rest/v2/electronics/users/current/carts/00000003/paymentdetails', hybrisInputBody)
          .query({ lang: 'en' })
          .query({ access_token: '8330c161-6b0c-441a-b4d6-3c111c5bac54' })
          .reply(403, hybrisForbidden);
        const { errorOutput } = await postPayment(validInput);
        expect(errorOutput).to.haveOwnProperty('name').that.equals('CommerceServiceForbiddenError');
      });

      it('Should return CommerceServiceResourceNotFoundError errorOutput if the cart id is not valid/found.', async () => {
        scope.post('/rest/v2/electronics/users/current/carts/00000000/paymentdetails').query({ lang: 'en' })
          .query({ access_token: '8330c161-6b0c-441a-b4d6-3c111c5bac54' })
          .reply(404, hybrisCartNotFoundResponse);
        const { errorOutput } = await postPayment(invalidInput);
        expect(errorOutput).to.haveOwnProperty('name').that.equals('CommerceServiceResourceNotFoundError');
      });

      it('Should return a 200 if the payment was successful', async () => {
        scope.post('/rest/v2/electronics/users/current/carts/00000003/paymentdetails', hybrisInputBody)
          .query({ lang: 'en' })
          .query({ access_token: '8330c161-6b0c-441a-b4d6-3c111c5bac54' })
          .reply(200, hybrisValidResponse);
        const { parameters, errorOutput } = await postPayment(validInput);
        expect(errorOutput).to.be.not.ok;
        expect(parameters.id).to.be.equals('00000003');
      });
    });
  });
})
;
