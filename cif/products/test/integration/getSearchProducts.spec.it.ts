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

import { expect } from 'chai';
import { search as searchProducts } from '../../src/actions/products';

const validateResponse = require('../resources/search/validateGetSearchProductsInputIntegration.json');
const validateResponseWithLimitAndOffset = require('../resources/search/validateGetSearchProductsInputIntegrationLimitAndOffset.json');

describe('searchProduct', function () {
  this.timeout(25000);
  describe('Integration tests', () => {

    it('Response should be 200 if the product exists with that number', async () => {
      const { response } = await searchProducts(validateResponse);
      expect(response.statusCode).to.be.equal(200);
    });

    it('Response should return a list of facets', async () => {
      const { response } = await searchProducts(validateResponse);
      expect(response.body.facets).to.be.not.empty;
    });

    it('Response should return a list of products', async () => {
      const { response } = await searchProducts(validateResponse);
      expect(response.body.results).to.be.not.empty;
    });

    it('Response should return a list of products on the first(1) page', async () => {
      const { response } = await searchProducts(validateResponseWithLimitAndOffset);
      expect(response.body.offset).to.be.equals(10);
    });

  });
});
