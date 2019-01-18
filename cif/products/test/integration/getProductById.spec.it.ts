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

import { assert, expect } from 'chai';
import { getById as getProductById } from '../../src/actions/products';

const validInput = require('../resources/validateGetProductByIdInputIntegration.json');
const invalidInput = require('../resources/validateGetProductByIdInputIntegrationInvalid.json');

describe('getProductById', function () {
  this.timeout(25000);
  describe('Integration tests', () => {

    it('Response should be 200 if the product exists with that number', async () => {
      const { response } = await getProductById(validInput);
      const { statusCode } = response;
      expect(statusCode).to.be.equal(200);
    });

    it('Response should contain a body with a product if the product exists with the id', async () => {
      const { response } = await getProductById(validInput);
      const { body } = response;
      assert.equal(body.id, 280916, 'Product exists');
    });

    it('Response should contain a body with a product price if the product exists with the id', async () => {
      const { response } = await getProductById(validInput);
      const { statusCode, body } = response;
      expect(statusCode).to.be.equal(200);
      expect(body.prices).not.to.be.empty;
    });

    it('Response should be 404 if no product exists', async () => {
      const { response } = await getProductById(invalidInput);
      expect(response.error.name).to.be.equal('CommerceServiceResourceNotFoundError');
    });
  });
});
