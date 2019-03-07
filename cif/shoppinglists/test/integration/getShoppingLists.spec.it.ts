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

const invalidInput = require('../resources/validGetShoppingListByIdInputAnonymousIntegration.json');
const validInput = require('../resources/validGetShoppingListByIdInput.json');
const validInputWithPagination = require('../resources/validGetShoppingListInputWithPagination.json');

describe('getShoppingLists', function () {
  this.timeout(25000);
  describe('Integration tests',  () => {

    let id;
    before(async () => {
      validInput.settings.bearer = await TestUtils.getBearer();
      validInputWithPagination.settings.bearer = validInput.settings.bearer;

      await chai.request(`${TestUtils.getHybrisInstance()}rest/v2/electronics/users/current/`)
        .post(`carts?access_token=${validInput.settings.bearer}`)
        .then((response) => {
          id = response.body.code;
        })
        .then(() => {
          chai.request(`${TestUtils.getHybrisInstance()}rest/v2/electronics/users/current/`)
            .patch(`carts/${id}/save?
            saveCartName=${validInput.parameters.name}&
            access_token=${validInput.settings.bearer}`)
            .then((response) => {
              invalidInput.parameters.id = response.body.code;
              validInput.parameters.id = response.body.code;
              validInputWithPagination.parameters.id = response.body.code;
            });
        });
    });

    after(() => {
      return TestUtils.deleteCartById(validInput.parameters.id);
    });

    it('Response should be a ForbiddenError if token is not valid for this customer', async () => {
      const { response } = await getShoppingLists(invalidInput);
      expect(response.error).to.exist.and.to.deep.equal({
        cause: {
          message: 'ForbiddenError',
        },
        message: 'Access is denied',
        name: 'CommerceServiceForbiddenError',
      });
    });

    it('Response should be 200 if any shopping list exists for the current user, if bearer is valid', async () => {
      const {  response } = await getShoppingLists(validInput);
      const { statusCode, body } = response;
      expect(statusCode).to.be.equal(200);
      expect(body).to.be.ok.and.to.haveOwnProperty('offset').and.to.equal(0);
      expect(body).to.be.ok.and.to.haveOwnProperty('count').and.to.equal(1);
      expect(body).to.be.ok.and.to.haveOwnProperty('total').and.to.equal(1);
      expect(body.results[0]).to.deep.include({ name: validInput.parameters.name });
    });

    it('Response should be 200 if any shopping list exists for the current user, with pagination (if bearer is valid)', async () => {
      chai.request(`${TestUtils.getHybrisInstance()}rest/v2/electronics/users/current/`)
        .post(`carts?access_token=${validInputWithPagination.settings.bearer}`)
        .then((response) => {
          validInputWithPagination.parameters.id = response.body.code;
          validInputWithPagination.settings.customerId = 'current';
        });

      chai.request(`${TestUtils.getHybrisInstance()}rest/v2/electronics/users/current/`)
        .patch(`carts/${validInputWithPagination.parameters.id}/save?
                saveCartName=${validInputWithPagination.parameters.name}&
                access_token=${validInputWithPagination.settings.bearer}`)
        .then((response) => {
          validInputWithPagination.parameters.name = response.body.savedCartData.name;
        });

      const { response } = await getShoppingLists(validInputWithPagination);
      const { statusCode, body } = response;
      expect(statusCode).to.be.equal(200);
      expect(body).to.be.ok.and.to.haveOwnProperty('offset').and.to.equal(validInputWithPagination.parameters.offset);
      expect(body).to.be.ok.and.to.haveOwnProperty('count').and.to.equal(2);
      expect(body).to.be.ok.and.to.haveOwnProperty('total').and.to.equal(2);
      expect(body.results[0]).to.deep.include({ name: validInputWithPagination.parameters.name });
    });
  });
});
