import 'reflect-metadata';
import { Server } from "http";
import { inject, injectable } from 'inversify';
import { AppServer } from './app-server';
import { AppDatabase } from './app-database';
import { appModule } from './app-module';

@injectable()
export class App {
    httpServer: Server;

    constructor(@inject(AppServer) private appServer: AppServer,
                @inject(AppDatabase) private appDatabase: AppDatabase) {
    }

    startUp() {
        return this.appDatabase.connect()
            .then(() => {
                return this.appServer.server.listen(3000);
            })
            .then((httpServer: Server) => {
                this.httpServer = httpServer;
                return console.log(`Server is listening on 3000`)
            })
            .catch(err => {
                console.log(err);
            })
    }

    shutDown() {
        return new Promise((resolve, reject) => {
            this.httpServer.close(() => {
                resolve();
            })
        }).then(() => {
            console.log('Server on 3000 is shut down');
            return this.appDatabase.disconnect();
        });
    }
}

export const app = appModule.get(App);