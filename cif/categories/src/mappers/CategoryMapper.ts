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
import { Category } from '@adobe/commerce-cif-model';
import { CategoryHierarchyWsDTO } from '@diconium/commerce-cif-hybris-clients';
import { dahcTranslator } from '@diconium/commerce-cif-hybris-i18n';

export default class CategoryMapper extends Mapper<Category> {

  constructor(settings: InputSettings) {
    super(settings, dahcTranslator.setLocale(settings.language));
  }

  mapFromInputArgsToActionParameters(mappable: any) {

    const {
      id: categoryId,
    } = mappable;

    return { categoryId };
  }
  /* istanbul ignore next */
  mapFromEntity(entity, mappable?: DTO): DTO {
    throw new Error('Unsupported Operation');
  }

  mapToEntity(dto: CategoryHierarchyWsDTO, entity?) {

    const {
      id,
      lastModified,
      name = id,
      subcategories,
    } = dto;

    const category = new Category.Builder()
      .withId(id)
      .build();

    category.lastModifiedAt = lastModified;
    category.name = name;
    if (subcategories) {
      category.children = subcategories.map((subCategory) => {
        const subCategoryEntity = this.mapToEntity(subCategory);
        subCategoryEntity.mainParentId = id;
        return subCategoryEntity;
      });
    }
    return category;

  }

}
