import { DTO, InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { PagedResponseCategory } from '@adobe/commerce-cif-model';
import { CatalogVersionWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class PagedResponseCategoryMapper extends Mapper<PagedResponseCategory> {
    constructor(settings: InputSettings, actionParameters?: any);
    mapFromInputArgsToActionParameters(mappable: any): {
        sort: any;
        offset: any;
        limit: any;
        type: any;
        depth: any;
    };
    mapFromEntity(entity: any, mappable?: DTO): DTO;
    mapToEntity(dto: CatalogVersionWsDTO, entity?: any): any;
    private flatten;
    private flattenReducer;
    private cutChildren;
    private buildCategoryDto;
    private isMaxDepthNotReached;
}
//# sourceMappingURL=PagedResponseCategoryMapper.d.ts.map