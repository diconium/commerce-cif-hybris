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
import { deleteById as deleteCoupon, post as postCoupon } from '../../../src/actions/coupons';
import { deleteById as deleteCouponValidation } from '../../../src/validations/coupons';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const validInput = require('../../resources/coupons/valid-delete-coupons-input.json');
const invalidInput = require('../../resources/coupons/invalid-post-coupons-input.json');
const cartNotAuthorized = require('../../resources/cartNotAuthorized.json');

describe('deleteCoupon', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com/rest/v2');

    describe('Validation', () => {
      it('Validation should return error if \'id\' is missing', async () => {
        const { errorOutput } = await deleteCouponValidation({});
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'id\' is missing.');
      });

      it('Validation should return error if \'couponId\' is missing', async () => {
        const { errorOutput } = await deleteCouponValidation({ id: '00000001' });
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'couponId\' is missing.');
      });

      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await deleteCouponValidation({ id: '00000001', couponId: '12345678' });
        expect(errorOutput).to.not.exist;
        expect(parameters).to.shallowDeepEqual({ id: '00000001', couponId: '12345678' });
      });
    });

    describe('Service', () => {
      it('Should return something', () => {
        expect(deleteCoupon).to.exist;
      });

      it('Should return MissingPropertyError if input is not valid', async () => {
        const { errorOutput } = await postCoupon(invalidInput);
        expect(errorOutput).to.exist.and.to.haveOwnProperty('message').that.equals('Parameter \'id\' is missing.');
      });

      it('Should CommerceServiceForbiddenError when accessing a not authorized cart', async () => {
        scope.delete('/electronics/users/current/carts/00000003/vouchers/001')
          .query({ lang: 'en', access_token: '16bf7f81-ceeb-444e-ab0b-7d7baca1a183' })
          .reply(403, cartNotAuthorized);
        const {  errorOutput } = await deleteCoupon(validInput);
        expect(errorOutput).to.exist;
        expect(errorOutput).shallowDeepEqual({
          cause: {
            message: 'UnauthorizedError',
          },
          message: 'Full authentication is required to access this resource',
          name: 'CommerceServiceForbiddenError',
        });
      });

      it('Should return 200 if coupon is valid', async () => {
        scope.delete('/electronics/users/current/carts/00000003/vouchers/001')
          .query({ lang: 'en', access_token: '16bf7f81-ceeb-444e-ab0b-7d7baca1a183' })
          .reply(200);
        const { parameters, errorOutput } = await deleteCoupon(validInput);
        expect(errorOutput).to.not.exist;
        expect(parameters).shallowDeepEqual({
          id: '00000003',
        });
      });
    });

  });
});
