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

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const hybrisHost = require('./package.json').hybrishost;

export class TestUtils {

  static getHybrisInstance() {
    return hybrisHost;
  }

  static async getBearer() {
    return await chai.request(TestUtils.getHybrisInstance())
      .post('authorizationserver/oauth/token')
      .type('application/x-www-form-urlencoded')
      .send({
        grant_type: 'password',
        username: 'customer@example.com',
        password: '12341234',
        client_secret: 'hybrisoauthclientsecret',
        client_id: 'hybrisoauthclientid',
      })
      .then(response => response.body.access_token)
      .catch(error => error);
  }

  static async postAnonymousCartWithProduct(): Promise<string> {
    const id = await chai.request(TestUtils.getHybrisInstance())
      .post('rest/v2/electronics/users/anonymous/carts')
      .query({
        fields: 'DEFAULT',
      })
      .then(response => response.body.guid)
      .catch(reason => reason);
    const added = await chai.request(TestUtils.getHybrisInstance())
      .post(`rest/v2/electronics/users/anonymous/carts/${id}/entries`)
      .query({
        fields: 'DEFAULT',
      })
      .send(
        {
          product: {
            code: '280916',
          },
        })
      .then(response => response.body.quantityAdded)
      .catch(reason => reason);

    if (added) {
      return id;
    }
  }

  static async deleteCartById(id: string) {
    chai.request(TestUtils.getHybrisInstance())
      .delete(`rest/v2/electronics/users/current/carts/${id}`);
  }

}
