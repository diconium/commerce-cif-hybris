[![pipeline status](https://git.diconium.com/adobe-io/diconium-hybris-connector/badges/master/pipeline.svg)](https://git.diconium.com/adobe-io/diconium-hybris-connector/commits/master)
[![coverage report](https://git.diconium.com/adobe-io/diconium-hybris-connector/badges/master/coverage.svg)](https://git.diconium.com/adobe-io/diconium-hybris-connector/commits/master)


# //diconium Hybris Runtime Connector

Hello! 😎 

Before you can deploy your service, please follow the instructions below…

### Install the project

Clone the project into your local machine and run the instal command on the project folder.
```
$ yarn install
```

### Install serverless

Run the command to intall the serverless cli
```
$ yarn add -g serverless
```

### Install local OpenWhisk

Clone the project from this repo https://github.com/apache/incubator-openwhisk-devtools/tree/master.
Before installing openwhisk disable the QUIC experimental feature in chrome

Inside the docker-compose folder run the command:
```
$ make quick-start
```

####  Install the provider plugin

```
$ npm install --global serverless-openwhisk
```

#### Link provider plugin to service directory

Using `npm link` will import the provider plugin into the service directory. Running `npm install` will automatically perform this using a `post install` script.

```
$ npm link serverless-openwhisk
or
$ npm install
```

**_…and that's it!_**

### Deploy Service

Use the `serverless` command to deploy your service. The sample `handler.js` file can be deployed without modification.

```shell
serverless deploy
```