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
import { getById as getShoppingListById } from '../../src/actions/shoppinglists';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const validInput = require('../resources/validGetShoppingListByIdInputAnonymous.json');
const validInputOauth = require('../resources/validGetShoppingListByIdInput.json');

describe('getShoppingListById', function () {
  this.timeout(25000);
  describe('Integration tests',  () => {

    before(async() => {
      chai.request(`${TestUtils.getHybrisInstance()}rest/v2/electronics/users/anonymous/`)
        .post('carts')
        .then((response) => {
          validInput.parameters.id = response.body.guid;
        });

      validInputOauth.settings.bearer = await TestUtils.getBearer();
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

    it('Response should be 200 if the shopping list exists with that number for the anonymous user', async () => {
      const { response } = await getShoppingListById(validInput);
      const { statusCode, body } = response;
      expect(statusCode).to.be.equal(200);
      expect(body).to.be.ok.and.to.haveOwnProperty('id').and.to.equal(validInput.parameters.id);
    });

    // For this test to execute the login interface needs to be available
    it('Response should be 200 if the shopping list exists with that number for the current user if bearer is valid', async () => {
      const {  response } = await getShoppingListById(validInputOauth);
      const { statusCode, body } = response;
      expect(statusCode).to.be.equal(200);
      expect(body).to.be.ok.and.to.haveOwnProperty('id').and.to.equal(validInputOauth.parameters.id);
      expect(body).to.be.ok.and.to.haveOwnProperty('name').and.to.equal(validInputOauth.parameters.saveCartName);
    });
  });
});
