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
import { post as postShoppingListEntry } from '../../src/actions/entries';
import { post as validatePostShoppingListEntry } from '../../src/validations/entries';
const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const customerNotAuthorizedExample = require('../resources/cartNotAuthorized.json');
const cartNotFound = require('../resources/cartNotFound.json');
const invalidInputNoId = require('../resources/entry/invalidPostShoppingListEntryInputNoId.json');
const invalidInputNoProductVariantId = require('../resources/entry/invalidPostShoppingListEntryInputNoProductVariantId.json');
const invalidInputNoQuantity = require('../resources/entry/invalidPostShoppingListEntryInputNoQuantity.json');
const invalidInput = require('../resources/entry/invalidPostShoppingListEntryInput.json');
const productUnknown = require('../resources/productUnknownError.json');
const productOutOfStock = require('../resources/productOutOfStock.json');
const successResponseDto = require('../resources/entry/entryCreatedExample.json');
const validInput = require('../resources/entry/validPostShoppingListEntryInput.json');
const validAuthenticatedInput = require('../resources/entry/validAuthenticatedPostShoppingListEntryInput.json');
const validBody = require('../resources/entry/validBodyEntry.json');

describe('postShoppingListEntry', () => {

  describe('Unit tests', () => {

    const scope = nock('https://hybris.example.com');

    it('Gravity point down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validator', () => {
      it('Validator should return MissingPropertyError errorOutput if no id is provided', async () => {
        const { errorOutput } = await validatePostShoppingListEntry({ productVariantId: '280916', quantity: 2 });
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'id\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Validator should return MissingPropertyError errorOutput if no productVariantId is provided', async () => {
        const { errorOutput } = await validatePostShoppingListEntry({ id: 'f527bf4b-dda3-4e99-a76b-03a2ebe1ae94', quantity: 2 });
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'productVariantId\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Validator should return MissingPropertyError errorOutput if no quantity is provided', async () => {
        const { errorOutput } = await validatePostShoppingListEntry({
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

        let input = await validatePostShoppingListEntry({
          id: 'f527bf4b-dda3-4e99-a76b-03a2ebe1ae94',
          productVariantId: '280916',
          quantity: -1,
        });
        expect(input.errorOutput).to.be.deep.equal(errorOutput);

        input = await validatePostShoppingListEntry({
          id: 'f527bf4b-dda3-4e99-a76b-03a2ebe1ae94',
          productVariantId: '280916',
          quantity: 0,
        });
        expect(input.errorOutput).to.be.deep.equal(errorOutput);
      });

      it('Validator should return a valid input', async () => {
        const { parameters } = await validatePostShoppingListEntry({
          id: 'f527bf4b-dda3-4e99-a76b-03a2ebe1ae94',
          quantity: 2,
          productVariantId: '280916',
        });
        expect(parameters.id).to.be.equal('f527bf4b-dda3-4e99-a76b-03a2ebe1ae94');
        expect(parameters.entry.product.code).to.be.equal('280916');
        expect(parameters.entry.quantity).to.be.equal(2);
      });

    });

    describe('Service', () => {

      it('Should return something', () => {
        expect(postShoppingListEntry).to.exist;
      });

      it('Action should return MissingPropertyError response.error if no id is provided', async () => {
        const { response } = await postShoppingListEntry(invalidInputNoId);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'id\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Action should return MissingPropertyError response.error if no productVariantId is provided', async () => {
        const { response } = await postShoppingListEntry(invalidInputNoProductVariantId);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'productVariantId\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Action should return MissingPropertyError response.error if no quantity is provided', async () => {
        const { response } = await postShoppingListEntry(invalidInputNoQuantity);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'quantity\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Action should return  response.error if an invalid quantity is provided', async () => {
        const { response } = await postShoppingListEntry(invalidInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'invalid-argument',
          },
          message: "Parameter 'quantity' must be greater or equal to 1",
          name: 'InvalidArgumentError',
        });
      });

      it('Action should return CommerceServiceResourceNotFoundError if an invalid product id is provided', async () => {
        scope.post('/rest/v2/electronics/users/current/carts/00000006/entries')
          .query({
            fields: 'FULL',
            lang: 'en',
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
          })
          .reply(404, productUnknown);
        const { response } = await postShoppingListEntry(validAuthenticatedInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'UnknownIdentifierError',
          },
          name: 'CommerceServiceResourceNotFoundError',
          message: 'Product with id 280916 not found',
        });
      });

      it('Should return CommerceServiceForbiddenError if user is not allowed to add entry to the shopping list', async () => {
        scope.post('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94/entries')
          .query({ lang: 'en', fields: 'FULL' })
          .reply(403, customerNotAuthorizedExample);
        const { response } = await postShoppingListEntry(validInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'UnauthorizedError',
          },
          message: 'Full authentication is required to access this resource',
          name: 'CommerceServiceForbiddenError',
        });
      });

      it('Should return CommerceServiceResourceNotFoundError if the shopping list is not found', async () => {
        scope.post('/rest/v2/electronics/users/current/carts/00000006/entries')
          .query({
            fields: 'FULL',
            lang: 'en',
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
          })
          .reply(404, cartNotFound);
        const { response } = await postShoppingListEntry(validAuthenticatedInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'CartErrornotFound',
          },
          message: 'Cart not found.',
          name: 'CommerceServiceResourceNotFoundError',
        });
      });

      it('Should return a valid input if new entry was successfully added to the authenticated shopping list', async () => {
        scope.post('/rest/v2/electronics/users/current/carts/00000006/entries', validBody)
          .query({
            fields: 'FULL',
            lang: 'en',
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
          })
          .reply(200, successResponseDto);
        const { response } = await postShoppingListEntry(validAuthenticatedInput);
        expect(response.error).to.be.undefined;
        const { body } = response;
        expect(body.productVariant.id).to.equal(validAuthenticatedInput.parameters.entry.product.code);
      });
    });
  });
});
