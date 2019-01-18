# diconium Hybris CIF Connector

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![pipeline status](https://git.diconium.com/adobe-io/diconium-hybris-connector/badges/master/pipeline.svg)](https://git.diconium.com/adobe-io/diconium-hybris-connector/commits/master)
[![coverage report](https://git.diconium.com/adobe-io/diconium-hybris-connector/badges/master/coverage.svg)](http://connector-reports.rg02.diconium.cloud/index.html)

## Introduction

The diconium Hybris CIF Connector works as a middleware, it is used to transform the data from SAP hybris into a usable format by AEM and other [Adobe Experience Cloud](https://www.adobe.com/pt/experience-cloud.html) products. 

It is based on Adobe I/O and Apache Openwhisk (OW) architecture, the main building blocks of the new commerce services are serverless functions (OW actions). These actions, connect to system or other endpoints via their APIs, and can be deployed on Adobe I/O Runtime. The actions are executed in response to events. OW manages the infrastructure, servers and scaling so you can focus on building the applications.

Inside this project you'll find the Actions implementations based on the [Adobe CIF API](https://github.com/adobe/commerce-cif-api), and that connect with the Hybris Commerce Webservices Version 2 REST API.

## Instalation

### Dependencies

To get started with the instalation of the project make sure you have the following tools:

* Node 7.x or higher.
* Yarn 1.x.
* [OpenWhisk CLI](https://github.com/apache/incubator-openwhisk-cli)
  
:warning: OpenWhisk CLI must be available in your systems PATH and set up correctly to either use an OpenWhisk installation or an Adobe I/O account. Try `wsk --help` to make sure it is working.

### Install

To install all the packages dependencies and bootstrap the project run:
```
$ yarn install
```

### Testing

For unit tests *[Mocha](https://mochajs.org/)* is the test engine used, *[chai.js](http://chaijs.com/)* is the assertion tool and
*[nock.js](https://github.com/nock/nock)* can be used for mocking the http requests.
To run the test you can use the following commands:
```
#Runs all the tests available for the package
$ yarn test 

#Runs only the unit tests
$ yarn test:unit

#Runs only the integration tests (*.it.spec.ts files)
$ yarn test:integration

```

To perform a static code analysis using *[TSLint](https://palantir.github.io/tslint/)*. The default linting rules apply the `"tslint-config-airbnb"` rules.
To execute the linting use the following command: 
```
$yarn lint
```

To run linting, tests and coverage analysis for all modules, run the previous commands in the root package,
alternatively you can run the same commands for each individual package that lives inside the `/libraries` folder.


We use *[istanbul.js](https://github.com/istanbuljs/nyc)* to collect testing code coverage. This can be reviewd following the coverage badge on the top ot this page.

### Deploy

We use the [Serverless](https://serverless.com/) tool to manage the deploys to our OW instance.
To deploy ensure that your OpenWhisk CLI is installed and with the correct instance configured.

:warning: Ensure that you have privileges on the namespace you are using. 
Deploying code on a namespace and under the same package name will overlap the existing actions previously deployed there, so thread cautiously!

```
$ yarn deploy --package <NAME OF THE PACKAGE> #If no package is defined it will default to 'default'
```

## Development

### Getting Sarted

The diconium Hybris CIF Connector relies on the Hybris Commerce Webservices Version 2 REST API. To start ensure that you have an available instance of SAP Hybris to where you'll make the connections.

### Project structure

This project is organized in a plugin structure. The main package, where the actions live will then import in a way all of the other packages.

```
├── libraries
│   ├── dahc
│   ├── dahc-adobe-models
│   ├── @diconium/commerce-cif-hybris-clients
│   ├── @diconium/commerce-cif-hybris-core
│   ├── @diconium/commerce-cif-hybris-i18n
│   ├── dahc-outbound-mappers
│   ├── dahc-response-handler
│   └── @diconium/commerce-cif-hybris-validators
├── packages
└── resources
    ├── inbound
    ├── outbound
    └── postman
```

Inside the libraries exists the packages that compose the functionality of the project. Each layer was separated intent and should be possible to compile/publish it separately.

|  Package | Description |
| ------------- | ------------- |
| dahc | Actions definitions, in here lives the handlers for all the APIs endpoints. |
| dahc-adobe-models | TS definitions fro all the models that adobe exports in [Adobe CIF API](https://github.com/adobe/commerce-cif-api). |
| @diconium/commerce-cif-hybris-clients | Implementation of the Hybris client, currently usint the REST interface. |
| @diconium/commerce-cif-hybris-core | Project entities and core project fucntionalities and interfaces. |
| @diconium/commerce-cif-hybris-i18n | Translation service implementation for the Mappers. |
| dahc-outbound-mappers | Implementation of the mappers between entities and Adobe Models |
| dahc-response-handler | Responsible for transforming the actions results into an acceptable HTTP response.  |
| @diconium/commerce-cif-hybris-validators | Validation rules for the entry arguments of the API |

Inside `/packages` exist some AEM crx packages that might need to be included in the AEM instance to enable all the features of the Hybris connector.

In `/resources` we can find the several swagger definitions for the project, as well as the postman collection for all the endpoints and E2E tests.

### Typescript

The project is currently using Typescript 3.x. This enables type safety in the code. If creating a new package ensure that the it exports the types in the compilation.
This is achieved by the compiler options: 
```
  "compilerOptions": {
    ...
    "declaration": true
  },
  
```

### Lerna
The repository contains multiple node packages with local cross-dependencies. To automatically handle these dependencies and build all packages, we use the [lerna](https://github.com/lerna/lerna) tool and the [Workspaces](https://yarnpkg.com/lang/en/docs/cli/workspace/) feature from Yarn.

Calling `lerna clean` removes the `node_modules` directories of all the node packages under `/libraries`.

If you change the code of an existing action, you don't have to use `lerna` for anything, just redeploy your action/function. If you add a new Node.js package with new actions under `/libraries`, just call `yarn install` from the root of the repository. If you add some (remote) Node.js dependencies to a package, just use `yarn` to install the new dependencies for that package. If you add some local dependency from one package to another local package, call `yarn install` from the root of the repository.

### Serverless
The OpenWhisk actions can be deployed using [serverless](https://serverless.com/framework/docs/providers/openwhisk/) framework.
Actions and sequences are declared in the `serverless.yml` of the main froject, under `/libraries/dahc`. 

To deploy all actions you can call `yarn deploy`.
For reference, during the deployment, actions are zipped and stored in the `.serverless` directory.

It is also possible to use `serverless` directly to deploy a single action. First navigate to the action folder (i.e `/libraries/dahc`) and execute `$ serverless deploy function -f NAME` (with `NAME` referring to the name of a function declared in `serverless.yml`).