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
import { Address } from '@adobe/commerce-cif-model';
import { AddressWsDTO, CountryWsDTO, RegionWsDTO } from '@diconium/commerce-cif-hybris-clients';

export default class AddressMapper extends Mapper<Address> {

  constructor(settings: InputSettings) {
    super(settings);
  }
  /* istanbul ignore next */
  mapFromInputArgsToActionParameters(mappable: any) {
    throw new Error('Unsupported Operation');
  }

  mapFromEntity(entity: Address, mappable?: AddressWsDTO): AddressWsDTO {

    const {
      id,
      title = 'mr',
      salutation,
      firstName,
      lastName,
      email,
      phone,
      country,
      region,
      city,
      postalCode,
      organizationName,
      streetName,
      streetNumber,
    } = entity;

    const address: AddressWsDTO = new AddressWsDTO();

    address.companyName = organizationName;
    address.country = new CountryWsDTO();
    address.country.isocode = country;
    address.email = email;
    address.firstName = firstName;
    address.id = id;
    address.lastName = lastName;
    address.line1 = streetName;
    address.line2 = streetNumber;
    address.phone = phone;
    address.postalCode = postalCode;
    if (region) {
      address.region = new RegionWsDTO();
      address.region.countryIso = country;
      address.region.isocode = region;
    }
    address.title = salutation;
    address.titleCode = title;
    address.town = city;

    address.defaultAddress = false;

    return address;

  }

  mapToEntity(dto: AddressWsDTO, entity?): Address {

    const {
      companyName,
      country = new CountryWsDTO(),
      email,
      firstName,
      id,
      lastName,
      line1,
      line2,
      phone,
      postalCode,
      region = new RegionWsDTO(),
      title,
      titleCode,
      town,
    } = dto;

    const address = new Address.Builder()
      .withCity(town)
      .withCountry(country.isocode)
      .withFirstName(firstName)
      .withId(id)
      .withLastName(lastName)
      .withPostalCode(postalCode)
      .withStreetName(line1)
      .build();

    address.streetNumber = line2;
    address.salutation = title;
    address.title = titleCode;
    address.phone = phone;
    address.email = email;
    address.organizationName = companyName;
    address.region = region.isocode;

    return address;
  }

}
