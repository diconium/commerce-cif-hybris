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

import { deleteById as deleteCartEntryById } from '../../src/actions/entries';
import { TestUtils } from '../../../common/TestUtils';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiShallowDeepEqual = require('chai-shallow-deep-equal');

chai.use(chaiShallowDeepEqual);
chai.use(chaiHttp);
const { expect } = chai;

const validInput = require('../resources/entry/valid-delete-cart-entry-input.json');

describe('deleteCartEntry', function ()  {
  this.timeout(25000);
  describe('Integration tests', () => {

    before(async () => {
      await TestUtils.postAnonymousCartWithProduct()
        .then((id) => {
          validInput.parameters.id = id;
        });
    });

    it('Action return 200 if the cart entry was successfully deleted', async () => {
      const { parameters, errorOutput } = await deleteCartEntryById(validInput);

      expect(errorOutput).to.be.undefined;
      expect(parameters.id).to.be.equal(validInput.parameters.id);
    });
  });
});
