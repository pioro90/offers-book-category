import { inject, injectable } from 'inversify';
import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { ApiRouter } from './api/api-router';
import { AppDatabase } from './app-database';


@injectable()
export class AppServer {
    server: express.Application;

    constructor(@inject(ApiRouter) private appRouter: ApiRouter,
                @inject(AppDatabase) private appDatabase: AppDatabase) {
        this.server = express();
        this.server.use(helmet());
        this.server.use(bodyParser.urlencoded({extended: false}));
        this.server.use(bodyParser.json());

        this.server.use('/categories', this.appRouter.createRouter());
    }
}



