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
import { getById as getCategoryById } from '../../src/actions/categories';
import { getById as validateGetCategoryById } from '../../src/validations/categories';
import nock from 'nock';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const validInput = require('../resources/get-categoriesbyid-adobe-valid-request.json');
const invalidInput = require('../resources/get-categoriesbyid-adobe-invalid-request.json');
const categoriesByIdHybrisResponse = require('../resources/get-categoriesbyid-hybris-valid-response.json');
const categoriesByIdHybrisResponseNoSub = require('../resources/get-categoriesbyid-hybris-valid-response-no-sub.json');
const categoriesByIdHybrisNotFoundResponse = require('../resources/get-categoriesbyid-hybris-notfound-response.json');
const adobeValidResponse = require('../resources/get-categoriesbyid-adobe-valid-response.json');
const adobeValidResponseNoSub = require('../resources/get-categoriesbyid-adobe-valid-response-no-sub.json');

describe('getCategoriesById', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity points down!', () => {
      expect(true).to.equal(true);
    });

    it('Function should return something', () => {
      expect(getCategoryById).to.exist;
    });

    it('Validator should return MissingPropertyError errorOutput if no id is provided', async () => {
      const input = await validateGetCategoryById({});
      expect(input.errorOutput).to.be.deep.equal({
        cause: {
          message: 'missing-property',
        },
        message: 'Parameter \'id\' is missing.',
        name: 'MissingPropertyError',
      });
    });

    it('Validator should return categoryId when id is provided', async () => {
      const input = await validateGetCategoryById({ id: 'brands' });
      expect(input.parameters).to.be.deep.equal({
        categoryId: 'brands',
        slug: undefined,
      });
    });

    it('Action should return MissingPropertyError errorOutput if no id is provided', async () => {
      const { response } = await getCategoryById(invalidInput);
      expect(response.error).to.be.deep.equal({
        cause: {
          message: 'missing-property',
        },
        message: 'Parameter \'id\' is missing.',
        name: 'MissingPropertyError',
      });
    });

    it('Response should be 404 if the id does not exist on hybris.', async () => {
      scope.get('/rest/v2/electronics/catalogs/electronicsProductCatalog/Online/categories/brands')
        .query({ fields: 'FULL', lang: 'en' })
        .reply(400, categoriesByIdHybrisNotFoundResponse);
      const { response } = await getCategoryById(validInput);
      expect(response.error).to.be.deep.equal({
        cause: {
          message: 'UnknownIdentifierError',
        },
        message: 'Category with code \'brands\' in CatalogVersion \'electronicsProductCatalog.Online\' not found! (Active session catalogversions: electronicsProductCatalog.Online, ElectronicsClassification.1.0, electronicsContentCatalog.Online)',
        name: 'CommerceServiceResourceNotFoundError',
      });
    });

    it('Response should be 200 if a correct category id is given.', async () => {
      scope.get('/rest/v2/electronics/catalogs/electronicsProductCatalog/Online/categories/brands')
        .query({ fields: 'FULL', lang: 'en' })
        .reply(200, categoriesByIdHybrisResponse);
      const { response } = await getCategoryById(validInput);
      const { body, statusCode } = response;
      expect(statusCode).to.be.equals(200);
      expect(body).to.be.ok.and.to.to.shallowDeepEqual(adobeValidResponse);

    });

    it('Response should return a category model if hybris response is ok.', async () => {
      scope.get('/rest/v2/electronics/catalogs/electronicsProductCatalog/Online/categories/brands')
        .query({ fields: 'FULL', lang: 'en' })
        .reply(200, categoriesByIdHybrisResponseNoSub);
      const { response } = await getCategoryById(validInput);
      const { body, statusCode } = response;
      expect(statusCode).to.be.equals(200);
      expect(body).to.be.ok.and.to.to.shallowDeepEqual(adobeValidResponseNoSub);
    });
  });
});
