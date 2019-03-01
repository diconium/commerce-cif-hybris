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
import { patch as patchShoppingList } from '../../src/actions/shoppinglists';
import { patch as validatePatchShoppingList } from '../../src/validations/shoppinglists';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const cartNotFoundExample = require('../resources/cartNotFound.json');
const shoppingListExample = require('../resources/shoppingListExample-00001000.json');
const invalidInput = require('../resources/validatePatchShoppingListInvalid.json');
const invalidInputWithId = require('../resources/validatePatchShoppingListInvalidWithId.json');
const validInput = require('../resources/validatePatchShoppingListValid.json');

describe('patchShoppingList', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity points down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      const emptyInput = {};
      it('Validation should return error if \'id\' is missing', async () => {
        const { errorOutput } = await validatePatchShoppingList(emptyInput);
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'id\' is missing.');
      });

      const incorrectInput = {
        id: '00001000',
      };
      it('Validation should return error if \'saveCartName\' is missing', async () => {
        const { errorOutput } = await validatePatchShoppingList(incorrectInput);
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'saveCartName\' is missing.');
      });

      const correctInput = {
        id: '00001000',
        saveCartName: 'Sample_Cart_Name',
      };
      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await validatePatchShoppingList(correctInput);
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.to.haveOwnProperty('id').that.equals('00001000');
        expect(parameters).to.be.ok.and.to.haveOwnProperty('saveCartName').that.equals('Sample_Cart_Name');
      });
    });

    describe('Service', () => {
      it('Function should return something', () => {
        expect(patchShoppingList).to.exist;
      });

      it('Response should be a MissingPropertyError when id is missing', async () => {
        const { response } = await patchShoppingList(invalidInput);
        expect(response.error).to.exist.and.to.deep.equal({
          cause: {
            message: 'missing-property',
          },
          name: 'MissingPropertyError',
          message: 'Parameter \'id\' is missing.',
        });
      });

      it('Response should be a MissingPropertyError when saveCartName is missing', async () => {
        const { response } = await patchShoppingList(invalidInputWithId);
        expect(response.error).to.exist.and.to.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'saveCartName\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Action should return CommerceServiceResourceNotFoundError if a shopping list does not exist with the id', async () => {
        scope.patch('/rest/v2/electronics/users/current/carts/00001000/save')
          .query({
            saveCartName: 'Sample_Cart_Name',
            fields: 'FULL',
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
          })
          .reply(404, cartNotFoundExample);
        const { response } = await patchShoppingList(validInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'CartErrornotFound',
          },
          message: 'Cart not found.',
          name: 'CommerceServiceResourceNotFoundError',
        });
      });

      it('Action should have a response with the correct shopping list id for current user', async () => {
        scope.patch('/rest/v2/electronics/users/current/carts/00001000/save')
          .query({
            saveCartName: 'Sample_Cart_Name',
            fields: 'FULL',
            access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
            lang: 'en',
          })
          .reply(200, shoppingListExample);
        const { response } = await patchShoppingList(validInput);
        const { body } = response;
        expect(body.id).to.equal('00001000');
        expect(body.name).to.equal('Sample_Cart_Name');
      });
    });
  });

});
