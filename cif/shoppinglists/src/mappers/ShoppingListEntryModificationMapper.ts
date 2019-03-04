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
import { ShoppingListEntry } from '@adobe/commerce-cif-model';
import { CartModificationWsDTO, OrderEntryWsDTO, ProductWsDTO } from '@diconium/commerce-cif-hybris-clients';
import ProductMapper from '@diconium/commerce-cif-hybris-products/lib/mappers/ProductMapper';

export default class ShoppingListEntryModificationMapper extends Mapper<any> {
  constructor(settings: InputSettings) {
    super(settings);
  }

  mapFromInputArgsToActionParameters(mappable: any) {
    const {
      id,
      productVariantId,
      quantity,
    } = mappable;

    const orderEntry = this.mapFromEntity({
      productVariantId,
      quantity,
    });

    return {
      id,
      entry: orderEntry,
    };
  }

  mapFromEntity(entity, mappable?: OrderEntryWsDTO): OrderEntryWsDTO {
    const orderEntry : OrderEntryWsDTO = new OrderEntryWsDTO();
    const product: ProductWsDTO = new ProductWsDTO();
    product.code = entity.productVariantId;
    orderEntry.product = product;
    orderEntry.quantity = entity.quantity;

    return orderEntry;
  }

  mapToEntity(dto: CartModificationWsDTO, entity?: any): any {
    const { entry } = dto;
    const entryNumber = entry && entry.entryNumber || undefined;

    const {
      product,
      quantity,
    } = entry;

    const shoppingListEntry = new ShoppingListEntry.Builder()
      .withId(String(entryNumber))
      .withProductVariant(this.mapProductVariant(product))
      .withQuantity(quantity)
      .build();

    return shoppingListEntry;
  }

  mapProductVariant(product: ProductWsDTO) {
    const productVariant = new ProductMapper(this.settings).mapToEntity(product);
    const { variants } = productVariant;
    if (variants[0]) {
      productVariant.attributes = [...productVariant.attributes, variants[0].attributes];
    }
    productVariant.available = product.stock && product.stock.stockLevelStatus === 'inStock';
    productVariant.variants = undefined;
    productVariant.sku = productVariant.id;
    return productVariant;
  }

}
