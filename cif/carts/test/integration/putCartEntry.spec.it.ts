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

import { put as putCartEntry } from '../../src/actions/entries';
import { getById as getCartById } from '../../src/actions/carts';
import { TestUtils } from '../../../common/TestUtils';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiShallowDeepEqual = require('chai-shallow-deep-equal');

chai.use(chaiShallowDeepEqual);
chai.use(chaiHttp);
const { expect } = chai;

const validInput = require('../resources/entry/valid-put-cart-entry-input.json');
const invalidInput = require('../resources/entry/invalid-put-cart-entry-input.json');
const invalidInputNoId = require('../resources/entry/invalid-post-cart-entry-input-no-id.json');
const invalidInputNoProductVariantId = require('../resources/entry/invalid-post-cart-entry-input-no-product-variant-id.json');
const invalidInputNoQuantity = require('../resources/entry/invalid-post-cart-entry-input-no-quantity.json');
const notFoundInput = require('../resources/entry/not-found-put-cart-entry-input.json');

describe('putCartEntry', function ()  {
  this.timeout(25000);
  describe('Integration tests', () => {

    before(async() => {
      validInput.parameters.id = await TestUtils.postAnonymousCartWithProduct();
      notFoundInput.parameters.id = validInput.parameters.id;
    });

    after(() => {
      return chai.request(TestUtils.getHybrisInstance() + 'rest/v2/electronics/users/anonymous/')
        .delete(`carts/${validInput.parameters.id}`);
    });

    it('Action should return MissingPropertyError errorOutput if no id is provided', async() => {
      const { errorOutput } = await putCartEntry(invalidInputNoId);
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'missing-property',
        },
        message: 'Parameter \'id\' is missing.',
        name: 'MissingPropertyError',
      });
    });

    it('Action should return MissingPropertyError errorOutput if no productVariantId is provided', async() => {
      const { errorOutput } = await putCartEntry(invalidInputNoProductVariantId);
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'missing-property',
        },
        message: 'Parameter \'productVariantId\' is missing.',
        name: 'MissingPropertyError',
      });
    });

    it('Action should return MissingPropertyError errorOutput if no quantity is provided', async() => {
      const { errorOutput } = await putCartEntry(invalidInputNoQuantity);
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'missing-property',
        },
        message: 'Parameter \'quantity\' is missing.',
        name: 'MissingPropertyError',
      });
    });

    it('Action should return  errorOutput if an invalid quantity is provided', async() => {
      const { errorOutput } = await putCartEntry(invalidInput);
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'invalid-argument',
        },
        message: "Parameter 'quantity' must be greater or equal to 0",
        name: 'InvalidArgumentError',
      });
    });

    it('Action should return CommerceServiceResourceNotFoundError if the cart entry is not found', async () => {
      const { errorOutput } = await putCartEntry(notFoundInput);
      expect(errorOutput).to.be.deep.equal({
        cause: {
          message: 'CartEntryErrornotFound',
        },
        message: 'Entry not found',
        name: 'CommerceServiceResourceNotFoundError',
      });
    });

    it('Action should return 200 if the given entry was successfully updated', async () => {
      const { parameters , errorOutput } = await putCartEntry(validInput);
      expect(errorOutput).to.be.undefined;
      expect(parameters.id).to.be.equal(validInput.parameters.id);

      const { response } = await getCartById(validInput);
      const { statusCode, body } = response;
      expect(statusCode).to.be.equal(200);
      expect(body).to.be.ok.and.to.haveOwnProperty('id').and.to.equal(validInput.parameters.id);
      expect(body).to.haveOwnProperty('entries').and.lengthOf(1);
      expect(body.entries[0].id).to.be.equal('0');
    });
  });
});
