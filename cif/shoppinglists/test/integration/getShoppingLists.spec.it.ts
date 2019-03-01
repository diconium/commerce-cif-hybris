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

import { TestUtils } from '@diconium/commerce-cif-hybris-common/TestUtils';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiShallowDeepEqual = require('chai-shallow-deep-equal');
import { getById as getShoppingLists } from '../../src/actions/shoppinglists';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const validInput = require('../resources/validateGetShoppingListByIdAnonymous.json');
const validInputOauth = require('../resources/validateGetShoppingListByIdValid.json');
const validInputOauthWithPagination = require('../resources/validateGetShoppingListValidWithPagination.json');

describe('getShoppingLists', function () {
  this.timeout(25000);
  describe('Integration tests',  () => {

    before(async() => {
      chai.request(`${TestUtils.getHybrisInstance()}rest/v2/electronics/users/anonymous/`)
        .post('carts')
        .then((response) => {
          validInput.parameters.id = response.body.guid;
        });

      validInputOauth.settings.bearer = await TestUtils.getBearer();
      validInputOauthWithPagination.settings.bearer = validInputOauth.settings.bearer;
      chai.request(`${TestUtils.getHybrisInstance()}rest/v2/electronics/users/current/`)
        .post(`carts?access_token=${validInputOauth.settings.bearer}`)
        .then((response) => {
          validInputOauth.parameters.id = response.body.code;
          validInputOauth.settings.customerId = 'current';
        });

      return chai.request(`${TestUtils.getHybrisInstance()}rest/v2/electronics/users/current/`)
        .patch(`carts/${validInputOauth.parameters.id}/save?
                saveCartName=${validInputOauth.parameters.saveCartName}&
                access_token=${validInputOauth.settings.bearer}`)
        .then((response) => {
          validInputOauth.parameters.saveCartName = response.body.savedCartData.name;
          validInput.parameters.saveCartName = response.body.savedCartData.name;
        });
    });

    after(() => {
      return TestUtils.deleteCartById(validInput.parameters.id);
    });

    it('Response should be 200 if any shopping lists exists for the anonymous user', async () => {
      const { response } = await getShoppingLists(validInput);
      const { statusCode, body } = response;
      expect(statusCode).to.be.equal(200);
      expect(body).to.be.ok.and.to.haveOwnProperty('offset').and.to.equal(0);
      expect(body).to.be.ok.and.to.haveOwnProperty('count').and.to.equal(1);
      expect(body).to.be.ok.and.to.haveOwnProperty('total').and.to.equal(1);
      expect(body.results[0]).to.deep.include({ name: validInput.parameters.saveCartName });
    });

    // For this test to execute the login interface needs to be available
    it('Response should be 200 if any shopping list exists for the current user, if bearer is valid', async () => {
      const {  response } = await getShoppingLists(validInputOauth);
      const { statusCode, body } = response;
      expect(statusCode).to.be.equal(200);
      expect(body).to.be.ok.and.to.haveOwnProperty('offset').and.to.equal(0);
      expect(body).to.be.ok.and.to.haveOwnProperty('count').and.to.equal(1);
      expect(body).to.be.ok.and.to.haveOwnProperty('total').and.to.equal(1);
      expect(body.results[0]).to.deep.include({ name: validInputOauth.parameters.saveCartName });
    });

    it('Response should be 200 if any shopping list exists for the current user, if bearer is valid', async () => {
      chai.request(`${TestUtils.getHybrisInstance()}rest/v2/electronics/users/current/`)
        .post(`carts?access_token=${validInputOauthWithPagination.settings.bearer}`)
        .then((response) => {
          validInputOauthWithPagination.parameters.id = response.body.code;
          validInputOauthWithPagination.settings.customerId = 'current';
        });

      chai.request(`${TestUtils.getHybrisInstance()}rest/v2/electronics/users/current/`)
        .patch(`carts/${validInputOauthWithPagination.parameters.id}/save?
                saveCartName=${validInputOauthWithPagination.parameters.saveCartName}&
                access_token=${validInputOauthWithPagination.settings.bearer}`)
        .then((response) => {
          validInputOauthWithPagination.parameters.saveCartName = response.body.savedCartData.name;
        });

      const { response } = await getShoppingLists(validInputOauthWithPagination);
      const { statusCode, body } = response;
      expect(statusCode).to.be.equal(200);
      expect(body).to.be.ok.and.to.haveOwnProperty('offset').and.to.equal(validInputOauthWithPagination.parameters.offset);
      expect(body).to.be.ok.and.to.haveOwnProperty('count').and.to.equal(1);
      expect(body).to.be.ok.and.to.haveOwnProperty('total').and.to.equal(2);
      expect(body.results[0]).to.deep.include({ name: validInputOauthWithPagination.parameters.saveCartName });
    });
  });
});
