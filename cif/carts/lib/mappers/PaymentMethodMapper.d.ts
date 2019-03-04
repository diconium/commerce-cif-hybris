import { DTO, InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { PaymentMethod } from '@adobe/commerce-cif-model';
import { PaymentDetailsWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class PaymentMethodMapper extends Mapper<PaymentMethod> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): {
        id: any;
    };
    mapFromEntity(entity: any, mappable?: DTO): DTO;
    mapToEntity(dto: PaymentDetailsWsDTO, entity?: any): any;
}
//# sourceMappingURL=PaymentMethodMapper.d.ts.map