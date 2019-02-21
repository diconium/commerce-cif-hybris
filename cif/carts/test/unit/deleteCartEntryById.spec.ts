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
import nock from 'nock';
const { expect } = chai;

import { deleteById as deleteCartEntryById } from '../../src/actions/entries';
import { deleteById as deleteCartEntryByIdValidation } from '../../src/validations/entries';

const validInput = require('../resources/entry/valid-delete-cart-entry-input.json');
const validAuthenticatedInput = require('../resources/entry/valid-authenticated-delete-cart-entry-input.json');
const invalidInputNoId = require('../resources/entry/invalid-delete-cart-entry-input.json');
const invalidInputNoCartEntryId = require('../resources/entry/invalid-delete-cart-entry-input-no-cart-entry-id.json');
const customerNotAuthorizedExample = require('../resources/cartNotAuthorized.json');
const cartEntryNotFound = require('../resources/entry/cartEntryNotFound.json');

describe('deleteCartEntry', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity point down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      it('Validation should return MissingPropertyError if no \'id\' is provided', async () => {
        const { errorOutput } = await deleteCartEntryByIdValidation({});
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'id\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Validation should return error if \'cartEntryId\' is missing', async () => {
        const { errorOutput } = await deleteCartEntryByIdValidation({ id: '00000001' });
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'cartEntryId\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await deleteCartEntryByIdValidation({ id: '00000001', cartEntryId: '1' });
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.to.haveOwnProperty('id').that.equals('00000001');
        expect(parameters).to.be.ok.and.to.haveOwnProperty('cartEntryId').that.equals('1');
      });
    });

    describe('Service', () => {
      it('Action should return something', () => {
        expect(deleteCartEntryById).to.exist;
      });

      it('Action should return MissingPropertyError errorOutput if no id is provided', async () => {
        const { errorOutput } = await deleteCartEntryById(invalidInputNoId);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'id\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Action should return MissingPropertyError errorOutput if no cartEntryId is provided', async () => {
        const { errorOutput } = await deleteCartEntryById(invalidInputNoCartEntryId);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'cartEntryId\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Action should return CommerceServiceForbiddenError if user is not allowed to delete the cart entry', async () => {
        scope.delete('/rest/v2/electronics/users/anonymous/carts/ce280b6d-61f0-41e7-acb4-d670546f744b/entries/0')
          .query({ lang: 'en' })
          .reply(403, customerNotAuthorizedExample);
        const { errorOutput } = await deleteCartEntryById(validInput);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'UnauthorizedError',
          },
          message: 'Full authentication is required to access this resource',
          name: 'CommerceServiceForbiddenError',
        });
      });

      it('Action should return CommerceServiceResourceNotFoundError if cart entry to delete is not found', async () => {
        scope.delete('/rest/v2/electronics/users/anonymous/carts/ce280b6d-61f0-41e7-acb4-d670546f744b/entries/0').query({ lang: 'en' })
          .reply(400, cartEntryNotFound);
        const { errorOutput } = await deleteCartEntryById(validInput);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'CartEntryErrornotFound',
          },
          message: 'Entry not found',
          name: 'CommerceServiceResourceNotFoundError',
        });
      });

      it('Action should return 200 if cart entry was successfully deleted', async () => {
        scope.delete('/rest/v2/electronics/users/anonymous/carts/ce280b6d-61f0-41e7-acb4-d670546f744b/entries/0')
          .query({ lang: 'en' })
          .reply(200);
        const { parameters, errorOutput } = await deleteCartEntryById(validInput);
        expect(errorOutput).not.to.exist;
        expect(parameters.id).to.equal(validInput.parameters.id);
      });

      it('Action should return 200 if cart entry was successfully deleted for authenticated cart', async () => {
        scope.delete('/rest/v2/electronics/users/current/carts/00000006/entries/1')
          .query({ lang: 'en' })
          .query({ access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51' })
          .reply(200);
        const { parameters, errorOutput } = await deleteCartEntryById(validAuthenticatedInput);
        expect(errorOutput).not.to.exist;
        expect(parameters.id).to.equal(validAuthenticatedInput.parameters.id);
      });
    });
  });
});
