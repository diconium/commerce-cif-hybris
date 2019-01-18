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

import { get as getCategories } from '../../src/actions/categories';

import { expect } from 'chai';

const validInput = require('../resources/validateGetCategoriesValid.json');

describe('getCategories', function () {
  this.timeout(25000);
  describe('Integration tests', () => {

    it('Response should be 200 when getting an empty request', async () => {
      const { response } = await getCategories(validInput);
      expect(response.statusCode).to.be.equal(200);
    });

    it('Response should return a total', async () => {
      const { response } = await getCategories(validInput);
      expect(response.body.total).to.be.greaterThan(0);
    });
  });
});
