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
import { del as deleteCartShippingAddress } from '../../../src/actions/shippingaddress';
import { del as validateDeleteCartShippingAddress } from '../../../src/validations/shippingaddress';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);
const validInput = require('../../resources/addresses/valid-post-cart-shipping-address-input.json');
const forbiddenHybrisResponse = require('../../resources/forbidden-response.json');
const cartNotFoundExample = require('../../resources/cartNotFound.json');

describe('deleteCartShippingAddress', () => {
  describe('Unit tests', () => {

    const scope = nock('https://hybris.example.com');

    it('Gravity point down!', () => {
      expect(true).to.equal(true);
    });

    it('Action Should return something', () => {
      expect(deleteCartShippingAddress).to.exist;
    });

    it('Validation Should return something', () => {
      expect(validateDeleteCartShippingAddress).to.exist;
    });

    it('Should return MissingPropertyError if id is wrongly provided', async() => {
      const { errorOutput } = await validateDeleteCartShippingAddress({});
      expect(errorOutput).to.be.deep.equal({
        name: 'MissingPropertyError',
        message: "Parameter 'id' is missing.",
        cause: {
          message: 'missing-property',
        },
      });
    });

    it('Should return CommerceServiceResourceNotFoundError if the requested cart was not found', async () => {
      scope.delete('/rest/v2/electronics/users/current/carts/ce280b6d-61f0-41e7-acb4-d670546f744b/addresses/delivery')
        .query({ fields: 'FULL', lang: 'en' })
        .reply(404, cartNotFoundExample);
      const { errorOutput } = await deleteCartShippingAddress(validInput);
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'CartErrornotFound',
        },
        message: 'Cart not found.',
        name: 'CommerceServiceResourceNotFoundError',
      });
    });

    it('Should return 403 if it is not allowed to post to the requested cart', async () => {
      scope.delete('/rest/v2/electronics/users/current/carts/ce280b6d-61f0-41e7-acb4-d670546f744b/addresses/delivery')
        .query({ fields: 'FULL', lang: 'en' })
        .reply(403, forbiddenHybrisResponse);
      const { errorOutput } = await deleteCartShippingAddress(validInput);
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'ForbiddenError',
        },
        message: 'Access is denied',
        name: 'CommerceServiceForbiddenError',
      });
    });

    it('Should return success', async () => {
      scope.delete('/rest/v2/electronics/users/current/carts/ce280b6d-61f0-41e7-acb4-d670546f744b/addresses/delivery')
        .query({ fields: 'FULL', lang: 'en' })
        .reply(200, forbiddenHybrisResponse);
      const {  parameters, settings, errorOutput } = await deleteCartShippingAddress(validInput);
      expect(settings).to.be.deep.equal(validInput.settings);
      expect(parameters).to.be.deep.equal(validInput.parameters);
      expect(errorOutput).to.be.undefined;
    });

  });
});
