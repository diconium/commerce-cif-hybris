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
import { post as postCoupon } from '../../../src/actions/coupons';
import { post as postCouponValidation } from '../../../src/validations/coupons';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const validInput = require('../../resources/coupons/valid-post-coupons-input.json');
const invalidInput = require('../../resources/coupons/invalid-post-coupons-input.json');
const postVoucherExampleInvalidResponse = require('../../resources/coupons/invalid-hyrbris-post-coupons-response.json');

describe('postCoupon', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com/rest/v2');

    describe('Validation', () => {
      it('Validation should return error if \'id\' is missing', async () => {
        const { errorOutput } = await postCouponValidation({});
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'id\' is missing.');
      });

      it('Validation should return error if \'code\' is missing', async () => {
        const { errorOutput } = await postCouponValidation({ id: '00000001' });
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'code\' is missing.');
      });

      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await postCouponValidation({ id: '00000001', code: 'ITTEST' });
        expect(errorOutput).to.not.exist;
        expect(parameters).to.shallowDeepEqual({ id: '00000001', code: 'ITTEST' });
      });
    });

    describe('Service', () => {
      it('Should return something', () => {
        expect(postCoupon).to.exist;
      });

      it('Should return MissingPropertyError if input is not valid', async () => {
        const { errorOutput } = await postCoupon(invalidInput);
        expect(errorOutput).to.exist.and.to.haveOwnProperty('message').that.equals('Parameter \'id\' is missing.');
      });

      it('Should return 200 if coupon is valid', async () => {
        scope.post('/electronics/users/current/carts/00000003/vouchers')
          .query({ lang: 'en', voucherId: 'ITTEST', access_token: '16bf7f81-ceeb-444e-ab0b-7d7baca1a183' })
          .reply(200, {});
        const { parameters, errorOutput } = await postCoupon(validInput);
        expect(errorOutput).is.not.ok;
        expect(parameters).shallowDeepEqual({
          code: 'ITTEST',
          id: '00000003',
        });
      });

      it('Should return CommerceServiceResourceNotFoundError if coupon is expired', async () => {
        scope.post('/electronics/users/current/carts/00000003/vouchers')
          .query({ lang: 'en', voucherId: 'ITTEST', access_token: '16bf7f81-ceeb-444e-ab0b-7d7baca1a183' })
          .reply(404, postVoucherExampleInvalidResponse);
        const { errorOutput } = await postCoupon(validInput);
        expect(errorOutput).shallowDeepEqual({
          name: 'CommerceServiceResourceNotFoundError',
          message: 'coupon.not.active.expired',
          cause: {
            message: 'VoucherOperationError',
          },
        });
      });
    });

  });
});
