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
import { getById as getCategoryById } from '../../src/actions/categories';

const validInput = require('../resources/get-categoriesbyid-adobe-valid-request.json');

describe('getCategoryById', function () {
  this.timeout(25000);
  describe('Integration tests', () => {

    it('Response should be 200 when getting an empty request', async () => {
      const { response } = await getCategoryById(validInput);
      const { body, statusCode } = response;
      expect(statusCode).to.be.equals(200);
      expect(body).to.be.ok.and.haveOwnProperty('id').to.equal('brands');
      expect(body).to.haveOwnProperty('name').to.equal('Brands');
      expect(body).to.haveOwnProperty('children').not.to.be.empty;
      expect(body).to.haveOwnProperty('lastModifiedAt');
    });

  });
});
