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

import { deleteById as deleteShoppingListEntryById } from '../../src/actions/entries';
import { deleteById as deleteShoppingListEntryByIdValidation } from '../../src/validations/entries';

const cartNotFound = require('../resources/cartNotFound.json');
const customerNotAuthorizedExample = require('../resources/cartNotAuthorized.json');
const invalidInput = require('../resources/entry/invalidDeleteShoppingListEntryInput.json');
const invalidInputWithId = require('../resources/entry/invalidDeleteShoppingListEntryInputWithId.json');
const validAuthenticatedInput = require('../resources/entry/validAuthenticatedDeleteShoppingListEntryInput.json');
const validInput = require('../resources/entry/validDeleteShoppingListEntryInput.json');

describe('deleteShoppingListEntryById', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity point down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      it('Validation should return error if \'id\' is missing', async () => {
        const { errorOutput } = await deleteShoppingListEntryByIdValidation({});
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'id\' is missing.');
      });

      it('Validation should return error if \'entryId\' is missing', async () => {
        const { errorOutput } = await deleteShoppingListEntryByIdValidation({ id: '00000001' });
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'entryId\' is missing.');
      });

      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await deleteShoppingListEntryByIdValidation({ id: '00000001', entryId: '1' });
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.to.haveOwnProperty('id').that.equals('00000001');
        expect(parameters).to.be.ok.and.to.haveOwnProperty('entryId').that.equals('1');
      });
    });

    describe('Service', () => {
      it('Should return something', () => {
        expect(deleteShoppingListEntryById).to.exist;
      });

      it('Should return MissingPropertyError errorOutput if no id is provided', async () => {
        const { response } = await deleteShoppingListEntryById(invalidInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'id\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Should return MissingPropertyError errorOutput if no entryId is provided', async () => {
        const { response } = await deleteShoppingListEntryById(invalidInputWithId);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'entryId\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Should return CommerceServiceForbiddenError if not allowed to delete the entry', async () => {
        scope.delete('/rest/v2/electronics/users/anonymous/carts/ce280b6d-61f0-41e7-acb4-d670546f744b/entries/1')
          .query({ lang: 'en' })
          .reply(403, customerNotAuthorizedExample);
        const { response } = await deleteShoppingListEntryById(validInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'UnauthorizedError',
          },
          message: 'Full authentication is required to access this resource',
          name: 'CommerceServiceForbiddenError',
        });
      });

      it('Should return CommerceServiceResourceNotFoundError if entry to delete is not found', async () => {
        scope.delete('/rest/v2/electronics/users/current/carts/00000006/entries/1')
          .query({
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
          })
          .reply(404, cartNotFound);
        const { response } = await deleteShoppingListEntryById(validAuthenticatedInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'CartErrornotFound',
          },
          message: 'Cart not found.',
          name: 'CommerceServiceResourceNotFoundError',
        });
      });

      it('Should return 204 was successfully deleted for authenticated user', async () => {
        scope.delete('/rest/v2/electronics/users/current/carts/00000006/entries/1')
          .query({
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
          })
          .reply(204);
        const { response } = await deleteShoppingListEntryById(validAuthenticatedInput);
        expect(response.statusCode).to.equal(204);
        expect(response.body).to.deep.equal({});
      });
    });

  });
});
