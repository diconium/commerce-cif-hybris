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
import { getBySlug as getProductBySlug } from '../../src/actions/products';
import { getBySlug as validateGetProductBySlug } from '../../src/validations/products';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const validInput = require('../resources/validGetProductBySlug.json');
const invalidInput = require('../resources/invalidGetProductBySlug.json');

const hybrisProductResponse = require('../resources/hybris-product-with-slug.json');
const productNotFoundExample = require('../resources/productSlugNotFound.json');

describe('getProductBySlug', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity points down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      it('Validation should return error if \'slug\' is missing', async () => {
        const { errorOutput } = await validateGetProductBySlug({});
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'slug\' is missing.');
      });

      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await validateGetProductBySlug({ slug: 'test/product_slug' });
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.to.haveOwnProperty('slug').that.equals('test/product_slug');
      });
    });

    describe('Service', () => {
      it('Response should be 400 if validation brings errorOutput', async () => {
        const { response } = await getProductBySlug(invalidInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'slug\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Response should be 404 if no product exists', async () => {
        scope.get('/rest/v2/electronics/products/slug/test/product_slug')
          .query({ fields: 'FULL', lang: 'en' })
          .reply(400, productNotFoundExample);
        const { response } = await getProductBySlug(validInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'UnknownIdentifierError',
          },
          message: 'Product with slug \'test/product_slug\' not found!',
          name: 'CommerceServiceResourceNotFoundError',
        });
      });

      // The slug needs to uniquely identify the category and can be a path that contains slashes.
      it('Function should return something', async () => {
        scope.get('/rest/v2/electronics/products/slug/test/product_slug')      // TODO: url vai dar problemas de parse no hybris?
          .query({ lang: 'en', fields: 'FULL' })
          .reply(200, hybrisProductResponse);
        const { response } = await getProductBySlug(validInput);
        expect(response).not.to.be.null;
        expect(response).not.to.be.undefined;
        expect(response.statusCode).to.be.equals(200);
      });
    });
  });
});
