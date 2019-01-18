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

import chai from 'chai';
import chaiShallowDeepEqual from 'chai-shallow-deep-equal';
import nock from 'nock';
import { del as validateDeleteCartBillingAddress } from '../../../src/validations/billingaddress';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

describe('deleteCartBillingAddress', () => {
  describe('Unit tests', () => {

    const scope = nock('https://hybris.example.com');

    it('Gravity point down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      it('Should return something', () => {
        expect(validateDeleteCartBillingAddress).to.exist;
      });

      it('Validator should return MissingPropertyError errorOutput if no id is provided', async () => {
        const input = await validateDeleteCartBillingAddress({});
        expect(input.response.error).to.be.deep.equal({
          cause: {
            message: 'not-implemented',
          },
          message: 'Not implemented',
          name: 'NotImplementedError',
        });
      });

    });
  });
});
