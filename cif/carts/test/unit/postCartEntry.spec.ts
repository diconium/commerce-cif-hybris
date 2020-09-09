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
import { post as postCartEntry } from '../../src/actions/entries';
import { post as validateCartEntry } from '../../src/validations/entries';
const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const validInput = require('../resources/entry/valid-post-cart-entry-input.json');
const validAuthenticatedInput = require('../resources/entry/valid-authenticated-post-cart-entry-input.json');
const validAuthenticatedInputNoEntry = require('../resources/entry/valid-authenticated-post-cart-entry-input-no-entry.json');
const validBody = require('../resources/entry/valid-body-entry.json');
const invalidInputNoId = require('../resources/entry/invalid-post-cart-entry-input-no-id.json');
const invalidInputNoProductVariantId = require('../resources/entry/invalid-post-cart-entry-input-no-product-variant-id.json');
const invalidInputNoQuantity = require('../resources/entry/invalid-post-cart-entry-input-no-quantity.json');
const invalidInput = require('../resources/entry/invalid-post-cart-entry-input.json');
const customerNotAuthorizedExample = require('../resources/cartNotAuthorized.json');
const productUnknown = require('../resources/product-unknown-error.json');
const productOutOfStock = require('../resources/product-out-stock.json');
const cartNotFound = require('../resources/cartNotFound.json');
const successResponseDto = require('../resources/entry/success-response-dto.json');

describe('postCartEntry', () => {

  describe('Unit tests', () => {

    const scope = nock('https://hybris.example.com');

    it('Gravity point down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validator', () => {

      it('Validator should return a valid input', async () => {
        const { parameters } = await validateCartEntry({
          id: 'f527bf4b-dda3-4e99-a76b-03a2ebe1ae94',
          productVariantId: '280916',
          quantity: 2,
        });
        expect(parameters.id).to.be.equal('f527bf4b-dda3-4e99-a76b-03a2ebe1ae94');
        expect(parameters.entry.product.code).to.be.equal('280916');
        expect(parameters.entry.quantity).to.be.equal(2);
      });

      it('Validator should return MissingPropertyError errorOutput if no id is provided', async () => {
        const { errorOutput } = await validateCartEntry({ productVariantId: '280916', quantity: 2 });
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'id\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Validator should return MissingPropertyError errorOutput if no productVariantId is provided', async () => {
        const { errorOutput } = await validateCartEntry({ id: 'f527bf4b-dda3-4e99-a76b-03a2ebe1ae94', quantity: 2 });
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'productVariantId\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Validator should return MissingPropertyError errorOutput if no quantity is provided', async () => {
        const { errorOutput } = await validateCartEntry({
          id: 'f527bf4b-dda3-4e99-a76b-03a2ebe1ae94',
          productVariantId: '280916',
        });
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'quantity\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Validator should return InvalidArgumentError errorOutput if an invalid quantity is provided', async () => {
        const errorOutput = {
          cause: {
            message: 'invalid-argument',
          },
          message: "Parameter 'quantity' must be greater or equal to 1",
          name: 'InvalidArgumentError',
        };

        let input = await validateCartEntry({
          id: 'f527bf4b-dda3-4e99-a76b-03a2ebe1ae94',
          productVariantId: '280916',
          quantity: -1,
        });
        expect(input.errorOutput).to.be.deep.equal(errorOutput);

        input = await validateCartEntry({
          id: 'f527bf4b-dda3-4e99-a76b-03a2ebe1ae94',
          productVariantId: '280916',
          quantity: 0,
        });
        expect(input.errorOutput).to.be.deep.equal(errorOutput);
      });
    });

    describe('Service', () => {

      it('Should return something', () => {
        expect(postCartEntry).to.exist;
      });

      it('Action should return MissingPropertyError errorOutput if no id is provided', async () => {
        const { errorOutput } = await postCartEntry(invalidInputNoId);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'id\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Action should return MissingPropertyError errorOutput if no productVariantId is provided', async () => {
        const { errorOutput } = await postCartEntry(invalidInputNoProductVariantId);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'productVariantId\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Action should return MissingPropertyError errorOutput if no quantity is provided', async () => {
        const { errorOutput } = await postCartEntry(invalidInputNoQuantity);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'quantity\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Action should return  errorOutput if an invalid quantity is provided', async () => {
        const { errorOutput } = await postCartEntry(invalidInput);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'invalid-argument',
          },
          message: "Parameter 'quantity' must be greater or equal to 1",
          name: 'InvalidArgumentError',
        });
      });

      it('Action should return CommerceServiceResourceNotFoundError if an invalid product id is provided', async () => {
        scope.post('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94/entries')
          .query({ fields: 'FULL', lang: 'en' })
          .reply(404, productUnknown);
        const { errorOutput } = await postCartEntry(validInput);
        expect(errorOutput).to.be.deep.equal({
          name: 'CommerceServiceResourceNotFoundError',
          message: 'Product with id 280916 not found',
          cause: {
            message: 'UnknownIdentifierError',
          },
        });
      });

      it('Action should return InvalidArgumentError if an product has no stock', async () => {
        scope.post('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94/entries')
          .query({ fields: 'FULL', lang: 'en' })
          .reply(400, productOutOfStock);
        const { errorOutput } = await postCartEntry(validInput);
        expect(errorOutput).to.be.deep.equal({
          name: 'CommerceServiceBadRequestError',
          message: 'Product [11392000253] cannot be shipped - out of stock online',
          cause: {
            message: 'InsufficientStockErrornoStock',
          },
        });
      });

      it('Should return CommerceServiceForbiddenError if user is not allowed to add entry to the cart', async () => {
        scope.post('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94/entries')
          .query({ lang: 'en', fields: 'FULL' })
          .reply(403, customerNotAuthorizedExample);
        const { errorOutput } = await postCartEntry(validInput);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'UnauthorizedError',
          },
          message: 'Full authentication is required to access this resource',
          name: 'CommerceServiceForbiddenError',
        });
      });

      it('Should return CommerceServiceResourceNotFoundError if the cart is not found', async () => {
        scope.post('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94/entries')
          .query({ fields: 'FULL', lang: 'en' })
          .reply(404, cartNotFound);

        const { errorOutput } = await postCartEntry(validInput);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'CartErrornotFound',
          },
          message: 'Cart not found.',
          name: 'CommerceServiceResourceNotFoundError',
        });
      });

      it('Should return 200 if new entry was successfully added', async () => {
        scope.post('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94/entries', validBody)
          .query({ lang: 'en', fields: 'FULL' })
          .reply(200, successResponseDto);
        const { parameters, errorOutput } = await postCartEntry(validInput);
        expect(errorOutput).to.be.undefined;
        expect(parameters.id).to.equal('f527bf4b-dda3-4e99-a76b-03a2ebe1ae94');
      });

      it('Should return a valid input if new entry was successfully added to the authenticated cart', async () => {
        scope.post('/rest/v2/electronics/users/current/carts/00000006/entries', validBody)
          .query({
            fields: 'FULL',
            lang: 'en',
          })
          .reply(200, successResponseDto);
        const { parameters, errorOutput } = await postCartEntry(validAuthenticatedInput);
        expect(errorOutput).to.be.undefined;
        expect(parameters.id).to.equal('00000006');
      });

      it('Post cart entry output should have a cart modification object as responseExtension', async () => {
        scope.post('/rest/v2/electronics/users/current/carts/00000006/entries', validBody)
          .query({
            fields: 'FULL',
            lang: 'en',
          })
          .reply(200, successResponseDto);
        const { responseExtension, errorOutput } = await postCartEntry(validAuthenticatedInput);
        expect(errorOutput).to.be.undefined;
        expect(responseExtension).to.deep.equal({
          modification: {
            cartEntryId: '1',
            quantity: 3,
            quantityAdded: 3,
            statusCode: 'success',
          },
        });
      });

      it('Should do nothing', async () => {
        const { parameters, errorOutput } = await postCartEntry(validAuthenticatedInputNoEntry);
        expect(errorOutput).to.be.undefined;
        expect(parameters.id).to.equal('00000006');
      });
    });
  });
});
