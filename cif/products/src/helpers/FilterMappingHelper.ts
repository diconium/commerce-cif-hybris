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

export default class FilterMappingHelper {

  static checkFilterType(filter: any) {
    if (filter.startsWith('variants.sku')) {
      return FilterType.VariantWithSku;
    }

    if (filter.startsWith('categories.id')) {
      return FilterType.Category;
    }
  }

  static extractIdFromQueryFilter(filter: String) {
    return filter.match(/(?<=")[^"]+(?=")/);
  }
}

export enum FilterType {
  VariantWithSku,
  Category,
}
