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
import { post as postCartShippingAddress } from '../../../src/actions/shippingaddress';
import { post as validatePostCartShippingAddress } from '../../../src/validations/shippingaddress';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);
const validInput = require('../../resources/addresses/valid-post-cart-shipping-address-input.json');
const validBody = require('../../resources/addresses/valid-post-cart-shipping-address-body.json');
const validAddressMapping = require('../../resources/addresses/valid-post-cart-shipping-address-mapping.json');
const validHybrisBody = require('../../resources/addresses/valid-post-cart-shipping-address-hybris-body.json');
const forbiddenHybrisResponse = require('../../resources/forbidden-response.json');
const cartNotFoundExample = require('../../resources/cartNotFound.json');

describe('postCartShippingAddress', () => {
  describe('Unit tests', () => {

    const scope = nock('https://hybris.example.com');

    it('Gravity point down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      it('Validator should return MissingPropertyError errorOutput if no id is provided', async () => {
        const input = await validatePostCartShippingAddress({});
        expect(input.errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'id\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Validator should return MissingPropertyError errorOutput if no address is provided', async () => {
        const input = await validatePostCartShippingAddress({ id: '1234' });
        expect(input.errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'address\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Validator should return correctly map cartId and address parameters', async () => {
        const input = await validatePostCartShippingAddress({ id: '1234', address: validBody });
        expect(input.parameters.id).to.equal('1234');
        expect(input.parameters.address).to.shallowDeepEqual(validAddressMapping);
      });
    });

    describe('Service', () => {
      it('Should return something', () => {
        expect(postCartShippingAddress).to.exist;
      });

      it('Should return CommerceServiceResourceNotFoundError if the requested cart was not found', async () => {
        scope.post('/rest/v2/electronics/users/current/carts/ce280b6d-61f0-41e7-acb4-d670546f744b/addresses/delivery', validHybrisBody)
          .query({ fields: 'FULL', lang: 'en', access_token: '4b825a40-b54b-4b6f-8873-ab478ebd34a8' })
          .reply(404, cartNotFoundExample);
        const { errorOutput } = await postCartShippingAddress(validInput);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'CartErrornotFound',
          },
          message: 'Cart not found.',
          name: 'CommerceServiceResourceNotFoundError',
        });
      });

      it('Should return CommerceServiceForbiddenError if it is not allowed to post to the requested cart', async () => {
        scope.post('/rest/v2/electronics/users/current/carts/ce280b6d-61f0-41e7-acb4-d670546f744b/addresses/delivery', validHybrisBody)
          .query({ fields: 'FULL', lang: 'en', access_token: '4b825a40-b54b-4b6f-8873-ab478ebd34a8' })
          .reply(403, forbiddenHybrisResponse);
        const { errorOutput } = await postCartShippingAddress(validInput);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'ForbiddenError',
          },
          message: 'Access is denied',
          name: 'CommerceServiceForbiddenError',
        });

      });

      it('Should return success', async () => {
        scope.post('/rest/v2/electronics/users/current/carts/ce280b6d-61f0-41e7-acb4-d670546f744b/addresses/delivery', validHybrisBody)
          .query({ fields: 'FULL', lang: 'en', access_token: '4b825a40-b54b-4b6f-8873-ab478ebd34a8' })
          .reply(200);
        const { parameters, settings, errorOutput } = await postCartShippingAddress(validInput);
        expect(settings).to.be.deep.equal(validInput.settings);
        expect(parameters).to.be.deep.equal(validInput.parameters);
        expect(errorOutput).to.be.undefined;
      });

    });
  });
});
