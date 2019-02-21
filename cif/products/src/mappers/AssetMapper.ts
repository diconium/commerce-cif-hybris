/*
 * Copyright 2019 diconium
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { Asset } from '@adobe/commerce-cif-model';
import { ImageWsDTO } from '@diconium/commerce-cif-hybris-clients';

export default class AssetMapper extends Mapper<Asset> {

  constructor(settings: InputSettings) {
    super(settings);
  }
  /* istanbul ignore next */
  mapFromInputArgsToActionParameters(mappable: any) {
    throw new Error('Unsupported Operation');
  }
  /* istanbul ignore next */
  mapFromEntity(entity, mappable?: ImageWsDTO): ImageWsDTO {
    throw new Error('Unsupported Operation');
  }

  mapToEntity(dto: ImageWsDTO, entity?): Asset {

    const {
      galleryIndex,
      url,
    } = dto;

    return new Asset.Builder()
      .withId(String(galleryIndex))
      .withUrl(this.buildAbsoluteUrl(url))
      .build();
  }

  private buildAbsoluteUrl(path: string): string {
    return this.getAssetHost() + path;
  }

  private getAssetHost() {

    const {
      CT_ASSETS_HOST,
      HB_API_HOST,
      HB_PROTOCOL,
    } = this.settings;

    if (CT_ASSETS_HOST) {
      return CT_ASSETS_HOST;
    }

    return `${HB_PROTOCOL}://${HB_API_HOST}`;
  }

}
