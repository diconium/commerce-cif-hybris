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
import { get as getShoppingListEntries } from '../../src/actions/entries';
import { get as getShoppingListEntriesValidation } from '../../src/validations/entries';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const adobeEmptyResponse = require('../resources/adobeEmptyGetShoppingListsResponse.json');
const adobeValidResponse = require('../resources/entry/adobeValidGetEntriesResponse.json');
const emptyEntriesExample = require('../resources/entry/emptyEntriesExample.json');
const entriesExample = require('../resources/entry/entriesExample.json');
const validInput = require('../resources/validGetShoppingListByIdInput.json');
const validInputWithPagination = require('../resources/entry/validGetEntriesInputWithPagination.json');

describe('getShoppingListEntries', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity points down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      it('Validation should return error if \'id\' is missing', async () => {
        const { errorOutput } = await getShoppingListEntriesValidation({});
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'id\' is missing.');
      });

      const correctInput = {
        id: '00001000',
      };
      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await getShoppingListEntriesValidation(correctInput);
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.to.haveOwnProperty('id').that.equals('00001000');
      });
    });

    describe('Service', () => {
      it('Function should return something', () => {
        const customer = getShoppingListEntries(validInput);
        expect(customer).to.exist;
      });

      it('Action should return an empty response if there are no entries in the shopping list', async () => {
        scope.get('/rest/v2/electronics/users/current/carts/00001000/entries')
          .query({
            fields: 'FULL',
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
          })
          .reply(200, emptyEntriesExample);
        const { response } = await getShoppingListEntries(validInput);
        const { body } = response;
        expect(body).to.be.ok.and.to.to.shallowDeepEqual(adobeEmptyResponse);
      });

      it('Action should have a response with the correct entries within this shopping list for current user', async () => {
        scope.get('/rest/v2/electronics/users/current/carts/00001000/entries')
          .query({
            fields: 'FULL',
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
          })
          .reply(200, entriesExample);
        const { response } = await getShoppingListEntries(validInput);
        const { body } = response;
        expect(body).to.be.ok.and.to.to.shallowDeepEqual(adobeValidResponse);
      });

      it('Action should have a response with the correct entries within this shopping list for current user, with pagination', async () => {
        scope.get('/rest/v2/electronics/users/current/carts/00001000/entries')
          .query({
            fields: 'FULL',
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
            currentPage: 0,
            pageSize: 20,
          })
          .reply(200, entriesExample);
        const { response } = await getShoppingListEntries(validInputWithPagination);
        const { body } = response;
        expect(body).to.be.ok.and.to.to.shallowDeepEqual(adobeValidResponse);
      });

    });
  });
});
