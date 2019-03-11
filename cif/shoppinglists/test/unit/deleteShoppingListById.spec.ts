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

import { deleteById as deleteShoppingListById } from '../../src/actions/shoppinglists';
import { deleteById as deleteShoppingListByIdValidation } from '../../src/validations/shoppinglists';

const cartNotFound = require('../resources/cartNotFound.json');
const customerNotAuthorizedExample = require('../resources/cartNotAuthorized.json');
const invalidInput = require('../resources/invalidDeleteCartInput.json');
const validAuthenticatedInput = require('../resources/validAuthenticatedDeleteCartInput.json');
const validInput = require('../resources/validDeleteCartInput.json');

describe('deleteShoppingListById', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity point down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      it('Validation should return error if \'id\' is missing', async () => {
        const { errorOutput } = await deleteShoppingListByIdValidation({});
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'id\' is missing.');
      });

      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await deleteShoppingListByIdValidation({ id: '00000001' });
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.to.haveOwnProperty('id').that.equals('00000001');
      });
    });

    describe('Service', () => {
      it('Should return something', () => {
        expect(deleteShoppingListById).to.exist;
      });

      it('Should return MissingPropertyError errorOutput if no id is provided', async () => {
        const { response } = await deleteShoppingListById(invalidInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'id\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Should return CommerceServiceForbiddenError if not allowed to delete the cart', async () => {
        scope.delete('/rest/v2/electronics/users/current/carts/00000006')
          .query({ lang: 'en' })
          .reply(403, customerNotAuthorizedExample);
        const { response } = await deleteShoppingListById(validInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'UnauthorizedError',
          },
          message: 'Full authentication is required to access this resource',
          name: 'CommerceServiceForbiddenError',
        });
      });

      it('Should return CommerceServiceResourceNotFoundError if cart to delete is not found', async () => {
        scope.delete('/rest/v2/electronics/users/current/carts/00000006')
          .query({
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
          })
          .reply(404, cartNotFound);
        const { response } = await deleteShoppingListById(validAuthenticatedInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'CartErrornotFound',
          },
          message: 'Cart not found.',
          name: 'CommerceServiceResourceNotFoundError',
        });
      });

      it('Should return 204 was successfully deleted for authenticated user', async () => {
        scope.delete('/rest/v2/electronics/users/current/carts/00000006')
          .query({
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
          })
          .reply(204);
        const { response } = await deleteShoppingListById(validAuthenticatedInput);
        expect(response.statusCode).to.equal(204);
        expect(response.body).to.deep.equal({});
      });
    });
  });
});
