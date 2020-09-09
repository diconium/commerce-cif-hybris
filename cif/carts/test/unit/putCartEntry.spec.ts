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
import { put as putCartEntry } from '../../src/actions/entries';
import { put as validateCartEntry } from '../../src/validations/entries';
const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const validInput = require('../resources/entry/valid-put-cart-entry-input.json');
const validAuthenticatedInput = require('../resources/entry/valid-authenticated-put-cart-entry-input.json');
const validBody = require('../resources/entry/valid-body-entry.json');

const invalidInputNoId = require('../resources/entry/invalid-put-cart-entry-input-no-id.json');
const invalidInputNoProductVariantId = require('../resources/entry/invalid-put-cart-entry-input-no-cart-entry-id.json');
const invalidInputNoQuantity = require('../resources/entry/invalid-put-cart-entry-input-no-quantity.json');
const invalidInput = require('../resources/entry/invalid-put-cart-entry-input.json');
const cartEntryNotFound = require('../resources/entry/cartEntryNotFound.json');
const customerNotAuthorizedExample = require('../resources/cartNotAuthorized.json');
const successResponseDto = require('../resources/entry/success-response-dto.json');

describe('putCartEntry', () => {

  describe('Unit tests', () => {

    const scope = nock('https://hybris.example.com');

    it('Gravity point down!', () => {
      expect(true).to.equal(true);
    });

    it('Should return something', () => {
      expect(putCartEntry).to.exist;
    });

    describe('Validation',  () => {
      it('Validation should return a valid input', async () => {
        const { parameters } = await validateCartEntry({ id: 'f527bf4b-dda3-4e99-a76b-03a2ebe1ae94', cartEntryId: '1', quantity: 2 });
        expect(parameters.id).to.be.equal('f527bf4b-dda3-4e99-a76b-03a2ebe1ae94');
        expect(parameters.entry.entryNumber).to.be.equal('1');
        expect(parameters.entry.quantity).to.be.equal(2);
      });

      it('Validation should return MissingPropertyError errorOutput if no id is provided', async () => {
        const { errorOutput } = await validateCartEntry({ cartEntryId: '1', quantity: 2 });
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'id\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Validation should return MissingPropertyError errorOutput if no cartEntryId is provided', async () => {
        const { errorOutput } = await validateCartEntry({ id: 'f527bf4b-dda3-4e99-a76b-03a2ebe1ae94', quantity: 2 });
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'cartEntryId\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Validation should return MissingPropertyError errorOutput if no quantity is provided', async () => {
        const { errorOutput } = await validateCartEntry({ id: 'f527bf4b-dda3-4e99-a76b-03a2ebe1ae94', cartEntryId: '1' });
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'quantity\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Validation should return InvalidArgumentError errorOutput if an invalid quantity is provided', async() => {
        const { errorOutput } = await validateCartEntry({ id: 'f527bf4b-dda3-4e99-a76b-03a2ebe1ae94', cartEntryId: '1', quantity: -1 });
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'invalid-argument',
          },
          message: "Parameter 'quantity' must be greater or equal to 0",
          name: 'InvalidArgumentError',
        });
      });
    });

    describe('Service',  () => {
      it('Action should return MissingPropertyError errorOutput if no id is provided', async () => {
        const { errorOutput } = await putCartEntry(invalidInputNoId);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'id\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Action should return MissingPropertyError errorOutput if no productVariantId is provided', async () => {
        const { errorOutput } = await putCartEntry(invalidInputNoProductVariantId);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'cartEntryId\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Action should return MissingPropertyError errorOutput if no quantity is provided', async () => {
        const { errorOutput } = await putCartEntry(invalidInputNoQuantity);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'quantity\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Action should return  errorOutput if an invalid quantity is provided', async () => {
        const { errorOutput } = await putCartEntry(invalidInput);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'invalid-argument',
          },
          message: "Parameter 'quantity' must be greater or equal to 0",
          name: 'InvalidArgumentError',
        });
      });

      it('Should return CommerceServiceForbiddenError if user is not allowed to add entry to the cart', async () => {
        scope.patch('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94/entries/0')
          .query({ lang: 'en', fields: 'FULL' })
          .reply(403, customerNotAuthorizedExample);
        const { errorOutput } = await putCartEntry(validInput);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'UnauthorizedError',
          },
          message: 'Full authentication is required to access this resource',
          name: 'CommerceServiceForbiddenError',
        });
      });

      it('Should return CommerceServiceResourceNotFoundError if the cart entry is not found', async () => {
        scope.patch('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94/entries/0')
          .query({ fields: 'FULL', lang: 'en' })
          .reply(400, cartEntryNotFound);

        const { errorOutput } = await putCartEntry(validInput);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'CartEntryErrornotFound',
          },
          message: 'Entry not found',
          name: 'CommerceServiceResourceNotFoundError',
        });
      });

      it('Should return 200 if new entry was successfully added', async () => {
        scope.patch('/rest/v2/electronics/users/anonymous/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94/entries/0', { quantity: 2 })
          .query({ lang: 'en', fields: 'FULL' })
          .reply(200, successResponseDto);
        const { parameters , errorOutput } = await putCartEntry(validInput);
        expect(errorOutput).to.be.undefined;
        expect(parameters.id).to.equal('f527bf4b-dda3-4e99-a76b-03a2ebe1ae94');
      });

      it('Should return a valid input if new entry was successfully added to the authenticated cart', async () => {
        scope.patch('/rest/v2/electronics/users/current/carts/f527bf4b-dda3-4e99-a76b-03a2ebe1ae94/entries/1', { quantity: 2 })
          .query({ fields: 'FULL', lang: 'en' })
          .reply(200, successResponseDto);
        const { parameters, errorOutput } = await putCartEntry(validAuthenticatedInput);
        expect(errorOutput).to.be.undefined;
        expect(parameters.id).to.equal('f527bf4b-dda3-4e99-a76b-03a2ebe1ae94');
      });
    });
  });
});
