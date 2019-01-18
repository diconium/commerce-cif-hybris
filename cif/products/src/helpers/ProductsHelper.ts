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

import { CategoryWsDTO, FacetValueWsDTO, ImageWsDTO, PriceWsDTO, ProductWsDTO } from '@diconium/commerce-cif-hybris-clients';
import { InputSettings, TranslationService } from '@diconium/commerce-cif-hybris-core';
import ProductVariantMapper from '../mappers/ProductVariantMapper';
import MoneyValueMapper from '../mappers/MoneyValueMapper';
import CategoryMapper from '../mappers/CategoryMapper';
import AssetMapper from '../mappers/AssetMapper';
import { Attribute, FacetValue, Product, ProductVariant } from '@adobe/commerce-cif-model';
import FacetValueMapper from '../mappers/FacetValueMapper';

export class ProductsHelper {

  static pushProductVariant(productDTO: ProductWsDTO, product: Product | ProductVariant, settings: InputSettings): Product | ProductVariant[] {
    const variants = [];
    if (product) {
      variants.push(new ProductVariantMapper(settings).mapToEntity(productDTO));
    }
    return variants;
  }

  static pushPrice(price: PriceWsDTO, settings: InputSettings) {
    const prices = [];
    if (price) {
      prices.push(new MoneyValueMapper(settings).mapToEntity(price));
    }
    return prices;
  }

  static buildAttributes(dto, translationService: TranslationService): Attribute[] {

    const attributes = ['manufacturer', 'averageRating', 'numberOfReviews', 'availableForPickup', 'description'];
    return attributes
      .filter(attribute => dto[attribute])
      .map(attribute => this.buildAttribute(attribute, dto, translationService));

  }

  static buildAttribute(attribute, dto, translationService: TranslationService): Attribute {
    return new Attribute.Builder()
      .withId(attribute)
      .withName(translationService.translate(attribute))
      .withValue(dto[attribute])
      .build();
  }

  static buildCategories(categories: CategoryWsDTO[], settings: InputSettings) {
    return categories.map(category => new CategoryMapper(settings).mapToEntity(category));
  }

  static buildAssets(images: ImageWsDTO[], settings: InputSettings) {
    return images.map(image => new AssetMapper(settings).mapToEntity(image));
  }

  static mapFacetValues(facetValuesDto: FacetValueWsDTO[], settings: InputSettings): FacetValue[] {
    return facetValuesDto.map(facetValue => new FacetValueMapper(settings).mapToEntity(facetValue));
  }

}
