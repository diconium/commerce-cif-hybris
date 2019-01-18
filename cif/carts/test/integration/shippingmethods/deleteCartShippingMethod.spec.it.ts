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

import {
  del as deleteCartShippingMethod,
  post as postCartShippingMethod,
} from '../../../src/actions/shippingmethods';
import { getById as getCartById } from '../../../src/actions/carts';

import { TestUtils } from '../../../../common/TestUtils';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiShallowDeepEqual = require('chai-shallow-deep-equal');

const { expect } = chai;
chai.use(chaiHttp);
chai.use(chaiShallowDeepEqual);

const validPostInput = require('../../resources/shippingmethods/valid-post-cart-shipping-methods-input.json');
const validInput = require('../../resources/shippingmethods/valid-delete-cart-shipping-methods-input.json');

describe('deleteCartShippingMethod', function () {
  this.timeout(25000);
  describe('Integration tests', () => {

    before(async () => {

      validInput.settings.bearer = await TestUtils.getBearer();

      await chai.request(TestUtils.getHybrisInstance() + 'rest/v2/electronics/users/current/')
        .post(`carts?access_token=${validInput.settings.bearer}`)
        .then((response) => {
          validInput.parameters.id = response.body.code;
          validPostInput.parameters.id = response.body.code;
        }).then(() => {

          chai.request(TestUtils.getHybrisInstance() + 'rest/v2/electronics')
            .post(`/users/current/carts/${validInput.parameters.id}/addresses/delivery`)
            .type('json')
            .query({
              access_token: validInput.settings.bearer,
            })
            .send({
              firstName: 'diconium',
              lastName: 'lx',
              line1: 'Avenida Casal Ribeiro nº50',
              titleCode: 'mr',
              country: {
                isocode: 'GB',
                name: 'united kingdom',
              },
            });
        });

    });

    after(async () => {
      await TestUtils.deleteCartById(validInput.parameters.id);
    });

    // For this test to execute the login interface needs to be available
    xit('Should return 200 if valid input is passed with pickup method', async () => {
      const { parameters, errorOutput } = await deleteCartShippingMethod(validInput);
      expect(parameters.id).to.equal(validInput.parameters.id);
      expect(errorOutput).to.be.undefined;

      const { response } = await getCartById(validInput);
      const { statusCode, body } = response;
      expect(statusCode).to.be.equal(200);
      expect(body).to.be.ok.and.to.haveOwnProperty('id').and.to.equal(validInput.parameters.id);
      expect(body.shippingInfo).to.be.undefined;
    });

  });
});
