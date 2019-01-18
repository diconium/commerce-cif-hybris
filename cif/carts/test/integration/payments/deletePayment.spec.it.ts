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

import { TestUtils } from '../../../../common/TestUtils';
import { deleteById } from '../../../src/actions/payments';
import { getById as getCartById } from '../../../src/actions/carts';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiShallowDeepEqual = require('chai-shallow-deep-equal');

chai.use(chaiShallowDeepEqual);
chai.use(chaiHttp);
const { expect } = chai;

const validInput = require('../../resources/payment/valid-post-payment-input.json');
const hybrisValidBodyPostPayment = require('../../resources/payment/hybris-valid-post-payment-body-input.json');

describe('Delete payment', function () {
  this.timeout(25000);
  describe('Integration tests',  () => {

    before(async() => {
      validInput.settings.bearer = await TestUtils.getBearer();

      await chai.request(TestUtils.getHybrisInstance() + 'rest/v2/electronics/users/current/')
        .post(`carts?access_token=${validInput.settings.bearer}`)
        .then((response) => {
          validInput.parameters.id = response.body.code;
        });

      return await chai.request(`https://hybris.example.com/rest/v2/electronics/users/current/carts/${validInput.parameters.id}/`)
        .post(`paymentdetails?access_token=${validInput.settings.bearer}`)
        .send(hybrisValidBodyPostPayment)
        .then(response => validInput.parameters.paymentId = response.body.id);
    });

    after(() => {
      return TestUtils.deleteCartById(validInput.parameters.id);
    });

    // For this test to execute the login interface needs to be available
    xit('Response should be 200 if the payment was successful', async () => {
      const { parameters, errorOutput } = await deleteById(validInput);
      expect(parameters.id).to.be.equals(validInput.parameters.id);
      expect(parameters.paymentId).to.be.equals(validInput.parameters.paymentId);
      expect(errorOutput).to.be.not.ok;

      const { response } = await getCartById(validInput);
      const { statusCode, body } = response;
      expect(statusCode).to.be.equal(200);
      // TODO fix this issue so that it asserts to 0
      expect(body).to.be.ok.and.to.haveOwnProperty('payments').and.lengthOf(1);
    });

  });
});
