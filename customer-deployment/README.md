# Commerce Integration Framework (CIF) Hybris Integration Project - Customer Deployment

This folder contains an example customer deployment project. It shows how a customer can create package bindings and packages with web actions/sequences that use the shared action packages available in the cif folder.

### Quick Start

Update the `options.yml` file with the correct configurations for desired hybris instance.

The following parameters are allowed:

```
HB_BASESITEID: #Mandatory: Base hybris site 
HB_CLIENTID: #Mandatory: Oauth user
HB_CLIENTSECRET: #Mandatory: Oauth secret
HB_PROTOCOL: #Mandatory: API protocol (eg. https)
HB_API_HOST: #Mandatory: Hybris API host
HB_API_BASE_PATH: #Mandatory: Hybris API base path (eg. /rest/v2)
HB_OAUTH_HOST: #Mandatory: Hybris Oauth host (probably the same as HB_API_HOST)
HB_OAUTH_PATH: #Mandatory: Hybris Oauth path (eg. /authorizationserver/oauth/token)
HB_CATALOG: #Mandatory: Hybris Catalog
HB_CATALOGVERSION: #Mandatory: Hybris Catalog version (eg. Online)
HB_USER: #Optional: Hybris authentication user
HB_PASSWORD: #Optional: Hybris authentication password
HB_AUTH: #Optional: Hybris authentication type (eg. basic)
CT_ASSETS_HOST: #Optional: host for the product images in case they are stored outside the hybris instance 
```

### Actions deployment

1. Guarantee that the system you are using to install the actions have the following tools installed:
    1. [serverless](https://serverless.com/): read below section
    1. [OpenWhisk cli](https://github.com/apache/incubator-openwhisk-cli/releases)
    1. [yarn](https://yarnpkg.com/en/)
1. Set the correct `OpenWhisk` settings on the system by executing: `wsk property set --auth "<customer authentication>" --apihost "https://adobeioruntime.net/"` (replace `<customer authentication>` with your customer authentication)
1. Set the correct values in package.json for: `customer-namespace` (your customer namespace), `customer-package` (the package where the product is going to be installed) and `bindings-namespace` (the namespace where the shared action packages is deployed)
1. Run `yarn deploy` and guarantee all your actions were deployed in the path: `https://runtime.adobe.io/api/v1/web/<customer-namespace>/<customer-package>/<action>`


### Helper notes to correctly install and configure serverless

Run the command to intall the serverless cli
```
$ yarn add -g serverless
```

#####  Install the provider plugin

```
$ npm install --global serverless-openwhisk
```

##### Link provider plugin to service directory

Using `npm link` will import the provider plugin into the service directory:

```
$ npm link serverless-openwhisk
```

**_…and that's it!_**

## by diconium