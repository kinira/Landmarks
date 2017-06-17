import { ServerLoader, ServerSettings, GlobalAcceptMimesMiddleware } from 'ts-express-decorators';
import { Exception } from 'ts-httpexceptions';
import * as path from 'path'
import * as express from 'express';
import * as favicon from 'serve-favicon'
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import { v1 as neo4j } from 'neo4j-driver';
import { config } from './config'
import { default as authModule } from './modules/auth';

const rootDir = path.resolve(__dirname);
const db = neo4j.driver(config.dbConnection, neo4j.auth.basic(config.dbUsername, config.dbPassword));

@ServerSettings({
    rootDir,
    acceptMimes: ['application/json'] // optional
})
export class Server extends ServerLoader {

    constructor() {
        super();
        this.setEndpoint("/api")                       // Declare your endpoint
            .scan(rootDir + "/controllers/**/**.js")    // Declare the directory that contains your controllers
            .createHttpServer(config.port);
    }


    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    $onMountingMiddlewares(): void | Promise<any> {
        this
            .use(logger('dev'))
            .use(GlobalAcceptMimesMiddleware) // optional
            .use(cookieParser())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));

        return null;
    }

    public $onReady() {
        console.log('Server started...');
    }

    public $onAuth(request, response, next, options?) {
        authModule.isAuthorized(request).then(next);
    }

    public $onError(error: any, request: express.Request, response: express.Response, next: Function): void {

        if (response.headersSent) {
            return next(error);
        }

        if (error instanceof Exception) {
            let httpError = error as Exception;

            response.status(httpError.status).send(httpError.message);
            return next();
        }

        if (error instanceof Error) {
            response.status(500).send(error.message);
            return next();
        }

        if (error.name === "CastError" || error.name === "ObjectID" || error.name === "ValidationError") {
            response.status(400).send("Bad Request");
            return next();
        }

        response.status(error.status || 500).send("Internal Error");

        return next();

    }

    public $onServerInitError(err) {
        console.error(err);
    }

}

new Server().start();

export { db };