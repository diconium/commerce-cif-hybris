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

import { post as postCart } from '../../src/actions/carts';
import { TestUtils } from '../../../common/TestUtils';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiShallowDeepEqual = require('chai-shallow-deep-equal');

chai.use(chaiShallowDeepEqual);
chai.use(chaiHttp);
const { expect } = chai;

const validInput = require('../resources/valid-post-cart-authenticated-input-with-product.json');
const validInputAnonymousNoProduct = require('../resources/valid-post-cart-input-anonymous.json');
const invalidInput = require('../resources/invalid-post-cart-input.json');

describe('Post Cart', function ()  {
  this.timeout(25000);
  describe('Integration tests', () => {

    before(async() => {
      validInput.settings.bearer = await TestUtils.getBearer();
    });

    it('Action should return CommerceServiceBadRequestError errorOutput if an invalid currency is provided', async () => {
      const { errorOutput } = await postCart(invalidInput);
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'UnsupportedCurrencyError',
        },
        message: 'Currency EURO is not supported',
        name: 'CommerceServiceBadRequestError',
      });
    });

    it('Should return 200 if a new empty cart was successfully created for an anonymous user', async () => {
      const { parameters } = await postCart(validInputAnonymousNoProduct);

      expect(parameters.id).to.not.be.undefined;
      expect(parameters.entry).to.be.undefined;

      await TestUtils.deleteCartById(parameters.id);
    });

    // For this test to execute the login interface needs to be available
    xit('Should return 200 if a new cart with products was successfully created for an authenticated user', async () => {
      const { parameters } = await postCart(validInput);

      expect(parameters.id).to.not.be.undefined;
      expect(parameters.entry.product.code).to.be.equal(280916);
      expect(parameters.entry.quantity).to.be.equal(2);

      await TestUtils.deleteCartById(parameters.id);
    });
  });
});
