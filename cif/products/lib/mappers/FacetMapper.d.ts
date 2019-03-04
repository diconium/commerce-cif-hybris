import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { Facet } from '@adobe/commerce-cif-model';
import { FacetWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class FacetMapper extends Mapper<Facet> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): void;
    mapFromEntity(entity: any, mappable?: FacetWsDTO): FacetWsDTO;
    mapToEntity(dto: FacetWsDTO, entity?: any): Facet;
    private getFacetId;
}
//# sourceMappingURL=FacetMapper.d.ts.map