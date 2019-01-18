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

import { post as postPayment } from '../../../src/actions/payments';
import { TestUtils } from '../../../../common/TestUtils';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiShallowDeepEqual = require('chai-shallow-deep-equal');

chai.use(chaiShallowDeepEqual);
chai.use(chaiHttp);
const { expect } = chai;

const validInput = require('../../resources/payment/valid-post-payment-input.json');

describe('Post payment', function () {
  this.timeout(25000);
  describe('Integration tests', () => {

    before(async () => {
      validInput.settings.bearer = await TestUtils.getBearer();

      return await chai.request(TestUtils.getHybrisInstance() + 'rest/v2/electronics/users/current/')
        .post(`carts?access_token=${validInput.settings.bearer}`)
        .then((response) => {
          validInput.parameters.id = response.body.code;
        });
    });

    after(() => {
      return TestUtils.deleteCartById(validInput.parameters.id);
    });

    it('Response should be 200 if the payment was successful', async () => {
      const { parameters } = await postPayment(validInput);
      expect(parameters.id).to.be.equal(validInput.parameters.id);
    });

  });
});
