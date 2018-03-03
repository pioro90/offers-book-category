import { inject, injectable } from 'inversify';
import * as mongoose from 'mongoose';
import { DatabaseConfig } from './config/database.config';
import { appModule } from './app-module';


@injectable()
export class AppDatabase {
    databaseUri: string;

    constructor(@inject(DatabaseConfig) private databaseConfig: DatabaseConfig) {
        this.databaseUri = `mongodb://${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.name}`;
    }

    connect() {
        this.bindEventListeners();
        return mongoose.connect(this.databaseUri);
    }

    disconnect() {
        return mongoose.connection.close();
    }

    private bindEventListeners() {
        mongoose.connection.on('connected', () => {
            console.log(`Mongoose default connection open to ${this.databaseUri}`);
        });

        mongoose.connection.on('error', (err) => {
            console.log(`Mongoose default connection error: ${err}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose default connection disconnected');
        });

        process.on('SIGINT', () => {
            this.disconnect().then(() => {
                console.log('Monoose default connection disconnected through app terminated');
                process.exit(0);
            })
        });
    }
}

export const appDatabase = appModule.get(AppDatabase);