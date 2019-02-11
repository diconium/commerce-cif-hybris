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

import { DTO, InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { PagedResponseCategory } from '@adobe/commerce-cif-model';
import { CatalogVersionWsDTO, CategoryHierarchyWsDTO } from '@diconium/commerce-cif-hybris-clients';
import CategoryMapper from './CategoryMapper';
import { dahcTranslator } from '@diconium/commerce-cif-hybris-i18n';

export default class PagedResponseCategoryMapper extends Mapper<PagedResponseCategory> {

  constructor(settings: InputSettings, actionParameters?: any) {
    super(settings, dahcTranslator.setLocale(settings.language), actionParameters);
  }

  mapFromInputArgsToActionParameters(mappable: any) {

    const {
      sort,
      offset,
      limit,
      type,
      depth,
    } = mappable;

    return { sort, offset, limit, type, depth };
  }
  /* istanbul ignore next */
  mapFromEntity(entity, mappable?: DTO): DTO {
    throw new Error('Unsupported Operation');
  }

  mapToEntity(dto: CatalogVersionWsDTO, entity?) {

    const {
      categories,
    } = dto;

    const {
      type,
      offset = 0,
      limit = 50,
      depth,
    } = this.actionParameters;

    let results = [];

    if (type === 'tree') {
      results = this.cutChildren(categories, depth);
    } else {
      results = this.flatten(categories);
    }

    const total = results.length;
    results = results.slice(offset, offset + limit);

    const categoryMapper = new CategoryMapper(this.settings);
    results = results.map(category => categoryMapper.mapToEntity(category));

    return  new PagedResponseCategory.Builder()
        .withTotal(total)
        .withCount(results.length)
        .withResults(results)
        .build();
  }

  private flatten(categories: CategoryHierarchyWsDTO[]) {
    return categories.reduce((acc, value) => this.flattenReducer(acc, value), []);
  }

  private flattenReducer(acc, value) {
    let result = acc;
    result.push(value);
    if (value.subcategories) {
      result = result.concat(this.flatten(value.subcategories));
      delete value.subcategories;
    }
    return result;
  }

  private cutChildren(categories = [], depth) {

    const results = [];

    categories.forEach((category) => {
      const categoryDto = this.buildCategoryDto(category);
      if (this.isMaxDepthNotReached(depth)) {
        categoryDto.subcategories = this.cutChildren(category.subcategories, depth - 1);
      }
      results.push(categoryDto);
    });

    return results;
  }

  private buildCategoryDto(category) {
    const categoryDto = new CategoryHierarchyWsDTO();
    categoryDto.id = category.id;
    categoryDto.name = category.name;
    categoryDto.lastModified = category.lastModified;
    categoryDto.subcategories = [];
    return categoryDto;
  }

  private isMaxDepthNotReached(depth) {
    return typeof depth === 'undefined' || isNaN(depth) || depth > 0;
  }

}
