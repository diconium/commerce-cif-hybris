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
import { post as postCart } from '../../src/actions/carts';
import { post as validatePostCart } from '../../src/validations/carts';
const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const validEntry = require('../resources/entry/valid-body-entry.json');
const validInput = require('../resources/valid-post-cart-input.json');
const validInputAnonymousNoProduct = require('../resources/valid-post-cart-input-anonymous.json');
const validInputAnonymousWithProduct = require('../resources/valid-post-cart-input-anonymous-with-product.json');
const validInputAuthenticatedNoProduct = require('../resources/valid-post-cart-authenticated-input.json');
const validInputAuthenticatedWithProduct = require('../resources/valid-post-cart-authenticated-input-with-product.json');
const validInputAuthenticatedWithProductNoQuantity = require('../resources/valid-post-cart-authenticated-input-with-product-no-quantity.json');
const invalidInput = require('../resources/invalid-post-cart-input.json');
const invalidInputNoCurrency = require('../resources/invalid-post-carts-input-no-currency.json');
const customerNotAuthorizedExample = require('../resources/cartNotAuthorized.json');
const cartNotFound = require('../resources/cartNotFound.json');

const successResponseDto = require('../resources/post-cart-success-response-dto.json');

describe('postCart', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity point down!', () => {
      expect(true).to.equal(true);
    });

    it('Should return something', () => {
      expect(postCart).to.exist;
    });

    it('Validator should return a valid input given a valid currency', async() => {
      const { parameters } = await validatePostCart({ currency: 'EUR' });
      expect(parameters.curr).to.be.deep.equal('EUR');
    });

    it('Validator should return a valid input given a valid currency, productVariantId and quantity', async() => {
      const { parameters } = await validatePostCart({ currency: 'EUR', productVariantId: '280916', quantity: '1' });
      expect(parameters.curr).to.be.deep.equal('EUR');
      expect(parameters.productVariantId).to.be.deep.equal('280916');
      expect(parameters.quantity).to.be.deep.equal('1');
    });

    it('Validator should return MissingPropertyError errorOutput if no currency is provided', async() => {
      const input = await validatePostCart({});
      expect(input.errorOutput).to.be.deep.equal({
        cause: {
          message: 'missing-property',
        },
        message: 'Parameter \'currency\' is missing.',
        name: 'MissingPropertyError',
      });
    });

    it('Validator should return InvalidArgumentError errorOutput if an invalid currency is provided', async() => {
      const input = await validatePostCart({ currency: 'EURO' });
      expect(input.errorOutput).to.be.deep.equal({
        cause: {
          message: 'invalid-argument',
        },
        message: 'Invalid currency code \'EURO\'',
        name: 'InvalidArgumentError',
      });
    });

    it('Validator should return InvalidArgumentError errorOutput if an invalid quantity is provided', async() => {
      const input = await validatePostCart({ currency: 'EUR', quantity: -1 });
      expect(input.errorOutput).to.be.deep.equal({
        cause: {
          message: 'invalid-argument',
        },
        message: "Parameter 'quantity' must be greater or equal to 1",
        name: 'InvalidArgumentError',
      });
    });

    it('Action should return MissingPropertyError errorOutput if no currency is provided', async () => {
      const { errorOutput } = await postCart(invalidInputNoCurrency);
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'missing-property',
        },
        message: 'Parameter \'currency\' is missing.',
        name: 'MissingPropertyError',
      });
    });

    it('Action should return MissingPropertyError errorOutput if an invalid currency is provided', async () => {
      const { errorOutput } = await postCart(invalidInput);
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'UnsupportedCurrencyError',
        },
        message: 'Currency EURO is not supported',
        name: 'CommerceServiceBadRequestError',
      });
    });

    it('Action should return CommerceServiceForbiddenError if user is not allowed to create the cart', async () => {
      scope.post('/rest/v2/electronics/users/current/carts')
        .query({ lang: 'en' , curr: 'USD' , fields: 'FULL' })
        .reply(403, customerNotAuthorizedExample);
      const { errorOutput } = await postCart(validInput);
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'UnauthorizedError',
        },
        message: 'Full authentication is required to access this resource',
        name: 'CommerceServiceForbiddenError',
      });
    });

    it('Action should return CommerceServiceResourceNotFoundError if a new cart is not found', async () => {
      scope.post('/rest/v2/electronics/users/current/carts')
        .query({ lang: 'en' , curr: 'USD' , fields: 'FULL' })
        .reply(404, cartNotFound);
      const { errorOutput } = await postCart(validInput);
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'CartErrornotFound',
        },
        message: 'Cart not found.',
        name: 'CommerceServiceResourceNotFoundError',
      });
    });

    it('Should return 200 if a new empty cart was successfully created for an anonymous user', async () => {
      scope.post('/rest/v2/electronics/users/anonymous/carts')
        .query({ lang: 'en' , curr: 'USD' , fields: 'FULL' })
        .reply(200, successResponseDto);
      const { parameters } = await postCart(validInputAnonymousNoProduct);

      expect(parameters.id).to.equal('2a39de34-9732-466d-8661-01e9385d8e94');
      expect(parameters.entry).to.be.undefined;
    });

    it('Should return 200 if a new empty cart was successfully created for an authenticated user', async () => {
      scope.post('/rest/v2/electronics/users/current/carts')
        .query({ lang: 'en' , curr: 'USD' , fields: 'FULL' })
        .reply(200, successResponseDto);
      const { parameters } = await postCart(validInputAuthenticatedNoProduct);
      expect(parameters.id).to.equal('00000006');
      expect(parameters.entry).to.be.undefined;
    });

    it('Should return 200 if a new cart with products was successfully created for an anonymous user', async () => {
      scope.post('/rest/v2/electronics/users/anonymous/carts')
        .query({ lang: 'en' , curr: 'USD' , fields: 'FULL' })
        .reply(200, successResponseDto);
      const { parameters } = await postCart(validInputAnonymousWithProduct);
      expect(parameters.id).to.be.equal('2a39de34-9732-466d-8661-01e9385d8e94');
      expect(parameters.entry).to.be.ok.and.to.be.shallowDeepEqual(validEntry);

    });

    it('Should return 200 if a new cart with products was successfully created for an authenticated user', async () => {
      scope.post('/rest/v2/electronics/users/current/carts')
        .query({ lang: 'en' , curr: 'USD' , fields: 'FULL' })
        .reply(200, successResponseDto);
      const { parameters } = await postCart(validInputAuthenticatedWithProduct);
      expect(parameters.id).to.be.equal('00000006');
      expect(parameters.entry).to.be.ok.and.to.be.shallowDeepEqual(validEntry);
    });

    it('Should return 200 if given no quantity a new cart with products was successfully created for an authenticated user', async () => {
      scope.post('/rest/v2/electronics/users/current/carts')
        .query({ lang: 'en' , curr: 'USD' , fields: 'FULL' })
        .reply(200, successResponseDto);
      const { parameters } = await postCart(validInputAuthenticatedWithProductNoQuantity);
      expect(parameters.id).to.be.equal('00000006');
      expect(parameters.entry.product.code).to.be.equal(280916);
      expect(parameters.entry.quantity).to.be.equal(1);
    });
  });
});
