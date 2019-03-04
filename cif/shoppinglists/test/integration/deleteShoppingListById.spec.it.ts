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

import { deleteById as deleteShoppingListById } from '../../src/actions/shoppinglists';
import { TestUtils } from '@diconium/commerce-cif-hybris-common/TestUtils';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiShallowDeepEqual = require('chai-shallow-deep-equal');

chai.use(chaiShallowDeepEqual);
chai.use(chaiHttp);
const { expect } = chai;

const validInput = require('../resources/validDeleteCartInput.json');

describe('Delete Shopping List By Id', function ()  {
  this.timeout(25000);
  describe('Integration tests', () => {

    before(() => {

      return chai.request(`${TestUtils.getHybrisInstance()}rest/v2/electronics/users/anonymous/`)
        .post('carts')
        .then((response) => {
          validInput.parameters.id = response.body.guid;
        });

    });

    it('Should return 200 if the cart was successfully deleted', async () => {
      const { response } = await deleteShoppingListById(validInput);
      expect(response.statusCode).to.equal(204);
      expect(response.error).to.not.exist;
    });

  });
});
