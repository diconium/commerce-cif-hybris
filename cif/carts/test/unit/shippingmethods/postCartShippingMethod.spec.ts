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
import { post as postCartShippingMethod } from '../../../src/actions/shippingmethods';
import { post as validatePostCartShippingMethod } from '../../../src/validations/shippingmethods';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const validInput = require('../../resources/shippingmethods/valid-post-cart-shipping-methods-input.json');
const forbiddenHybrisResponse = require('../../resources/shippingmethods/forbidden-get-deliverymodes-response.json');
const unsupportedHybrisResponse = require('../../resources/shippingmethods/unsupported-post-deliverymodes-response.json');
const cartNotFoundExample = require('../../resources/cartNotFound.json');

describe('postCartShippingMethods', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity point down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {

      it('Validation Should return something', () => {
        expect(validatePostCartShippingMethod).to.exist;
      });

      it('Should return MissingPropertyError if id is wrongly provided', async () => {
        const { errorOutput } = await validatePostCartShippingMethod({});
        expect(errorOutput).to.be.deep.equal({
          name: 'MissingPropertyError',
          message: 'Parameter \'id\' is missing.',
          cause: {
            message: 'missing-property',
          },
        });
      });

      it('Should return parameters mapped correctly', async () => {
        const { parameters } = await validatePostCartShippingMethod({ id: '00000003', shippingMethodId: 'pickup' });
        expect(parameters).to.be.deep.equal({ id: '00000003', deliveryModeId: 'pickup' });
      });
    });

    describe('Service', () => {
      it('Should return something', () => {
        expect(postCartShippingMethod).to.exist;
      });

      it('Should return CommerceServiceResourceNotFoundError if the requested cart was not found', async () => {
        scope.put('/rest/v2/electronics/users/current/carts/00000001/deliverymode', {})
          .query({ deliveryModeId: 'pickup', access_token: '4b825a40-b54b-4b6f-8873-ab478ebd34a8', lang: 'en' })
          .reply(404, cartNotFoundExample);
        const { errorOutput } = await postCartShippingMethod(validInput);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'CartErrornotFound',
          },
          message: 'Cart not found.',
          name: 'CommerceServiceResourceNotFoundError',
        });
      });

      it('Should return CommerceServiceForbiddenError if it is not allowed to post to the requested cart', async () => {
        scope.put('/rest/v2/electronics/users/current/carts/00000001/deliverymode', {})
          .query({ deliveryModeId: 'pickup', access_token: '4b825a40-b54b-4b6f-8873-ab478ebd34a8', lang: 'en' })
          .reply(403, forbiddenHybrisResponse);
        const { errorOutput } = await postCartShippingMethod(validInput);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'ForbiddenError',
          },
          message: 'Access is denied',
          name: 'CommerceServiceForbiddenError',
        });
      });

      it('Should return CommerceServiceBadRequestError if it is not allowed to post the specific method to the requested cart', async () => {
        scope.put('/rest/v2/electronics/users/current/carts/00000001/deliverymode', {})
          .query({ deliveryModeId: 'pickup', access_token: '4b825a40-b54b-4b6f-8873-ab478ebd34a8', lang: 'en' })
          .reply(400, unsupportedHybrisResponse);
        const { errorOutput } = await postCartShippingMethod(validInput);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'UnsupportedDeliveryModeError',
          },
          message: 'Delivery Mode [standard-gross] is not supported for the current cart',
          name: 'CommerceServiceBadRequestError',
        });
      });

      it('Should return 200 and a cart with shipping methods', async () => {
        scope.put('/rest/v2/electronics/users/current/carts/00000001/deliverymode', {})
          .query({ deliveryModeId: 'pickup', access_token: '4b825a40-b54b-4b6f-8873-ab478ebd34a8', lang: 'en' })
          .reply(200);
        const { parameters, settings, errorOutput } = await postCartShippingMethod(validInput);
        expect(settings).to.be.deep.equal(validInput.settings);
        expect(parameters).to.be.deep.equal(validInput.parameters);
        expect(errorOutput).to.be.undefined;
      });
    });

  });
});
