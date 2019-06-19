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
import MockCIFData from '../resources/helper/cif-requests.json';
import FilterMappingHelper, { FilterType } from '../../src/helpers/FilterMappingHelper';

const { expect } = chai;
chai.use(chaiShallowDeepEqual);

describe('FilterMappingHelper', () => {
  describe('Unit tests', () => {

    it('Gravity points down!', () => {
      expect(true).to.equal(true);
    });

    describe('Validation', () => {

      it('Check should return Category Type', async () => {
        const type = await FilterMappingHelper.checkFilterType(MockCIFData.categoryFilter);
        expect(type).to.exist.and.to.equal(FilterType.Category);
      });
      it('Check should return Variant Type', async () => {
        const type = await FilterMappingHelper.checkFilterType(MockCIFData.variantFilter);
        expect(type).to.exist.and.to.equal(FilterType.VariantWithSku);
      });
    });
  });
});
