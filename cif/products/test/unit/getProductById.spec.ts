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
import { getById as getProductById } from '../../src/actions/products';
import { getById as validateGetProductById } from '../../src/validations/products';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const validInput = require('../resources/validateGetProductByIdInputUnit.json');
const validInputGerman = require('../resources/validateGetProductByIdInputUnitGerman.json');
const invalidInput = require('../resources/validateGetProductByIdInputUnitInvalid.json');

const product280916 = require('../resources/hybris-product.json');
const product280916de = require('../resources/hybris-product-de.json');
const productNotFoundExample = require('../resources/productNotFound.json');
const expectedProductMock = require('../resources/adobe-product.json');
const expectedProductMockDe = require('../resources/adobe-product-de.json');
const expectedProductMockExternalAssets = require('../resources/adobe-product-external-asset.json');

describe('getProductById', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity points down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      it('Validation should return error if \'id\' is missing', async () => {
        const { errorOutput } = await validateGetProductById({});
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'id\' is missing.');
      });

      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await validateGetProductById({ id: '269524' });
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.to.haveOwnProperty('id').that.equals('269524');
      });
    });

    describe('Service', () => {
      it('Function should return something', async () => {
        scope.get('/rest/v2/electronics/products/280916')
          .query({ lang: 'en', fields: 'FULL' })
          .reply(200, product280916);
        const { response } = await getProductById(validInput);
        const { statusCode } = response;
        expect(response).not.to.be.null;
        expect(response).not.to.be.undefined;
        expect(statusCode).to.be.equals(200);
      });

      it('Response should be 400 if validation brings errorOutput', async () => {
        const { response } = await getProductById(invalidInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'id\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Response should be 404 if no product exists', async () => {
        scope.get('/rest/v2/electronics/products/280916').query({ fields: 'FULL', lang: 'en' })
          .reply(400, productNotFoundExample);
        const { response } = await getProductById(validInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'UnknownIdentifierError',
          },
          message: 'Product with code \'21345\' not found!',
          name: 'CommerceServiceResourceNotFoundError',
        });
      });

      it('Response should have status code 200 and the should be equal to the mock', async () => {
        scope.get('/rest/v2/electronics/products/280916').query({ fields: 'FULL', lang: 'en' })
          .reply(200, product280916);
        const { response } = await getProductById(validInput);
        const { statusCode } = response;
        expect(statusCode).to.be.equals(200);
        expect(response.body).to.shallowDeepEqual(expectedProductMock);
      });

      it('Response should contain a body with a product name in german if the product exists with the id', async () => {
        scope.get('/rest/v2/electronics/products/280916').query({ fields: 'FULL', lang: 'de' })
          .reply(200, product280916de);
        const { response } = await getProductById(validInputGerman);
        expect(response.body).to.shallowDeepEqual(expectedProductMockDe);
      });

      it('Response should contain assets coming from external source', async () => {
        scope.get('/rest/v2/electronics/products/280916').query({ fields: 'FULL', lang: 'de' })
          .reply(200, product280916de);
        validInputGerman.settings.CT_ASSETS_HOST = 'https://external.asset.com';
        const { response } = await getProductById(validInputGerman);
        expect(response.body).to.shallowDeepEqual(expectedProductMockExternalAssets);
      });
    });
  });
});
