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
import { CartEntry } from '@adobe/commerce-cif-model';
import { OrderEntryWsDTO, ProductWsDTO } from '@diconium/commerce-cif-hybris-clients';
import MoneyValueMapper from '@diconium/commerce-cif-hybris-products/lib/mappers/MoneyValueMapper';
import ProductMapper from '@diconium/commerce-cif-hybris-products/lib/mappers/ProductMapper';

export default class CartEntryMapper extends Mapper<CartEntry> {

  constructor(settings: InputSettings) {
    super(settings);
  }

  mapFromInputArgsToActionParameters(mappable: any) {
    const {
      id,
      productVariantId,
      quantity,
      cartEntryId,
      offerCode,
    } = mappable;

    const orderEntry = this.mapFromEntity({
      quantity,
      cartEntryId,
      code: productVariantId || offerCode,
    });

    return {
      id,
      cartEntryId,
      entry: orderEntry,
    };
  }

  mapFromEntity(entity, mappable?: OrderEntryWsDTO): OrderEntryWsDTO {
    const orderEntry : OrderEntryWsDTO = new OrderEntryWsDTO();
    const product: ProductWsDTO = new ProductWsDTO();
    product.code = entity.code;
    orderEntry.product = product;
    orderEntry.quantity = entity.quantity;
    orderEntry.entryNumber = entity.cartEntryId;

    return orderEntry;
  }

  mapToEntity(dto: OrderEntryWsDTO, entity?): CartEntry {

    const {
      basePrice,
      entryNumber,
      product,
      quantity,
      totalPrice,
    } = dto;

    const moneyValueMapper = new MoneyValueMapper(this.settings);
    const cartEntryBuilder = new CartEntry.Builder()
        .withId(String(entryNumber))
        .withQuantity(quantity)
        .withProductVariant(this.mapProductVariant(product))
        .withType('REGULAR');

    if (totalPrice) {
      cartEntryBuilder.withPrice(moneyValueMapper.mapToEntity(totalPrice));
    }

    if (basePrice) {
      cartEntryBuilder.withUnitPrice(moneyValueMapper.mapToEntity(basePrice));
    }

    const cartEntry = cartEntryBuilder.build();

    return cartEntry;
  }

  mapProductVariant(product: ProductWsDTO) {
    const productVariant = new ProductMapper(this.settings).mapToEntity(product);
    const { variants } = productVariant;
    if (variants[0]) {
      productVariant.attributes = [...productVariant.attributes, variants[0].attributes];
    }
    productVariant.variants = undefined;
    productVariant.sku = productVariant.id;
    return productVariant;
  }

}
