"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_env_1 = require("apollo-server-env");
function graphqlCloudFunction(options) {
    if (!options) {
        throw new Error('Apollo Server requires options.');
    }
    if (arguments.length > 1) {
        throw new Error(`Apollo Server expects exactly one argument, got ${arguments.length}`);
    }
    const graphqlHandler = (req, res) => {
        const hasPostBody = req.body && Object.keys(req.body).length > 0;
        if (req.method === 'POST' && !hasPostBody) {
            res.status(500).send('POST body missing.');
            return;
        }
        apollo_server_core_1.runHttpQuery([req, res], {
            method: req.method,
            options: options,
            query: hasPostBody ? req.body : req.query,
            request: {
                url: req.url,
                method: req.method,
                headers: new apollo_server_env_1.Headers(req.headers),
            },
        }).then(({ graphqlResponse, responseInit }) => {
            res
                .status(200)
                .set(responseInit.headers)
                .send(graphqlResponse);
        }, (error) => {
            if ('HttpQueryError' !== error.name) {
                res.status(500).send(error);
                return;
            }
            res
                .status(error.statusCode)
                .set(error.headers)
                .send(error.message);
        });
    };
    return graphqlHandler;
}
exports.graphqlCloudFunction = graphqlCloudFunction;
//# sourceMappingURL=googleCloudApollo.js.map