import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { Address } from '@adobe/commerce-cif-model';
import { AddressWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class AddressMapper extends Mapper<Address> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): void;
    mapFromEntity(entity: Address, mappable?: AddressWsDTO): AddressWsDTO;
    mapToEntity(dto: AddressWsDTO, entity?: any): Address;
}
//# sourceMappingURL=AddressMapper.d.ts.map