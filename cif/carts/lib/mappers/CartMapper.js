"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commerce_cif_hybris_core_1 = require("@diconium/commerce-cif-hybris-core");
const commerce_cif_model_1 = require("@adobe/commerce-cif-model");
const CartEntryMapper_1 = __importDefault(require("./CartEntryMapper"));
const AddressMapper_1 = __importDefault(require("./AddressMapper"));
const ShippingInfoMapper_1 = __importDefault(require("./ShippingInfoMapper"));
const PaymentMapper_1 = __importDefault(require("./PaymentMapper"));
const CouponListMapper_1 = __importDefault(require("./CouponListMapper"));
const MoneyValueMapper_1 = __importDefault(require("@diconium/commerce-cif-hybris-products/lib/mappers/MoneyValueMapper"));
class CartMapper extends commerce_cif_hybris_core_1.Mapper {
    constructor(settings) {
        super(settings);
    }
    mapFromInputArgsToActionParameters(mappable) {
        const { id, currency, productVariantId, quantity, } = mappable;
        return { id, productVariantId, quantity, curr: currency };
    }
    /* istanbul ignore next */
    mapFromEntity(entity, mappable) {
        throw new Error('Unsupported Operation');
    }
    mapToEntity(dto, entity) {
        const { appliedVouchers, code, deliveryAddress, deliveryMode, entries = [], guid, paymentInfo, subTotal, totalPriceWithTax, totalPrice, totalTax, user, } = dto;
        const id = user.name === 'current' ? code : guid;
        const moneyValueMapper = new MoneyValueMapper_1.default(this.settings);
        const cart = new commerce_cif_model_1.Cart.Builder()
            .withId(id)
            .withEntries(entries.map(entry => new CartEntryMapper_1.default(this.settings).mapToEntity(entry)))
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
            cart.taxInfo = new commerce_cif_model_1.TaxInfo.Builder()
                .withValue(moneyValueMapper.mapToEntity(totalTax))
                .build();
        }
        if (deliveryAddress) {
            cart.shippingAddress = new AddressMapper_1.default(this.settings).mapToEntity(deliveryAddress);
        }
        if (deliveryMode) {
            cart.shippingInfo = new ShippingInfoMapper_1.default(this.settings).mapToEntity(deliveryMode);
        }
        if (paymentInfo) {
            cart.payments = [];
            cart.payments.push(new PaymentMapper_1.default(this.settings).mapToEntity(paymentInfo));
            cart.billingAddress = new AddressMapper_1.default(this.settings).mapToEntity(paymentInfo.billingAddress);
        }
        if (appliedVouchers) {
            cart.coupons = new CouponListMapper_1.default(this.settings).mapToEntity({ vouchers: appliedVouchers });
        }
        return cart;
    }
}
exports.default = CartMapper;
//# sourceMappingURL=CartMapper.js.map