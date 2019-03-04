import { DTO, InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { PaymentMethod } from '@adobe/commerce-cif-model';
import { PaymentDetailsListWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class PaymentMethodListMapper extends Mapper<PaymentMethod[]> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): void;
    mapFromEntity(entity: any, mappable?: DTO): DTO;
    mapToEntity(dto: PaymentDetailsListWsDTO, entity?: any): any[];
}
//# sourceMappingURL=PaymentMethodListMapper.d.ts.map