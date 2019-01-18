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

import { post as postCartShippingAddress } from '../../../src/actions/shippingaddress';
import { getById as getCartById } from '../../../src/actions/carts';
import { TestUtils } from '../../../../common/TestUtils';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiShallowDeepEqual = require('chai-shallow-deep-equal');

const { expect } = chai;
chai.use(chaiHttp);
chai.use(chaiShallowDeepEqual);

const validInput = require('../../resources/addresses/valid-post-cart-shipping-address-input.json');

describe('postCartShippingAddress', function () {
  this.timeout(25000);
  describe('Integration tests', () => {

    before(async() => {

      validInput.settings.bearer = await TestUtils.getBearer();

      return await chai.request(TestUtils.getHybrisInstance() + 'rest/v2/electronics/users/current/')
        .post(`carts?access_token=${validInput.settings.bearer}`)
        .then((response) => {
          validInput.parameters.id = response.body.code;
        });

    });

    after(async() => {
      await TestUtils.deleteCartById(validInput.parameters.id);
    });

    // For this test to execute the login interface needs to be available
    xit('Should successfully post shipping address for the cart', async() => {
      const { parameters } = await postCartShippingAddress(validInput);
      expect(parameters.id).to.equal(validInput.parameters.id);

      const { response } = await getCartById(validInput);
      const { statusCode, body } = response;
      expect(statusCode).to.be.equal(200);
      expect(body).to.be.ok.and.to.haveOwnProperty('id').and.to.equal(validInput.parameters.id);
      expect(body).to.be.ok.and.to.haveOwnProperty('shippingAddress').and.to.haveOwnProperty('streetName').and.to.equal('street name');

    });

    // For this test to execute the login interface needs to be available
    xit('Should return CommerceServiceResourceNotFoundError if id is not found', async() => {
      const notFoundInput = validInput;
      notFoundInput.parameters.id = 'notFoundInput';
      const { errorOutput } = await postCartShippingAddress(notFoundInput);
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'CartErrornotFound',
        },
        message: 'Cart not found.',
        name: 'CommerceServiceResourceNotFoundError',
      });
    });

    it('Should return CommerceServiceForbiddenError if bearer is incorrect', async() => {
      const notAuthorized = validInput;
      notAuthorized.settings.bearer = 'random-illegal-bearer';
      const { errorOutput } = await postCartShippingAddress(notAuthorized);
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'InvalidTokenError',
        },
        message: 'Invalid access token: random-illegal-bearer',
        name: 'CommerceServiceForbiddenError',
      });
    });

  });
});
