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
import { getBySlug as getProductBySlug } from '../../src/actions/products';

const validInput = require('../resources/validGetProductBySlug.json');
const invalidInput = require('../resources/invalidGetProductBySlug.json');

describe('getProductBySlug', () => {
  this.timeout(25000);
  describe('Integration tests', () => {

    it('Response should be 404 if no product exists with that slug', async () => {
      const { response } = await getProductBySlug(invalidInput);
      expect(response.error.name).to.be.equal('CommerceServiceResourceNotFoundError');
    });

    it('Response should be successful if a product exists with that slug', async() => {
      const { response } = await getProductBySlug(validInput);
      const { statusCode, body } = response;
      expect(statusCode).to.be.equal(200);
      assert.equal(body.slug, validInput.slug, 'Product exists');
    });
  });
});
