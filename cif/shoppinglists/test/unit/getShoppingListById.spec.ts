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
import { getById as getShoppingListById } from '../../src/actions/shoppinglists';
import { getById as getShoppingListByIdValidation } from '../../src/validations/shoppinglists';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const cartNotFoundExample = require('../resources/cartNotFound.json');
const customerNotAuthorizedExample = require('../resources/cartNotAuthorized.json');
const invalidInput = require('../resources/invalidGetShoppingListByIdInput.json');
const validInput = require('../resources/validGetShoppingListByIdInput.json');
const shoppingListExample = require('../resources/shoppingListExample-00001000.json');

describe('getShoppingListById', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity points down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      it('Validation should return error if \'id\' is missing', async () => {
        const { errorOutput } = await getShoppingListByIdValidation(invalidInput);
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'id\' is missing.');
      });

      const correctInput = {
        id: '00001000',
      };
      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await getShoppingListByIdValidation(correctInput);
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.to.haveOwnProperty('id').that.equals('00001000');
      });
    });

    describe('Service', () => {
      it('Should return something', () => {
        const customer = getShoppingListById(invalidInput);
        expect(customer).to.exist;
      });

      it('Should return MissingPropertyError errorOutput if no id is provided', async () => {
        const { response } = await getShoppingListById(invalidInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'id\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Should return CommerceServiceResourceNotFoundError if a shopping list does not exist with the id', async () => {
        scope.get('/rest/v2/electronics/users/current/carts/00001000/savedcart')
          .query({
            fields: 'FULL',
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
          })
          .reply(404, cartNotFoundExample);
        const { response } = await getShoppingListById(validInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'CartErrornotFound',
          },
          message: 'Cart not found.',
          name: 'CommerceServiceResourceNotFoundError',
        });
      });

      it('Should return CommerceServiceForbiddenError if user is not allowed to get the shopping list', async () => {
        scope.get('/rest/v2/electronics/users/current/carts/00001000/savedcart')
          .query({
            fields: 'FULL',
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
          })
          .reply(403, customerNotAuthorizedExample);
        const { response } = await getShoppingListById(validInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'UnauthorizedError',
          },
          message: 'Full authentication is required to access this resource',
          name: 'CommerceServiceForbiddenError',
        });
      });

      it('Should have a response with the correct shopping list id for current user', async () => {
        scope.get('/rest/v2/electronics/users/current/carts/00001000/savedcart')
          .query({
            fields: 'FULL',
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
          })
          .reply(200, shoppingListExample);
        const { response } = await getShoppingListById(validInput);
        const { body } = response;
        expect(body.id).to.equal('00001000');
      });
    });
  });
});
