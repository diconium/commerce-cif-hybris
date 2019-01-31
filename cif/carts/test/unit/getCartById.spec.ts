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
import { getById as getCartById } from '../../src/actions/carts';
import * as _ from 'lodash';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const cartExample = require('../resources/cartExample-00000003.json');
const validInput = require('../resources/validateGetCartByIdValid.json');
const validInputWithResponseExtension = require('../resources/validateGetCartByIdValidWithResponseExtension.json');
const invalidInput = require('../resources/validateGetCartByIdInvalid.json');

const cartNotFoundExample = require('../resources/cartNotFound.json');
const cartNotAuthorizedExample = require('../resources/cartNotAuthorized.json');

const adobeCartEntry = require('../resources/adobeCartEntry.json');
const adobeCoupon = require('../resources/adobeCoupon.json');
const adobePayment = require('../resources/adobePayment.json');

describe('getCartById', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    const validInputWithUser = _.cloneDeep(validInput);
    validInputWithUser.parameters.id = '00000003';
    validInputWithUser.settings.bearer = 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51';
    validInputWithUser.settings.customerId = 'current';

    it('Gravity points down!', () => {
      expect(true).to.equal(true);
    });

    it('Function should return something', () => {
      expect(getCartById).to.exist;
    });

    it('Should return MissingPropertyError errorOutput if no id is provided', async () => {
      const { response } = await getCartById(invalidInput);
      expect(response.error).to.be.deep.equal({
        cause: {
          message: 'missing-property',
        },
        message: 'Parameter \'id\' is missing.',
        name: 'MissingPropertyError',
      });
    });

    it('Should return CommerceServiceResourceNotFoundError if a cart does not exist with the id', async () => {
      scope.get('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94')
        .query({ lang: 'en', fields: 'FULL' })
        .reply(404, cartNotFoundExample);
      const { response } = await getCartById(validInput);
      expect(response.error).to.be.deep.equal({
        cause: {
          message: 'CartErrornotFound',
        },
        message: 'Cart not found.',
        name: 'CommerceServiceResourceNotFoundError',
      });
    });

    it('Should have CommerceServiceForbiddenError response if the user has no permissions to fetch the cart', async () => {
      scope.get('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94')
        .query({ lang: 'en', fields: 'FULL' })
        .reply(403, cartNotAuthorizedExample);
      const { response } = await getCartById(validInput);
      expect(response.error).to.be.deep.equal({
        cause: {
          message: 'UnauthorizedError',
        },
        message: 'Full authentication is required to access this resource',
        name: 'CommerceServiceForbiddenError',
      });
    });

    it('Should have 200 OK if the cart exists with that number', async () => {
      scope.get('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94')
        .query({ lang: 'en', fields: 'FULL' })
        .reply(200, cartExample);
      const { response } = await getCartById(validInput);
      const { statusCode } = response;
      expect(statusCode).to.equal(200);
    });

    it('Should have a response with the correct cart id for anonymous user', async () => {
      scope.get('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94')
        .query({ lang: 'en', fields: 'FULL' })
        .reply(200, cartExample);
      const { response } = await getCartById(validInput);
      const { body } = response;
      expect(body.id).to.equal('f527bf4b-dda3-4e99-a76b-03a2ebe1ae94');
    });

    it('Should have a response with the correct cart id for current user', async () => {
      scope.get('/rest/v2/electronics/users/current/carts/00000003')
        .query({
          lang: 'en',
          fields: 'FULL',
          access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
        })
        .reply(200, cartExample);
      const { response } = await getCartById(validInputWithUser);
      const { body } = response;
      expect(body.id).to.equal('00000003');
    });

    it('Should have a response with one entry', async () => {
      scope.get('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94')
        .query({ lang: 'en', fields: 'FULL' })
        .reply(200, cartExample);
      const { response } = await getCartById(validInput);
      const { body } = response;
      expect(body.entries).to.have.lengthOf(1);
    });

    it('Should have a response with one entry that matches the adobe model', async () => {
      scope.get('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94')
        .query({ lang: 'en', fields: 'FULL' })
        .reply(200, cartExample);
      const { response } = await getCartById(validInput);
      const { body } = response;
      expect(body.entries[0]).to.shallowDeepEqual(adobeCartEntry);

    });

    it('Should return 200 if basic auth is needed', async () => {
      scope.get('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94')
        .query({ lang: 'en', fields: 'FULL' })
        .basicAuth({
          user: 'hybrisdemouser',
          pass: 'hybrisdemopassword',
        })
        .reply(200, cartExample);
      validInput.settings.HB_AUTH = 'basic';
      const { response } = await getCartById(validInput);
      const { statusCode } = response;
      expect(statusCode).to.equal(200);
    });

    it('Should have a response with one coupon that matches the adobe model', async () => {
      scope.get('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94')
        .query({ lang: 'en', fields: 'FULL' })
        .reply(200, cartExample);
      const { response } = await getCartById(validInput);
      const { body } = response;
      expect(body.coupons[0]).to.shallowDeepEqual(adobeCoupon);
    });

    it('Should have a response with one payment that matches the adobe model', async () => {
      scope.get('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94')
        .query({ lang: 'en', fields: 'FULL' })
        .reply(200, cartExample);
      const { response } = await getCartById(validInput);
      const { body } = response;
      expect(body.payments[0]).to.shallowDeepEqual(adobePayment);
    });

    it('Should have a response with the extension from the sequence response', async () => {
      scope.get('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94')
        .query({ lang: 'en', fields: 'FULL' })
        .reply(200, cartExample);
      const { response } = await getCartById(validInputWithResponseExtension);
      const { body } = response;
      expect(body.modification).to.deep.equal({
        cartEntryId: '1',
        quantity: 2,
        quantityAdded: 2,
        statusCode: 'success',
      });
    });
  });
});
