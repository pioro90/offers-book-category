import { inject, injectable } from 'inversify';
import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { AppRouter } from './app.router';
import { AppDatabase } from './app-database';


@injectable()
export class AppServer {
    server: express.Application;

    constructor(@inject(AppRouter) private appRouter: AppRouter,
                @inject(AppDatabase) private appDatabase: AppDatabase) {
        this.server = express();
        this.server.use(helmet());
        this.server.use(bodyParser.urlencoded({extended: false}));
        this.server.use(bodyParser.json());

        this.server.use('/categories', this.appRouter.createRouter());
    }
}



