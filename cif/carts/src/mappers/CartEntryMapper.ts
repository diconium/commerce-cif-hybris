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
import ProductVariantMapper from '@diconium/commerce-cif-hybris-products/lib/mappers/ProductVariantMapper';

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
    } = mappable;

    const orderEntry = this.mapFromEntity({
      productVariantId,
      quantity,
      cartEntryId,
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
    product.code = entity.productVariantId;
    orderEntry.product = product;
    orderEntry.quantity = entity.quantity;
    orderEntry.entryNumber = entity.cartEntryId;

    return orderEntry;
  }

  mapToEntity(dto: OrderEntryWsDTO, entity?): CartEntry {

    const {
      entryNumber,
      product,
      quantity,
      totalPrice,
      basePrice,
    } = dto;

    const moneyValueMapper = new MoneyValueMapper(this.settings);

    const entryUnitPrice = moneyValueMapper.mapToEntity(basePrice);
    const cartEntry = new CartEntry.Builder()
      .withId(String(entryNumber))
      .withQuantity(quantity)
      .withProductVariant(new ProductVariantMapper(this.settings).mapToEntity(product))
      .withPrice(moneyValueMapper.mapToEntity(totalPrice))
      .withUnitPrice(entryUnitPrice)
      .withType('REGULAR')
      .build();

    cartEntry.productVariant.prices.push(entryUnitPrice);

    return cartEntry;
  }

}
