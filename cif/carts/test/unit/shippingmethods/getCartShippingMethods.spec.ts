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
import { get as getCartShippingMethods } from '../../../src/actions/shippingmethods';
import { get as validateGetCartShippingMethods } from '../../../src/validations/shippingmethods';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const validInput = require('../../resources/shippingmethods/valid-get-authenticated-cart-shipping-methods-input.json');
const validHybrisResponse = require('../../resources/shippingmethods/valid-get-deliverymodes-response.json');
const unauthorizedHybrisResponse = require('../../resources/shippingmethods/unauthorized-get-deliverymodes-response.json');
const forbiddenHybrisResponse = require('../../resources/shippingmethods/forbidden-get-deliverymodes-response.json');
const validAdobeResponse = require('../../resources/shippingmethods/valid-get-adobeshippingmethods-response.json');

describe('getCartShippingMethods', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity point down!', () => {
      expect(true).to.equal(true);
    });

    it('Should return something', () => {
      expect(getCartShippingMethods).to.exist;
    });

    it('Should return MissingPropertyError if id is wrongly provided', async() => {
      const { errorOutput } = await validateGetCartShippingMethods({});
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'missing-property',
        },
        message: 'Parameter \'id\' is missing.',
        name: 'MissingPropertyError',
      });
    });

    it('Should should return correctly map cartId and address parameters', async() => {
      const input = await validateGetCartShippingMethods({ id: '1234' });
      expect(input.parameters.id).to.be.equal('1234');
    });

    it('Should return CommerceServiceResourceNotFoundError if the request has user but no bearer exist', async () => {
      scope.get('/rest/v2/electronics/users/current/carts/00000060/deliverymodes')
        .query({ fields: 'FULL', lang: 'en' })
        .reply(403, unauthorizedHybrisResponse);
      const { response } = await getCartShippingMethods(validInput);
      expect(response.error).to.be.deep.equal({
        cause: {
          message: 'UnauthorizedError',
        },
        message: 'Full authentication is required to access this resource',
        name: 'CommerceServiceForbiddenError',
      });
    });

    it('Should return CommerceServiceForbiddenError if the request has user but no token is invalid', async () => {
      scope.get('/rest/v2/electronics/users/current/carts/00000060/deliverymodes')
        .query({ fields: 'FULL', lang: 'en' })
        .reply(403, forbiddenHybrisResponse);
      const { response } = await getCartShippingMethods(validInput);
      expect(response.error).to.be.deep.equal({
        cause: {
          message: 'ForbiddenError',
        },
        message: 'Access is denied',
        name: 'CommerceServiceForbiddenError',
      });
    });

    it('Should return 200 with shipping methods if authenticated user does a request', async () => {
      scope.get('/rest/v2/electronics/users/current/carts/00000060/deliverymodes')
        .query({ fields: 'FULL', lang: 'en' })
        .reply(200, validHybrisResponse);
      const { response } = await getCartShippingMethods(validInput);
      expect(response.statusCode).to.equal(200);
    });

    it('Should return an array with items for each method available in the hybris response', async () => {
      scope.get('/rest/v2/electronics/users/current/carts/00000060/deliverymodes')
        .query({ fields: 'FULL', lang: 'en' })
        .reply(200, validHybrisResponse);
      const { response } = await getCartShippingMethods(validInput);
      expect(response.body).to.have.lengthOf(2);
    });

    it('Should return a valid shipping method model', async () => {
      scope.get('/rest/v2/electronics/users/current/carts/00000060/deliverymodes')
        .query({ fields: 'FULL', lang: 'en' })
        .reply(200, validHybrisResponse);
      const { response } = await getCartShippingMethods(validInput);
      expect(response.body[0]).to.shallowDeepEqual(validAdobeResponse);
    });
  });
});
