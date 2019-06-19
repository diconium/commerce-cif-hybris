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

import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { PagedResponseProduct } from '@adobe/commerce-cif-model';
import { ProductSearchPageWsDTO } from '@diconium/commerce-cif-hybris-clients';
import ProductMapper from './ProductMapper';
import FacetMapper from './FacetMapper';
import { PagedResponseHelper } from '../helpers/PagedResponseHelper';
import { dahcTranslator } from '@diconium/commerce-cif-hybris-i18n';
import FilterMappingHelper, { FilterType } from '../helpers/FilterMappingHelper';

export default class PagedResponseProductMapper extends Mapper<PagedResponseProduct> {

  constructor(settings: InputSettings) {
    super(settings, dahcTranslator);
  }

  mapFromInputArgsToActionParameters(mappable: any) {

    const {
      text = '',
      selectedFacets = '',
      sort = '',
      offset = 0,
      limit = 20,
      filter,
    } = mappable;
    const facets = selectedFacets.replace(/\|/g, ':');
    const query = (filter) ? this.mapFilter(filter) : `${text}:${sort}:${facets}`;

    return { query, pageSize: limit, currentPage: offset / limit };
  }

  /* istanbul ignore next */
  mapFromEntity(entity, mappable?: ProductSearchPageWsDTO): ProductSearchPageWsDTO {
    throw new Error('Unsupported Operation');
  }

  mapToEntity(dto: ProductSearchPageWsDTO, entity?): PagedResponseProduct {

    const {
      products = [],
      pagination,
      facets,
      breadcrumbs,
    } = dto;

    const {
      totalResults,
      currentPage,
      pageSize,
    } = pagination;

    const results = products.map(productDto => new ProductMapper(this.settings).mapToEntity(productDto));

    const pagedResponseProduct = new PagedResponseProduct.Builder()
      .withResults(results)
      .withCount(results.length)
      .withTotal(totalResults)
      .withOffset(currentPage * pageSize)
      .build();

    if (facets) {
      pagedResponseProduct.facets = facets.map(facetDto => new FacetMapper(this.settings).mapToEntity(facetDto));
    }

    if (breadcrumbs) {
      breadcrumbs.forEach((breadcrumb) => {
        const facet = pagedResponseProduct.facets.find(facet => facet.name === breadcrumb.facetName);
        if (facet) {
          this.updateFacetFromBreadcrumb(breadcrumb, facet, totalResults);
        } else {
          pagedResponseProduct.facets.push(this.buildFacetFromBreadcrumb(breadcrumb, totalResults));
        }
      });
    }

    return pagedResponseProduct;
  }

  private updateFacetFromBreadcrumb({ facetCode, facetValueCode, facetValueName }, facet, totalResults) {
    const facetValue = facet.values.find(value => value.id === facetValueName);
    facet.id = facetCode;
    if (facetValue) {
      facetValue.id = facetValueName;
      facetValue.value = facetValueCode;
    } else {
      if (!facet.values) {
        facet.values = [];
      }
      facet.values.push(PagedResponseHelper.buildFacetValue({ facetValueCode, facetValueName, totalResults }));
    }
  }

  private buildFacetFromBreadcrumb({ facetName, facetCode, facetValueCode, facetValueName }, totalResults: number) {
    return PagedResponseHelper.buildFacet({
      facetCode,
      facetName,
      facetValueCode,
      facetValueName,
      totalResults,
    });
  }

  private mapFilter(filter: String) {

    const filterType = FilterMappingHelper.checkFilterType(filter);
    const id = FilterMappingHelper.extractIdFromQueryFilter(filter);

    switch (filterType) {
      case FilterType.VariantWithSku: {
        return `::code:${id}`;
      }
      case FilterType.Category: {
        return `::allCategories:${id}`;
      }
    }
  }
}
