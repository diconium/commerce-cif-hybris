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
import { Cart, TaxInfo } from '@adobe/commerce-cif-model';
import { CartWsDTO } from '@diconium/commerce-cif-hybris-clients';
import CartEntryMapper from './CartEntryMapper';
import AddressMapper from './AddressMapper';
import ShippingInfoMapper from './ShippingInfoMapper';
import PaymentMapper from './PaymentMapper';
import CouponListMapper from './CouponListMapper';
import MoneyValueMapper from '@diconium/commerce-cif-hybris-products/lib/mappers/MoneyValueMapper';

export default class CartMapper extends Mapper<Cart> {

  constructor(settings: InputSettings) {
    super(settings);
  }

  mapFromInputArgsToActionParameters(mappable: any) {

    const {
      id,
      currency,
      productVariantId,
      quantity,
    } = mappable;

    return { id, productVariantId, quantity, curr: currency };
  }
  /* istanbul ignore next */
  mapFromEntity(entity, mappable?: DTO): DTO {
    throw new Error('Unsupported Operation');
  }

  mapToEntity(dto: CartWsDTO, entity?: Cart): Cart {
    const {
      appliedVouchers,
      code,
      deliveryAddress,
      deliveryMode,
      entries = [],
      guid,
      paymentInfo,
      subTotal,
      totalPriceWithTax,
      totalPrice,
      totalTax,
      user,
    } = dto;

    const id = user.name === 'current' ? code : guid;

    const moneyValueMapper = new MoneyValueMapper(this.settings);

    const cart = new Cart.Builder()
      .withId(id)
      .withEntries(entries.map(entry => new CartEntryMapper(this.settings).mapToEntity(entry)))
      .withProductTotalPrice(moneyValueMapper.mapToEntity(subTotal))
      .withCurrency(totalPriceWithTax.currencyIso)
      .build();

    if (totalPriceWithTax) {
      cart.grossTotalPrice = moneyValueMapper.mapToEntity(totalPriceWithTax);
    }

    if (totalPrice) {
      cart.netTotalPrice = moneyValueMapper.mapToEntity(totalPrice);
    }

    if (totalTax) {
      cart.taxInfo = new TaxInfo.Builder()
        .withValue(moneyValueMapper.mapToEntity(totalTax))
        .build();
    }

    if (deliveryAddress) {
      cart.shippingAddress = new AddressMapper(this.settings).mapToEntity(deliveryAddress);
    }

    if (deliveryMode) {
      cart.shippingInfo = new ShippingInfoMapper(this.settings).mapToEntity(deliveryMode);
    }

    if (paymentInfo) {
      cart.payments = [];
      cart.payments.push(new PaymentMapper(this.settings).mapToEntity(paymentInfo));
      cart.billingAddress = new AddressMapper(this.settings).mapToEntity(paymentInfo.billingAddress);
    }

    if (appliedVouchers) {
      cart.coupons = new CouponListMapper(this.settings).mapToEntity({ vouchers: appliedVouchers });
    }

    return cart;
  }

}
