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
import { post as postCartBillingAddress } from '../../../src/actions/billingaddress';
import { post as validatePostCartBillingAddress } from '../../../src/validations/billingaddress';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);
const validInput = require('../../resources/addresses/valid-post-cart-billing-address-input.json');
const validBody = require('../../resources/addresses/valid-post-cart-shipping-address-body.json');
const validAddressMapping = require('../../resources/addresses/valid-post-cart-shipping-address-mapping.json');
const validHybrisBody = require('../../resources/addresses/valid-post-cart-billing-address-hybris-body.json');
const forbiddenHybrisResponse = require('../../resources/forbidden-response.json');
const cartNotFoundExample = require('../../resources/cartNotFound.json');

describe('postCartBillingAddress', () => {
  describe('Unit tests', () => {

    const scope = nock('https://hybris.example.com');

    it('Gravity point down!', () => {
      expect(true).to.equal(true);
    });

    it('Should return something', () => {
      expect(postCartBillingAddress).to.exist;
    });

    it('Validator should return MissingPropertyError errorOutput if no id is provided', async () => {
      const input = await validatePostCartBillingAddress({});
      expect(input.errorOutput).to.be.deep.equal({
        cause: {
          message: 'missing-property',
        },
        message: 'Parameter \'id\' is missing.',
        name: 'MissingPropertyError',
      });
    });

    it('Validator should return MissingPropertyError errorOutput if no address is provided', async () => {
      const input = await validatePostCartBillingAddress({ id: '1234' });
      expect(input.errorOutput).to.be.deep.equal({
        cause: {
          message: 'missing-property',
        },
        message: 'Parameter \'address\' is missing.',
        name: 'MissingPropertyError',
      });
    });

    it('Validator should return correctly map cartId and address parameters', async () => {
      const input = await validatePostCartBillingAddress({ id: '1234', address: validBody });
      expect(input.parameters.id).to.equal('1234');
      expect(input.parameters.address).to.shallowDeepEqual(validAddressMapping);
    });

    it('Should return CommerceServiceResourceNotFoundError if the requested cart was not found', async () => {
      scope.post('/rest/v2/electronics/users/current/addresses', validHybrisBody)
        .query({ lang: 'en', access_token: '4b825a40-b54b-4b6f-8873-ab478ebd34a8' })
        .reply(404, cartNotFoundExample);
      const { errorOutput } = await postCartBillingAddress(validInput);
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'CartErrornotFound',
        },
        message: 'Cart not found.',
        name: 'CommerceServiceResourceNotFoundError',
      });
    });

    it('Should return CommerceServiceForbiddenError if it is not allowed to post to the requested cart', async () => {
      scope.post('/rest/v2/electronics/users/current/addresses', validHybrisBody)
        .query({ lang: 'en', access_token: '4b825a40-b54b-4b6f-8873-ab478ebd34a8' })
        .reply(403, forbiddenHybrisResponse);
      const { errorOutput } = await postCartBillingAddress(validInput);
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'ForbiddenError',
        },
        message: 'Access is denied',
        name: 'CommerceServiceForbiddenError',
      });

    });

    it('Should return success', async () => {
      scope.post('/rest/v2/electronics/users/current/addresses', validHybrisBody)
        .query({ lang: 'en', access_token: '4b825a40-b54b-4b6f-8873-ab478ebd34a8' })
        .reply(200);
      const { parameters, settings, errorOutput } = await postCartBillingAddress(validInput);
      expect(settings).to.be.deep.equal(validInput.settings);
      expect(parameters).to.be.deep.equal(validInput.parameters);
      expect(errorOutput).to.be.undefined;
    });

  });
});
