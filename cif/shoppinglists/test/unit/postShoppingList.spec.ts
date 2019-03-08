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
import { post as postShoppingList } from '../../src/actions/shoppinglists';
import { post as validatePostShoppingList } from '../../src/validations/shoppinglists';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const cartCreated = require('../resources/cartCreatedExample.json');
const customerNotAuthorizedExample = require('../resources/cartNotAuthorized.json');
const invalidInput = require('../resources/invalidPatchShoppingListInputWithoutBearer.json');
const validInput = require('../resources/validPatchShoppingListInput.json');

describe('postShoppingList', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity points down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      const incorrectInput = {};
      it('Validation should return error if \'name\' is missing', async () => {
        const { errorOutput } = await validatePostShoppingList(incorrectInput);
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'name\' is missing.');
      });

      const correctInput = {
        name: 'Sample_Cart_Name',
      };
      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await validatePostShoppingList(correctInput);
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.to.haveOwnProperty('name').that.equals('Sample_Cart_Name');
      });
    });

    describe('Service', () => {
      it('Should return something', () => {
        expect(postShoppingList).to.exist;
      });

      it('Should return CommerceServiceForbiddenError if user is not allowed to create the cart', async () => {
        scope.post('/rest/v2/electronics/users/current/carts')
          .query({
            lang: 'en',
            fields: 'FULL',
          })
          .reply(403, customerNotAuthorizedExample);
        const { errorOutput } = await postShoppingList(invalidInput);
        expect(errorOutput).to.be.deep.equal({
          cause: {
            message: 'UnauthorizedError',
          },
          message: 'Full authentication is required to access this resource',
          name: 'CommerceServiceForbiddenError',
        });
      });

      it('Should have a response with the correct shopping list id for current user', async () => {
        scope.post('/rest/v2/electronics/users/current/carts')
          .query({
            fields: 'FULL',
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
          })
          .reply(200, cartCreated);
        const { responseExtension, errorOutput } = await postShoppingList(validInput);
        expect(errorOutput).to.be.undefined;
        expect(responseExtension).to.deep.equal({
          id: '00001002',
        });
      });
    });
  });

});
