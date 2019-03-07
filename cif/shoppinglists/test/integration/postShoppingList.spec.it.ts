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
const chaiShallowDeepEqual = require('chai-shallow-deep-equal');
import { patch as patchShoppingList, post as postShoppingList } from '../../src/actions/shoppinglists';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const invalidInput = require('../resources/validGetShoppingListByIdInputAnonymousIntegration.json');
const validInput = require('../resources/validGetShoppingListByIdInputIntegration.json');

describe('patchShoppingList', function () {
  this.timeout(25000);
  describe('Integration tests',  () => {

    before(async () => {
      validInput.settings.bearer = await TestUtils.getBearer();
    });

    after(() => {
      return TestUtils.deleteCartById(validInput.parameters.id);
    });

    it('Response should be a ForbiddenError if token is not valid for this customer', async () => {
      const { errorOutput } = await postShoppingList(invalidInput);
      expect(errorOutput).to.exist.and.to.deep.equal({
        cause: {
          message: 'ForbiddenError',
        },
        message: 'Access is denied',
        name: 'CommerceServiceForbiddenError',
      });
    });

    it('Response should be 200 if the shopping list exists with that number for the current user if bearer is valid', async () => {
      const { parameters, errorOutput } = await postShoppingList(validInput);
      expect(errorOutput).not.to.exist;
      expect(parameters).to.be.ok.and.to.haveOwnProperty('id').and.to.equal(validInput.parameters.id);
      expect(parameters).to.be.ok.and.to.haveOwnProperty('name').and.to.equal(validInput.parameters.name);

      validInput.parameters.id = parameters.id;
      const { response } = await patchShoppingList(validInput);
      const { statusCode, body } = response;
      expect(statusCode).to.be.equal(200);
      expect(body).to.be.ok.and.to.haveOwnProperty('id').and.to.equal(validInput.parameters.id);
      expect(body).to.be.ok.and.to.haveOwnProperty('name').and.to.equal(validInput.parameters.name);
    });
  });
});
