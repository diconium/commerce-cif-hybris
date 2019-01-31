import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { CartModificationWsDTO } from '@diconium/commerce-cif-hybris-clients';

export default class CartModificationMapper extends Mapper<any> {
  constructor(settings: InputSettings) {
    super(settings);
  }

  /* istanbul ignore next */
  mapFromEntity(entity: any, mappable?: CartModificationWsDTO): CartModificationWsDTO {
    throw new Error('Unsupported Operation');
  }

  /* istanbul ignore next */
  mapFromInputArgsToActionParameters(mappable: any): any {
    throw new Error('Unsupported Operation');
  }

  mapToEntity(dto: CartModificationWsDTO, entity?: any): any {
    const { quantity, quantityAdded, statusCode, entry } = dto;
    const entryNumber = entry && entry.entryNumber || undefined;

    return {
      modification: {
        quantity,
        quantityAdded,
        statusCode,
        cartEntryId: String(entryNumber),
      },
    };
  }
}
