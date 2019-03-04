import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { AddressWrapper } from '@adobe/commerce-cif-model';
import { AddressWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class AddressWrapperMapper extends Mapper<AddressWrapper> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): {
        id: any;
        address: AddressWsDTO;
    };
    mapFromEntity(entity: AddressWrapper, mappable?: AddressWsDTO): AddressWsDTO;
    mapToEntity(dto: AddressWsDTO, entity?: any): AddressWrapper;
}
//# sourceMappingURL=AddressWrapperMapper.d.ts.map