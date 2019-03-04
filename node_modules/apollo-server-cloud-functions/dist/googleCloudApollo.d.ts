import { GraphQLOptions } from 'apollo-server-core';
import { Request, Response } from 'express';
export interface CloudFunctionGraphQLOptionsFunction {
    (req?: Request, res?: Response): GraphQLOptions | Promise<GraphQLOptions>;
}
export declare function graphqlCloudFunction(options: GraphQLOptions | CloudFunctionGraphQLOptionsFunction): any;
//# sourceMappingURL=googleCloudApollo.d.ts.map