import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { PagedResponseProduct } from '@adobe/commerce-cif-model';
import { ProductSearchPageWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class PagedResponseProductMapper extends Mapper<PagedResponseProduct> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): {
        query: string;
        pageSize: any;
        currentPage: number;
    };
    mapFromEntity(entity: any, mappable?: ProductSearchPageWsDTO): ProductSearchPageWsDTO;
    mapToEntity(dto: ProductSearchPageWsDTO, entity?: any): PagedResponseProduct;
    private updateFacetFromBreadcrumb;
    private buildFacetFromBreadcrumb;
}
//# sourceMappingURL=PagedResponseProductMapper.d.ts.map