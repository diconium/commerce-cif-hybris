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

import { post as postCoupon } from '../../../src/actions/coupons';
import { TestUtils } from '../../../../common/TestUtils';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiShallowDeepEqual = require('chai-shallow-deep-equal');

const { expect } = chai;
chai.use(chaiShallowDeepEqual);
chai.use(chaiHttp);

const validInput = require('../../resources/coupons/valid-post-coupons-input.json');
const invalidInput = require('../../resources/coupons/invalid-post-coupons-input-it.json');

describe('postCoupon', function () {
  this.timeout(25000);
  describe('Integration tests', () => {

    before(async () => {
      const bearer = await TestUtils.getBearer();
      validInput.settings.bearer = bearer;
      invalidInput.settings.bearer = bearer;
      return await chai.request(TestUtils.getHybrisInstance() + 'rest/v2/electronics/users/current/')
        .post(`carts?access_token=${bearer}`)
        .then((response) => {
          validInput.parameters.id = response.body.code;
        });
    });

    // For this test to execute an ITTEST coupon needs to be available on hybris
    // For this test to execute the login interface needs to be available
    xit('Should return 200 if coupon is valid', async () => {
      const { parameters, errorOutput } = await postCoupon(validInput);
      expect(errorOutput).to.not.exist;
      expect(parameters).shallowDeepEqual({
        code: 'ITTEST',
        id: validInput.parameters.id,
      });
    });

    // For this test to exexute an ITTEST coupon needs to be available on hybris
    // For this test to execute the login interface needs to be available
    xit('Should return CommerceServiceResourceNotFoundError if coupon is expired', async () => {
      validInput.parameters.code = 'WINTER16';
      const { errorOutput } = await postCoupon(invalidInput);
      expect(errorOutput).shallowDeepEqual({
        name: 'CommerceServiceResourceNotFoundError',
        message: 'Cart not found.',
        cause: {
          message: 'CartErrornotFound',
        },
      });
    });

  });
});
