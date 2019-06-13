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
import { search } from '../../src/actions/products';
import { search as validateSearchProduct } from '../../src/validations/products';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

const validInput = require('../resources/search/validateGetSearchProductsInputUnit.json');
const validInputFacet = require('../resources/search/validateGetSearchProductsInputUnitWithFacet.json');
const validInputRelevance = require('../resources/search/validateGetSearchProductsInputUnitWithRelevance.json');
const validInputRelevanceAndQuery = require('../resources/search/validateGetSearchProductsInputUnitWithRelevanceAndQuery.json');

const hybrisSearchProductsMockPage0 = require('../resources/search/hybris-search-product-page0.json');
const hybrisSearchProductsMockPage1 = require('../resources/search/hybris-search-product-page1.json');
const hybrisSearchProductsMockRelevance = require('../resources/search/hybris-search-product-relevance.json');
const hybrisSearchProductsMockTopRated = require('../resources/search/hybris-search-product-topRated.json');
const hybrisSearchProductsMockPageAvailableInStore = require('../resources/search/hybris-search-product-availableinstore.json');
const hybrisSearchProductsMockPageAvailableInStoreNoFacetValue = require('../resources/search/hybris-search-product-availableinstore-no-facetvalue.json');
const hybrisNoResults = require('../resources/search/hybris-search-product-no-results.json');

const adobeSearchProductMock = require('../resources/search/adobe-search-product.json');
const adobeSearchProductStoreFacetMock = require('../resources/search/adobe-search-product-storefacet.json');

describe('Search Products', () => {
  describe('Unit tests', () => {
    const scope = nock('https://hybris.example.com');

    it('Gravity points down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {
      it('Validation should return error if \'limit\' is not an integer', async () => {
        const { errorOutput } = await validateSearchProduct({ limit: 'string' });
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Parameter \'limit\' must be an integer');
      });

      it('Validation should return error if \'limit\' and \'offset\' is not an integer division', async () => {
        const { errorOutput } = await validateSearchProduct({ limit: '10', offset: '3' });
        expect(errorOutput).to.be.ok.and.to.haveOwnProperty('message').that.equals('Division between \'offset\' and \'limit\' must be integer.');
      });

      it('Validation should return a valid Input if all the inputs are ok', async () => {
        const { errorOutput, parameters } = await validateSearchProduct({
          limit: '5',
          offset: '10',
          text: 'sony',
          sort: 'topRated',
        });
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.shallowDeepEqual({
          currentPage: 2,
          pageSize: '5',
          query: 'sony:topRated:',
        });
      });

      it('Validation should return a valid Input if query parameters contain category from cif component', async () => {
        const { errorOutput, parameters } = await validateSearchProduct({
          filter: 'categories.id:subtree("693b0fc5-7283-4673-a362-589d37fb7b73")',
        });
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.shallowDeepEqual({
          query: '::allCategories:693b0fc5-7283-4673-a362-589d37fb7b73',
        });
      });

      it('Validation should return a valid Input if query parameters contain variant sku id from cif component', async () => {
        const { errorOutput, parameters } = await validateSearchProduct({
          filter: 'variants.sku:"meskwielt.1-xs"',
        });
        expect(errorOutput).to.not.exist;
        expect(parameters).to.be.ok.and.shallowDeepEqual({
          query: 'meskwielt.1-xs',
          isDispatchToProductById: true,
        });
      });

    });

    describe('Service', () => {

      it('Response should contain the correct pagination', async () => {
        scope.get('/rest/v2/electronics/products/search')
          .query({ fields: 'FULL', lang: 'en', query: 'samsung' })
          .reply(200, hybrisSearchProductsMockPage0);
        const { response } = await search(validInput);
        const { body } = response;
        expect(body.offset).is.equal(adobeSearchProductMock.offset);
        expect(body.count).is.equal(adobeSearchProductMock.count);
        expect(body.total).is.equal(adobeSearchProductMock.total);
      });

      it('Response should bring empty results array', async () => {
        scope.get('/rest/v2/electronics/products/search')
          .query({ fields: 'FULL', lang: 'en', query: 'samsung' })
          .reply(200, hybrisNoResults);
        const { response } = await search(validInput);
        expect(response.error).is.not.ok;
        expect(response.body).to.shallowDeepEqual({
          count: 0,
          offset: 0,
          results: [],
          total: 0,
        });
      });

      it('Response should contain the correct facets', async () => {
        scope.get('/rest/v2/electronics/products/search')
          .query({ fields: 'FULL', lang: 'en', query: 'samsung' })
          .reply(200, hybrisSearchProductsMockPage0);
        const { response } = await search(validInput);
        const { body } = response;
        expect(body.facets).to.shallowDeepEqual(adobeSearchProductMock.facets);
      });

      it('Response should contain the correct list of products with the query: samsung', async () => {
        scope.get('/rest/v2/electronics/products/search')
          .query({ fields: 'FULL', lang: 'en', query: 'samsung' })
          .reply(200, hybrisSearchProductsMockPage0);
        const { response } = await search(validInput);
        const { body } = response;
        expect(body.results).to.shallowDeepEqual(adobeSearchProductMock.results);
      });

      it('Response should contain the correct list of products with the second page', async () => {
        scope.get('/rest/v2/electronics/products/search')
          .query({ fields: 'FULL', lang: 'en', query: 'samsung', pageSize: 40 })
          .reply(200, hybrisSearchProductsMockPage1);
        const newInput = validInput;
        newInput.parameters.pageSize = 40;
        const { response } = await search(newInput);
        const { body } = response;
        expect(body.offset).to.be.equals(20);
        expect(body.results.length).to.be.equals(20);
      });

      it('Response should contain the correct list of products sorted by relevance', async () => {
        scope.get('/rest/v2/electronics/products/search')
          .query({ fields: 'FULL', lang: 'en', query: ':relevance:' })
          .reply(200, hybrisSearchProductsMockRelevance);
        const { response } = await search(validInputRelevance);
        expect(response.error).is.not.ok;
        expect(response.statusCode).to.equals(200);
      });

      it('Response should contain the correct list of products sorted by topRated', async () => {
        scope.get('/rest/v2/electronics/products/search')
          .query({ fields: 'FULL', lang: 'en', query: 'sony:topRated:' })
          .reply(200, hybrisSearchProductsMockTopRated);
        const { response } = await search(validInputRelevanceAndQuery);
        expect(response.error).is.not.ok;
        expect(response.statusCode).to.equals(200);
      });

      it('Response should contain the correct list of products with the correct facet selected', async () => {
        scope.get('/rest/v2/electronics/products/search')
          .query({ fields: 'FULL', lang: 'en', query: '::availableInStores:Choshi' })
          .reply(200, hybrisSearchProductsMockPageAvailableInStore);
        const { response } = await search(validInputFacet);
        expect(response.error).is.not.ok;
        expect(response.body.facets[0].values).to.shallowDeepEqual(adobeSearchProductStoreFacetMock);
        expect(response.body.facets[1].values[0]).to.shallowDeepEqual({
          id: 'brand_5',
          occurrences: 92,
          selected: true,
          value: 'Sony',
        });
      });

      it('Response should contain the correct list of products with the correct facet selected but no facet value is returned by hyrbis', async () => {
        scope.get('/rest/v2/electronics/products/search')
          .query({ fields: 'FULL', lang: 'en', query: '::availableInStores:Choshi' })
          .reply(200, hybrisSearchProductsMockPageAvailableInStoreNoFacetValue);
        const { response } = await search(validInputFacet);
        expect(response.error).is.not.ok;
        expect(response.body.facets[0].values[2]).to.shallowDeepEqual({
          id: 'Choshi',
          occurrences: 92,
          selected: true,
          value: 'Choshi',
        });
      });

    });
  });
});
