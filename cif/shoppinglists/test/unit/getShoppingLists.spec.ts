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
import { get as getShoppingLists } from '../../src/actions/shoppinglists';
import { get as getShoppingListsValidation } from '../../src/validations/shoppinglists';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const adobeEmptyResponse = require('../resources/adobeEmptyGetShoppingListsResponse.json');
const adobeValidResponse = require('../resources/adobeValidGetShoppingListsResponse.json');
const emptyShoppingListsExample = require('../resources/emptyShoppingLists.json');
const validInput = require('../resources/validGetShoppingListsInput.json');
const validInputWithPagination = require('../resources/validGetShoppingListsInputWithPagination.json');
const invalidInputWithPagination = require('../resources/invalidGetShoppingListsInputWithPagination.json');
const shoppingListsExample = require('../resources/shoppingListsExample.json');

describe('getShoppingLists', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity points down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {

      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput } = await getShoppingListsValidation({});
        expect(errorOutput).to.not.exist;
      });
    });

    describe('Service', () => {
      it('Function should return something', () => {
        const customer = getShoppingLists(validInput);
        expect(customer).to.exist;
      });

      it('Action should return an empty response if there are no shopping lists', async () => {
        scope.get('/rest/v2/electronics/users/current/carts')
          .query({
            fields: 'FULL',
            savedCartsOnly: true,
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
          })
          .reply(200, emptyShoppingListsExample);
        const { response } = await getShoppingLists(validInput);
        const { body } = response;
        expect(body).to.be.ok.and.to.to.shallowDeepEqual(adobeEmptyResponse);
      });

      it('Action should have an empty response when pagination input exceeds limit', async () => {
        scope.get('/rest/v2/electronics/users/current/carts')
          .query({
            pageSize: 1,
            currentPage: 2,
            fields: 'FULL',
            savedCartsOnly: true,
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
          })
          .reply(200, emptyShoppingListsExample);
        const { response } = await getShoppingLists(invalidInputWithPagination);
        const { body } = response;
        expect(body).to.be.ok.and.to.to.shallowDeepEqual(adobeEmptyResponse);
      });

      it('Action should have a response with the correct shopping list id for current user', async () => {
        scope.get('/rest/v2/electronics/users/current/carts')
          .query({
            fields: 'FULL',
            savedCartsOnly: true,
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
          })
          .reply(200, shoppingListsExample);
        const { response } = await getShoppingLists(validInput);
        const { body } = response;
        expect(body).to.be.ok.and.to.to.shallowDeepEqual(adobeValidResponse);
      });

      it('Action should have a response with the correct shopping list id for current user, with pagination', async () => {
        scope.get('/rest/v2/electronics/users/current/carts')
          .query({
            pageSize: 1,
            currentPage: 0,
            fields: 'FULL',
            savedCartsOnly: true,
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
          })
          .reply(200, shoppingListsExample);
        const { response } = await getShoppingLists(validInputWithPagination);
        const { body } = response;
        expect(body).to.be.ok.and.to.to.shallowDeepEqual(adobeValidResponse);
      });
    });
  });
});
