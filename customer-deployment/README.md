# Commerce CIF Hybris by diconium- Customer Deployment

This folder contains an example customer deployment project. 
It shows how a customer can create package bindings and packages with web actions/sequences
that use the shared action packages available in the [cif](../cif) folder.

## The [options.yml](options.yml) file

Update it with the correct configurations for desired Hybris instance.

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

## The [serverless.yml](serverless.yml) file

The `serverless.yml` file contains a list of all the package `bindings` 
and actions that will be deployed. 
The names of all the packages and actions are defined with variables so that the same serverless deployment
file can be reused for CI/CD automation.

When running the deployment, it is possible to override the following parameters:
* the customer namespace with the parameter `--customer-namespace`
* the customer package used to deploy the final web actions with the parameter `--customer-package`
* the namespace that contains the shared/provider packages with the parameter `--bindings-namespace`

These parameters can be passed to the deployment file via yarn or changed directly in the [package.json](package.json) file.

## Actions deployment

1. Guarantee that the system you are using to deploy the actions have the following tools installed:
    1. [serverless](https://serverless.com/)
    1. [OpenWhisk cli](https://github.com/apache/incubator-openwhisk-cli/releases)
    1. [yarn](https://yarnpkg.com/en/)
1. Set the correct `OpenWhisk` settings on the system by executing:
`wsk property set --auth "<customer authentication>" --apihost "https://adobeioruntime.net/"`
(replace `<customer authentication>` with your customer authentication in the format `USR:PASS`)
1. Set the correct values in package.json for: `customer-namespace` (your customer namespace - e.g project name), 
`customer-package` (the package where the product is going to be installed - e.g. environment like dev, tst, stg, prod) 
and `bindings-namespace` (the namespace where the shared action packages is deployed - 
it can be same as `customer-namespace` although the idea is to share common actions across different projects)
1. Run `yarn deploy` and guarantee all your actions were deployed in the path: `https://runtime.adobe.io/api/v1/web/<customer-namespace>/<customer-package>/<action>`
1. Test a action to guarantee all is ok - e.g. `https://runtime.adobe.io/api/v1/web/<customer-namespace>/<customer-package>/searchProducts/`
1. Configure the api-gateway as described [here](https://github.com/adobe/commerce-cif-api)

## Package Versioning

For each microservice domain like products, diconium prodvides two shared packages in the catalog/bindings namespace like for example:

```
/hybris-cif-catalog/commerce-cif-hybris-product@1.0.0 (updated after each release deployment)
/hybris-cif-catalog/commerce-cif-hybris-product@latest
```
We use the `latest` version for the package bindings so that this example customer deployment project always uses the 
latest available versions of the shared actions.
The versions of the package bindings are defined in the `serverless.yml` deployment file,
replace all `@latest` versions with the right version for each package to use a dedicated version.

_Recommendation_: for a real project, a customer should rather point to a particular version 
to make sure that future changes do not break their deployment. 


## Deployment

The [package.json](package.json) file contains a number of scripts that can be used to deploy all package bindings and actions. First install all dependencies with

`yarn install`

and then install all bindings and actions with

`yarn deploy`

To remove all bindings and actions, simply use

`yarn clean`