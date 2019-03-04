import { ApolloServerBase, GraphQLOptions, Config } from 'apollo-server-core';
import { Request, Response } from 'express';
export interface CreateHandlerOptions {
    cors?: {
        origin?: boolean | string | string[];
        methods?: string | string[];
        allowedHeaders?: string | string[];
        exposedHeaders?: string | string[];
        credentials?: boolean;
        maxAge?: number;
    };
}
export declare class ApolloServer extends ApolloServerBase {
    constructor(options: Config);
    createGraphQLServerOptions(req: Request, res: Response): Promise<GraphQLOptions>;
    createHandler({ cors }?: CreateHandlerOptions): (req: Request, res: Response) => void;
}
//# sourceMappingURL=ApolloServer.d.ts.map