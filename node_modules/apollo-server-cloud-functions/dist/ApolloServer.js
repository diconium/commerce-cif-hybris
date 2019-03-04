"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const graphql_playground_html_1 = require("@apollographql/graphql-playground-html");
const googleCloudApollo_1 = require("./googleCloudApollo");
class ApolloServer extends apollo_server_core_1.ApolloServerBase {
    constructor(options) {
        if (process.env.ENGINE_API_KEY || options.engine) {
            options.engine = Object.assign({ sendReportsImmediately: true }, (typeof options.engine !== 'boolean' ? options.engine : {}));
        }
        super(options);
    }
    createGraphQLServerOptions(req, res) {
        return super.graphQLServerOptions({ req, res });
    }
    createHandler({ cors } = { cors: undefined }) {
        const promiseWillStart = this.willStart();
        const corsHeaders = {};
        if (cors) {
            if (cors.methods) {
                if (typeof cors.methods === 'string') {
                    corsHeaders['Access-Control-Allow-Methods'] = cors.methods;
                }
                else if (Array.isArray(cors.methods)) {
                    corsHeaders['Access-Control-Allow-Methods'] = cors.methods.join(',');
                }
            }
            if (cors.allowedHeaders) {
                if (typeof cors.allowedHeaders === 'string') {
                    corsHeaders['Access-Control-Allow-Headers'] = cors.allowedHeaders;
                }
                else if (Array.isArray(cors.allowedHeaders)) {
                    corsHeaders['Access-Control-Allow-Headers'] = cors.allowedHeaders.join(',');
                }
            }
            if (cors.exposedHeaders) {
                if (typeof cors.exposedHeaders === 'string') {
                    corsHeaders['Access-Control-Expose-Headers'] = cors.exposedHeaders;
                }
                else if (Array.isArray(cors.exposedHeaders)) {
                    corsHeaders['Access-Control-Expose-Headers'] = cors.exposedHeaders.join(',');
                }
            }
            if (cors.credentials) {
                corsHeaders['Access-Control-Allow-Credentials'] = 'true';
            }
            if (cors.maxAge) {
                corsHeaders['Access-Control-Max-Age'] = cors.maxAge;
            }
        }
        return (req, res) => {
            if (req.path && !['', '/', '/graphql'].includes(req.path)) {
                res.status(404).end();
                return;
            }
            if (cors) {
                if (typeof cors.origin === 'string') {
                    res.set('Access-Control-Allow-Origin', cors.origin);
                }
                else if (typeof cors.origin === 'boolean' ||
                    (Array.isArray(cors.origin) &&
                        cors.origin.includes(req.get('origin') || ''))) {
                    res.set('Access-Control-Allow-Origin', req.get('origin'));
                }
                if (!cors.allowedHeaders) {
                    res.set('Access-Control-Allow-Headers', req.get('Access-Control-Request-Headers'));
                }
            }
            if (req.method === 'OPTIONS') {
                res.status(204).send('');
                return;
            }
            if (this.playgroundOptions && req.method === 'GET') {
                const acceptHeader = req.headers['accept'];
                if (acceptHeader && acceptHeader.includes('text/html')) {
                    const playgroundRenderPageOptions = Object.assign({ endpoint: req.get('referer') }, this.playgroundOptions);
                    res
                        .status(200)
                        .send(graphql_playground_html_1.renderPlaygroundPage(playgroundRenderPageOptions));
                    return;
                }
            }
            res.set(corsHeaders);
            googleCloudApollo_1.graphqlCloudFunction(() => __awaiter(this, void 0, void 0, function* () {
                yield promiseWillStart;
                return this.createGraphQLServerOptions(req, res);
            }))(req, res);
        };
    }
}
exports.ApolloServer = ApolloServer;
//# sourceMappingURL=ApolloServer.js.map