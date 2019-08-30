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

import { get as getCategories } from '../../src/actions/categories';
import { get as validateGetCategories } from '../../src/validations/categories';

const nock = require('nock');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiShallowDeepEqual = require('chai-shallow-deep-equal');

const { expect } = chai;
chai.use(chaiHttp);
chai.use(chaiShallowDeepEqual);

const validInput = require('../resources/validateGetCategoriesValid.json');
const validInputTree = require('../resources/get-categories-valid-input-tree.json');

const categoriesHybrisResponse = require('../resources/categoriesHybrisResponses.json');
const categoriesHybrisErrorResponse = require('../resources/categoriesHybrisErrorResponses.json');

const validFlattenedCategories = require('../resources/get-flattened-categories-adobe-valid-response.json');

describe('getCategories', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity points down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      it('Validator should return InvalidArgumentError errorOutput if offset is negative', async () => {
        const input = await validateGetCategories({ offset: -10 });
        expect(input.errorOutput).to.be.deep.equal({
          cause: {
            message: 'invalid-argument',
          },
          message: 'Parameter \'offset\' must be greater or equal to 0',
          name: 'InvalidArgumentError',
        });
      });

      it('Validator should return InvalidArgumentError errorOutput if limit is less than 1', async () => {
        const input = await validateGetCategories({ limit: -10 });
        expect(input.errorOutput).to.be.deep.equal({
          cause: {
            message: 'invalid-argument',
          },
          message: 'Parameter \'limit\' must be greater or equal to 1',
          name: 'InvalidArgumentError',
        });
      });

      it('Validator should return correct parameters', async () => {
        const input = await validateGetCategories({
          sort: 'desc',
          offset: '10',
          limit: '10',
          type: 'flat',
          depth: '2',
        });
        expect(input.parameters).to.be.deep.equal({
          sort: 'desc',
          offset: '10',
          limit: '10',
          type: 'flat',
          depth: '2',
        });
      });

    });

    describe('Service', () => {
      it('Function should return something', () => {
        expect(getCategories).to.exist;
      });

      it('Response should have Unexpected error', async () => {
        scope.get('/rest/v2/electronics/catalogs/electronicsProductCatalog/Online')
          .query({ fields: 'FULL', lang: 'en' })
          .reply(400, categoriesHybrisErrorResponse);
        const { response } = await getCategories(validInput);
        expect(response.error).to.exist.and.to.haveOwnProperty('name').that.equals('UnexpectedError');
      });

      it('Response should be 200', async () => {
        scope.get('/rest/v2/electronics/catalogs/electronicsProductCatalog/Online').query({
          fields: 'FULL',
          lang: 'en',
        })
          .reply(200, categoriesHybrisResponse);
        const { response } = await getCategories(validInput);
        expect(response.statusCode).to.be.equals(200);
      });

      it('Response should have flat results with a total of 54 and a count of 20 (limit)', async () => {
        scope.get('/rest/v2/electronics/catalogs/electronicsProductCatalog/Online').query({
          fields: 'FULL',
          lang: 'en',
        })
          .reply(200, categoriesHybrisResponse);
        const { response } = await getCategories(validInput);
        const { body } = response;
        expect(body).to.exist.and.to.haveOwnProperty('total').to.equal(54);
        expect(body.count).to.equal(20);
        expect(body.results).to.have.lengthOf(20);
      });

      it('Response should have flat results: first result is a parent category and second is the first child', async () => {
        scope.get('/rest/v2/electronics/catalogs/electronicsProductCatalog/Online').query({
          fields: 'FULL',
          lang: 'en',
        })
          .reply(200, categoriesHybrisResponse);
        const { response } = await getCategories(validInput);
        const { body } = response;
        expect(body.results).to.shallowDeepEqual(validFlattenedCategories);
        expect(body.results[0]).to.shallowDeepEqual({ id: 'brands', name: 'Brands' });
        expect(body.results[1]).to.shallowDeepEqual({ id: 'brand_1', name: 'brand_1' });
      });

      it('Response should have tree results', async () => {
        scope.get('/rest/v2/electronics/catalogs/electronicsProductCatalog/Online').query({
          fields: 'FULL',
          lang: 'en',
        })
          .reply(200, categoriesHybrisResponse);
        const { response } = await getCategories(validInputTree);
        const { body } = response;
        expect(body).to.exist.and.to.haveOwnProperty('total').to.equal(4);
        expect(body.count).to.equal(3);
        expect(body.results).to.have.lengthOf(3);
      });

      it('Response should retrieve a tree structure with the correct subcategories if the parameters "tree" is sent', async () => {
        scope.get('/rest/v2/electronics/catalogs/electronicsProductCatalog/Online').query({
          fields: 'FULL',
          lang: 'en',
        })
          .reply(200, categoriesHybrisResponse);
        const { response } = await getCategories(validInputTree);
        const { body } = response;
        expect(body.results[0].children).to.have.lengthOf(16);
        expect(body.results[2].children[2].children).to.have.lengthOf(3);
      });

      it('Response should retrieve a tree structure but only with the root categories.', async () => {
        scope.get('/rest/v2/electronics/catalogs/electronicsProductCatalog/Online').query({
          fields: 'FULL',
          lang: 'en',
        })
          .reply(200, categoriesHybrisResponse);
        validInputTree.parameters['depth'] = '0';
        const { response } = await getCategories(validInputTree);
        const { body } = response;
        expect(body.results[0].children).to.have.lengthOf(0);
      });

      it('Response should retrieve a tree structure but only with the 1 depth categories.', async () => {
        scope.get('/rest/v2/electronics/catalogs/electronicsProductCatalog/Online').query({
          fields: 'FULL',
          lang: 'en',
        })
          .reply(200, categoriesHybrisResponse);
        validInputTree.parameters['depth'] = '1';
        const { response } = await getCategories(validInputTree);
        const { body } = response;
        expect(body.results[0].children).to.have.lengthOf(16);
        expect(body.results[2].children[2].children).to.have.lengthOf(0);
      });

      it('Response should retrieve the categories offset by 1', async () => {
        scope.get('/rest/v2/electronics/catalogs/electronicsProductCatalog/Online').query({
          fields: 'FULL',
          lang: 'en',
        })
          .reply(200, categoriesHybrisResponse);
        validInputTree.parameters['limit'] = '1';
        validInputTree.parameters['offset'] = '1';
        const { response } = await getCategories(validInputTree);
        const { body } = response;
        expect(body.results[0].id).to.equal('B2C_Color');
      });
    });

  });
});
