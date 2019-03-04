import { Payment } from '@adobe/commerce-cif-model';
import { DTO, InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { PaymentDetailsWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class PaymentMapper extends Mapper<Payment> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): {
        id: any;
        paymentId: any;
        payment: DTO;
    };
    mapFromEntity(entity: any, mappable?: DTO): DTO;
    private setCustomerInfo;
    private setCardInfo;
    private buildCartType;
    mapToEntity(dto: PaymentDetailsWsDTO, entity?: Payment): Payment;
}
//# sourceMappingURL=PaymentMapper.d.ts.map