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
import { getBySlug as getCategoryBySlug } from '../../src/actions/categories';
import { getBySlug as validateGetCategoryBySlug } from '../../src/validations/categories';
import nock from 'nock';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const validInput = require('../resources/validGetCategoryBySlug.json');
const invalidInput = require('../resources/invalidGetCategoryBySlug.json');
const validHybrisResponse = require('../resources/get-categoriesbyid-hybris-valid-response.json'); // TODO
const hybrisNotFoundResponse = require('../resources/get-categoriesbyslug-hybris-notfound-response.json');
const adobeValidResponse = require('../resources/get-categoriesbyid-adobe-valid-response.json'); // TODO

describe('getCategoryBySlug', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity points down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      it('Should return MissingPropertyError errorOutput if no slug is provided', async () => {
        const input = await validateGetCategoryBySlug({});
        expect(input.errorOutput).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'slug\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await validateGetCategoryBySlug({ slug: 'slug_test' });
        expect(errorOutput).to.not.exist;
        console.log(parameters);
        expect(parameters).to.be.ok.and.to.haveOwnProperty('slug').that.equals('slug_test');
      });
    });

    describe('Service', () => {
      it('Should return a MissingPropertyError errorOutput if no slug is provided', async () => {
        const { response } = await getCategoryBySlug(invalidInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'missing-property',
          },
          message: 'Parameter \'slug\' is missing.',
          name: 'MissingPropertyError',
        });
      });

      it('Should return a 404 if no category with that slug exists', async() => {
        scope.get('/rest/v2/electronics/catalogs/electronicsProductCatalog/Online/categories/slug/brands')
          .query({ fields: 'FULL', lang: 'en' })
          .reply(400, hybrisNotFoundResponse);
        const { response } = await getCategoryBySlug(validInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'UnknownIdentifierError',
          },
          message: 'Category with slug \'brands\' in CatalogVersion \'electronicsProductCatalog.Online\' not found! (Active session catalogversions: electronicsProductCatalog.Online, ElectronicsClassification.1.0, electronicsContentCatalog.Online)', // TODO
          name: 'CommerceServiceResourceNotFoundError',
        });
      });

/*      it('Should return a 500 if the category slug is not unique', async() => {
        scope.get('/rest/v2/electronics/catalogs/electronicsProductCatalog/Online/categories/slug/test_slug')
          .query({ fields: 'FULL', lang: 'en' })
          .reply(500, hybrisDuplicateResponse);
        const { response } = await getCategoryBySlug(validInput);
        expect(response.error).to.be.deep.equal({
          cause: {
            message: 'AmbiguousIdentifierError',
          },
          message: 'Category slug \'test_slug\' is not unique, 2 products found!',
          name: 'CommerceServiceResourceNotFoundError', // TODO
        });
      });*/

      it('Should return a successful response if a category with that slug exists', async() => {
        scope.get('/rest/v2/electronics/catalogs/electronicsProductCatalog/Online/categories/slug/brands')
          .query({ fields: 'FULL', lang: 'en' })
          .reply(200, validHybrisResponse);
        const { response } = await getCategoryBySlug(validInput);
        const { body, statusCode } = response;
        expect(statusCode).to.be.equal(200);
        expect(body).to.be.ok.and.to.be.shallowDeepEqual(adobeValidResponse);
      });
    });
  });
});
