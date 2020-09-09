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
import { getById as getShoppingListEntryById } from '../../src/actions/entries';
import { getById as getShoppingListEntryByIdValidation } from '../../src/validations/entries';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const adobeValidResponse = require('../resources/entry/adobeValidGetEntryByIdResponse.json');
const customerNotAuthorizedExample = require('../resources/cartNotAuthorized.json');
const entryExample = require('../resources/entry/singleEntryExample.json');
const entryNotFound = require('../resources/entry/entryNotFound.json');
const validInput = require('../resources/entry/validGetShoppingListEntryByIdInput.json');

describe('getShoppingListEntryById', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity points down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      const blankInput = {};
      const incorrectInput = {
        id: '00001000',
      };
      const correctInput = {
        id: '00001000',
        entryId: '0',
      };

      it('Validation should return error if \'id\' is missing', async () => {
        const { errorOutput } = await getShoppingListEntryByIdValidation(blankInput);
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'id\' is missing.');
      });

      it('Validation should return error if \'entryId\' is missing', async () => {
        const { errorOutput } = await getShoppingListEntryByIdValidation(incorrectInput);
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'entryId\' is missing.');
      });

      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await getShoppingListEntryByIdValidation(correctInput);
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.to.haveOwnProperty('id').that.equals('00001000');
        expect(parameters).to.be.ok.and.to.haveOwnProperty('entryId').that.equals('0');
      });
    });

    describe('Service', () => {
      it('Should return something', () => {
        const customer = getShoppingListEntryById(validInput);
        expect(customer).to.exist;
      });

      it('Should return CommerceServiceResourceNotFoundError if there is no entry for the given id in the shopping list', async () => {
        scope.get('/rest/v2/electronics/users/current/carts/00001000/entries/2')
          .query({
            fields: 'FULL',
            lang: 'en',
          })
          .reply(404, entryNotFound);
        validInput.parameters.entryId = 2;
        const { response } = await getShoppingListEntryById(validInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'CartEntryErrornotFound',
          },
          message: 'Entry not found',
          name: 'CommerceServiceResourceNotFoundError',
        });
      });

      it('Should return CommerceServiceForbiddenError if user is not allowed to get the shopping list', async () => {
        scope.get('/rest/v2/electronics/users/current/carts/00001000/entries/0')
          .query({
            fields: 'FULL',
            lang: 'en',
          })
          .reply(403, customerNotAuthorizedExample);
        validInput.parameters.entryId = 0;
        const { response } = await getShoppingListEntryById(validInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'UnauthorizedError',
          },
          message: 'Full authentication is required to access this resource',
          name: 'CommerceServiceForbiddenError',
        });
      });

      it('Should have a response with the correct entries within this shopping list for current user', async () => {
        scope.get('/rest/v2/electronics/users/current/carts/00001000/entries/0')
          .query({
            fields: 'FULL',
            lang: 'en',
          })
          .reply(200, entryExample);
        validInput.parameters.entryId = 0;
        const { response } = await getShoppingListEntryById(validInput);
        const { body } = response;
        expect(body).to.be.ok.and.to.to.shallowDeepEqual(adobeValidResponse);
      });

    });
  });
});
