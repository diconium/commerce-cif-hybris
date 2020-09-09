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

import { deleteById as deleteCartById } from '../../src/actions/carts';
import { deleteById as deleteCartByIdValidation } from '../../src/validations/carts';

const validInput = require('../resources/valid-delete-cart-input.json');
const validAuthenticatedInput = require('../resources/valid-authenticated-delete-cart-input.json');
const invalidInput = require('../resources/invalid-delete-cart-input.json');
const customerNotAuthorizedExample = require('../resources/cartNotAuthorized.json');
const cartNotFound = require('../resources/cartNotFound.json');

describe('deleteCartById', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity point down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      it('Validation should return error if \'id\' is missing', async () => {
        const { errorOutput } = await deleteCartByIdValidation({});
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'id\' is missing.');
      });

      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await deleteCartByIdValidation({ id: '00000001' });
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.to.haveOwnProperty('id').that.equals('00000001');
      });
    });

    describe('Service', () => {
      it('Should return something', () => {
        expect(deleteCartById).to.exist;
      });

      it('Should return MissingPropertyError errorOutput if no id is provided', async () => {
        const { response } = await deleteCartById(invalidInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'id\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Should return CommerceServiceForbiddenError if not allowed to delete the cart', async () => {
        scope.delete('/rest/v2/electronics/users/anonymous/carts/ce280b6d-61f0-41e7-acb4-d670546f744b')
          .query({ lang: 'en' })
          .reply(403, customerNotAuthorizedExample);
        const { response } = await deleteCartById(validInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'UnauthorizedError',
          },
          message: 'Full authentication is required to access this resource',
          name: 'CommerceServiceForbiddenError',
        });
      });

      it('Should return CommerceServiceResourceNotFoundError if cart to delete is not found', async () => {
        scope.delete('/rest/v2/electronics/users/anonymous/carts/ce280b6d-61f0-41e7-acb4-d670546f744b').query({ lang: 'en' })
          .reply(404, cartNotFound);
        const { response } = await deleteCartById(validInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'CartErrornotFound',
          },
          message: 'Cart not found.',
          name: 'CommerceServiceResourceNotFoundError',
        });
      });

      it('Should return 200 was successfully deleted', async () => {
        scope.delete('/rest/v2/electronics/users/anonymous/carts/ce280b6d-61f0-41e7-acb4-d670546f744b').query({ lang: 'en' })
          .reply(200);
        const { response } = await deleteCartById(validInput);
        expect(response.statusCode).to.equal(204);
        expect(response.body).to.deep.equal({});
      });

      it('Should return 200 was successfully deleted for authenticated cart', async () => {
        scope.delete('/rest/v2/electronics/users/current/carts/00000006').query({ lang: 'en' })
          .reply(200);
        const { response } = await deleteCartById(validAuthenticatedInput);
        expect(response.statusCode).to.equal(204);
        expect(response.body).to.deep.equal({});
      });
    });
  });
});
