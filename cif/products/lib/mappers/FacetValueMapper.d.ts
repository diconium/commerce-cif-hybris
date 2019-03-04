import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { FacetValue } from '@adobe/commerce-cif-model';
import { FacetValueWsDTO, FacetWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class FacetValueMapper extends Mapper<FacetValue> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): void;
    mapFromEntity(entity: any, mappable?: FacetWsDTO): FacetWsDTO;
    mapToEntity(dto: FacetValueWsDTO, entity?: any): FacetValue;
    private getFacetValue;
}
//# sourceMappingURL=FacetValueMapper.d.ts.map