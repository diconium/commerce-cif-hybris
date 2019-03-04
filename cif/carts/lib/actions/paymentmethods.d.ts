import { PaymentMethod } from '@adobe/commerce-cif-model';
import { Input, Output } from '@diconium/commerce-cif-hybris-core';
declare function getPaymentMethods(input: Input): Promise<Output<PaymentMethod[]>>;
export declare const get: typeof getPaymentMethods;
export {};
//# sourceMappingURL=paymentmethods.d.ts.map