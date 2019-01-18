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

import { get as getCartShippingMethods } from '../../../src/actions/shippingmethods';
import { TestUtils } from '../../../../common/TestUtils';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiShallowDeepEqual = require('chai-shallow-deep-equal');

const { expect } = chai;
chai.use(chaiHttp);
chai.use(chaiShallowDeepEqual);

const validInput = require('../../resources/shippingmethods/valid-get-authenticated-cart-shipping-methods-input.json');

describe('getCartShippingMethods', function () {
  this.timeout(25000);
  describe('Integration tests', () => {

    before(async() => {
      validInput.settings.bearer = await TestUtils.getBearer();

      return chai.request(TestUtils.getHybrisInstance() + 'rest/v2/electronics/users/current/')
        .post(`carts?access_token=${validInput.settings.bearer}`)
        .then((response) => {
          validInput.parameters.id = response.body.code;
        });

    });

    // For this test to execute the login interface needs to be available
    xit('Should return 200 with pickup shipping methods if anonymous user does a request', async () => {
      const { response } = await getCartShippingMethods(validInput);
      expect(response.statusCode).to.equal(200);
      expect(response.body[0]).to.exist;
    });

  });
});
