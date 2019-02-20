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
import { Attribute, Product } from '@adobe/commerce-cif-model';
import { ProductWsDTO } from '@diconium/commerce-cif-hybris-clients';
import { ProductsHelper } from '../helpers/ProductsHelper';
import { dahcTranslator } from '@diconium/commerce-cif-hybris-i18n';

export default class ProductMapper extends Mapper<Product> {

  constructor(settings: InputSettings) {
    super(settings, dahcTranslator);
  }

  mapFromInputArgsToActionParameters(mappable: any) {
    const {
      id,
    } = mappable;

    return { id };
  }

  /* istanbul ignore next */
  mapFromEntity(entity, mappable?: ProductWsDTO): ProductWsDTO {
    throw new Error('Unsupported Operation');
  }

  mapToEntity(dto: ProductWsDTO, entity?): Product {

    const {
      baseProduct,
      code: id,
      categories = [],
      description,
      images,
      name = '',
      price,
      variantOptions,
    } = dto;

    const product = new Product.Builder()
      .withMasterVariantId(baseProduct)
      .withId(id)
      .withName(name)
      .withPrices([])
      .withVariants([])
      .build();

    product.prices = ProductsHelper.pushPrice(price, this.settings);
    product.categories = ProductsHelper.buildCategories(categories, this.settings);
    product.description = description;
    product.attributes = ProductsHelper.buildAttributes(dto, this.translationService);
    product.variants = ProductsHelper.pushProductVariant(variantOptions, this.settings);
    product.assets = ProductsHelper.buildAssets(images, this.settings);

    return product;
  }

}
