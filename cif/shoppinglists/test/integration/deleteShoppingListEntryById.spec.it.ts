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
import { deleteById as deleteShoppingListEntryById } from '../../src/actions/entries';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiShallowDeepEqual = require('chai-shallow-deep-equal');
chai.use(chaiShallowDeepEqual);
chai.use(chaiHttp);
const { expect } = chai;

const validInput = require('../resources/entry/validDeleteShoppingListEntryInput.json');
const invalidInput = require('../resources/entry/validDeleteShoppingListEntryInput.json');

describe('deleteShoppingListEntryById', () => {
  this.timeout(25000);
  describe('Integration tests', () => {

    let id;
    before(async () => {
      validInput.settings.bearer = await TestUtils.getBearer();

      await chai.request(`${TestUtils.getHybrisInstance()}rest/v2/electronics/users/current/`)
        .post(`carts?access_token=${validInput.settings.bearer}`)
        .then((response) => {
          id = response.body.code;
        })
        .then(() => {
          chai.request(`${TestUtils.getHybrisInstance()}rest/v2/electronics/users/current/`)
          .post(`carts/${id}/entries?access_token=${validInput.settings.bearer}`)
          .then((response) => {
            invalidInput.parameters.id = response.body.code;
            validInput.parameters.id = response.body.code;
          });
        });
    });

    after(() => {
      return TestUtils.deleteCartById(id);
    });

    it('Response should be a ForbiddenError if token is not valid for this customer', async () => {
      const { response } = await deleteShoppingListEntryById(invalidInput);
      expect(response.error).to.exist.and.to.deep.equal({
        cause: {
          message: 'ForbiddenError',
        },
        message: 'Access is denied',
        name: 'CommerceServiceForbiddenError',
      });
    });

    it('Should return 200 if the cart was successfully deleted', async () => {
      const { response } = await deleteShoppingListEntryById(validInput);
      expect(response.statusCode).to.equal(204);
      expect(response.error).to.not.exist;
    });

  });
});
