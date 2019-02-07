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
import { Attribute, ProductVariant } from '@adobe/commerce-cif-model';
import { ProductWsDTO, VariantOptionWsDTO } from '@diconium/commerce-cif-hybris-clients';
import { ProductsHelper } from '../helpers/ProductsHelper';
import { dahcTranslator } from '@diconium/commerce-cif-hybris-i18n';

export default class ProductVariantMapper extends Mapper<ProductVariant> {

  constructor(settings: InputSettings) {
    super(settings, dahcTranslator);
  }
  /* istanbul ignore next */
  mapFromInputArgsToActionParameters(mappable: any) {
    throw new Error('Unsupported Operation');
  }
  /* istanbul ignore next */
  mapFromEntity(entity, mappable?: ProductWsDTO): ProductWsDTO {
    throw new Error('Unsupported Operation');
  }

  mapToEntity(dto: VariantOptionWsDTO, entity?): ProductVariant {

    const {
      code,
      priceData,
      stock,
      variantOptionQualifiers,
    } = dto;

    const variant = new ProductVariant.Builder()
      .withId(code)
      .withName(this.getVariantName(variantOptionQualifiers))
      .withPrices(ProductsHelper.pushPrice(priceData, this.settings))
      .withAvailable(stock && stock.stockLevelStatus === 'inStock')
      .withSku(code)
      .build();

    if (variantOptionQualifiers) {
      variant.attributes = variantOptionQualifiers
        .map(qualifier => this.mapAttribute(qualifier));
    }

    return variant;
  }

  mapAttribute(qualifier) {
    const attribute = new Attribute.Builder()
      .withId(qualifier.qualifier)
      .withName(qualifier.name)
      .withValue(qualifier.value);

    attribute.isVariantAxis = true;

    return attribute;
  }

  getVariantName(variantOptionQualifiers: any) {
    let name = '';

    if (variantOptionQualifiers) {
      const nameQualifier = variantOptionQualifiers.find(qualifier => qualifier.qualifier === 'name');

      if (nameQualifier) {
        name = nameQualifier.value;
      }
    }
    return name;
  }
}
