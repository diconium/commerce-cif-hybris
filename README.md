# Commerce CIF Hybris by diconium

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![CircleCI](https://circleci.com/gh/diconium/commerce-cif-hybris.svg?style=svg)](https://circleci.com/gh/diconium/commerce-cif-hybris)

## Introduction

The Commerce CIF Hybris by diconium works as a middleware, it is used to transform the data from SAP Hybris into a usable format by AEM and other [Adobe Experience Cloud](https://www.adobe.com/pt/experience-cloud.html) product. 

It is based on Adobe I/O and Apache Openwhisk (OW) architecture, the main building blocks of the new commerce services are serverless functions (OW actions). These actions, connect to system or other endpoints via their APIs, and can be deployed on Adobe I/O Runtime. The actions are executed in response to events. OW manages the infrastructure, servers and scaling so you can focus on building the applications.

Inside this project you'll find the Actions implementations based on the [Adobe CIF API](https://github.com/adobe/commerce-cif-api), and that connect with the Hybris Commerce Webservices Version 2 REST API.

## Instalation

### Dependencies

To get started with the instalation of the project make sure you have the following tools:

* Node 10.x or higher.
* Yarn 1.x.
* [OpenWhisk CLI](https://github.com/apache/incubator-openwhisk-cli)
* [serverless](https://serverless.com/)
  
:warning: OpenWhisk CLI must be available in your systems PATH and set up correctly to either use an OpenWhisk installation or an Adobe I/O account. Try `wsk --help` to make sure it is working.

### Install

To install all the packages dependencies and bootstrap the project run:
```
$ yarn install
```

and 

```
$ yarn build
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

:warning: Integration tests will not run by default you need to configure a valid Hybris instance and replace all occurrences of
`hybris.example.com` by the address of your running Hybris instance 


To perform a static code analysis using *[TSLint](https://palantir.github.io/tslint/)*. The default linting rules apply the `"tslint-config-airbnb"` rules.
To execute the linting use the following command: 
```
$yarn lint
```

To run linting, tests and coverage analysis for all modules, run the previous commands in the root package,
alternatively you can run the same commands for each individual package that lives inside the `/cif` folder.


We use *[istanbul.js](https://github.com/istanbuljs/nyc)* to collect testing code coverage. This can be reviewd following the coverage badge on the top ot this page.

### Deploy

We use the [Serverless](https://serverless.com/) tool to manage the deploys to our OW instance.
To deploy ensure that your OpenWhisk CLI is installed and with the correct instance configured.

:warning: Ensure that you have privileges on the namespace you are using. 
Deploying code on a namespace and under the same package name will overlap the existing actions previously deployed there, so thread cautiously!

```
$ yarn deploy
```

## Development

### Getting Sarted

The Commerce CIF Hybris by diconium relies on the Hybris Commerce Webservices Version 2 REST API. To start ensure
that you have an available instance of SAP Hybris to where you'll make the connections. Check customer-deployment
[README.md](customer-deployment/README.md) for more details on how to configure your Hybris instance.

### Project structure

```
├── cif
│   ├── carts
│   ├── categories
│   ├── common
│   └── products
├── customer-deployment

```

Each layer was separated and it should be possible to compile/publish it individually.

|  Package | Description |
| ------------- | ------------- |
| @diconium/commerce-cif-hybris-carts | All cart related actions will be present here |
| @diconium/commerce-cif-hybris-categories | All category related actions will be present here |
| @diconium/commerce-cif-hybris-common | Package with global utilities  |
| @diconium/commerce-cif-hybris-products | All product related actions will be present here |

Inside `customer-deployment` we will find the details on how to configure the actions to connect to a running Hybris
instance.

### Typescript

The project is currently using Typescript 3.x. This enables type safety in the code.
If creating a new package ensure that it exports the types in the compilation.
This is achieved by the compiler options: 
```
  "compilerOptions": {
    ...
    "declaration": true
  },
  
```

### Lerna
The repository contains multiple node packages with local cross-dependencies.
To automatically handle these dependencies and build all packages, 
we use the [lerna](https://github.com/lerna/lerna) tool and the 
[Workspaces](https://yarnpkg.com/lang/en/docs/cli/workspace/) feature from Yarn.

If you change the code of an existing action, you don't have to use `lerna` for anything,
just redeploy your action/function. 
If you add a new Node.js package with new actions under [cif](cif), just call `yarn install` from the root of the repository.
If you add some (remote) Node.js dependencies to a package, just use `yarn` to install the new dependencies for that package.
If you add some local dependency from one package to another local package, call `yarn install` from the
root of the repository.

### Serverless
The OpenWhisk actions can be deployed using [serverless](https://serverless.com/framework/docs/providers/openwhisk/) framework.
Actions and sequences are declared in the `serverless.yml` of the main each individual project, under [cif](cif). 
A global `serveless.yml` that create the web actions is available under `customer-deployment`. 
Follow the instructions it's specific [README.md](customer-deployment/README.md) file for more details. 

To deploy all actions you can call `yarn deploy`.
For reference, during the deployment, actions are zipped and stored in the `.serverless` directory.

It is also possible to use `serverless` directly to deploy a single action. 
First navigate to the action folder (e.g [cif/products](cif/products)) 
and execute `$ serverless deploy function -f NAME` (with `NAME` referring to the name of a function declared in `serverless.yml`).