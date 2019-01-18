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

import { get as getPaymentMethods } from '../../../src/actions/paymentmethods';
import { TestUtils } from '../../../../common/TestUtils';

const chai = require('chai');
const { expect } = chai;

const validInputOauth = require('../../resources/validateGetCartByIdValidWithOauth.json');

describe('getPaymentMethods', function () {
  this.timeout(25000);
  describe('Integration tests',  () => {

    before(async() => {
      validInputOauth.settings.bearer = await TestUtils.getBearer();
    });

    // For this test to execute the login interface needs to be available
    xit('Response should be 200 and should return payment details', async () => {
      const { response } = await getPaymentMethods(validInputOauth);
      const { statusCode, body } = response;
      expect(statusCode).to.be.equal(200);
      expect(body[0]).to.be.ok.and.to.haveOwnProperty('name').and.to.equal('Visa');
    });
  });
});
