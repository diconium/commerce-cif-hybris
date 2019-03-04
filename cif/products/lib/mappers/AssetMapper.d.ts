import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { Asset } from '@adobe/commerce-cif-model';
import { ImageWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class AssetMapper extends Mapper<Asset> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): void;
    mapFromEntity(entity: any, mappable?: ImageWsDTO): ImageWsDTO;
    mapToEntity(dto: ImageWsDTO, entity?: any): Asset;
    private buildAbsoluteUrl;
    private getAssetHost;
}
//# sourceMappingURL=AssetMapper.d.ts.map