import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { MoneyValue } from '@adobe/commerce-cif-model';
import { PriceWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class MoneyValueMapper extends Mapper<MoneyValue> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): void;
    mapFromEntity(entity: any, mappable?: PriceWsDTO): PriceWsDTO;
    mapToEntity(dto: PriceWsDTO, entity?: any): MoneyValue;
}
//# sourceMappingURL=MoneyValueMapper.d.ts.map