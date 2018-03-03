import { Container } from 'inversify';
import * as config from 'config';
import { ServerConfig } from './config/server.config';
import { DatabaseConfig } from './config/database.config';


const container: Container = new Container({autoBindInjectable: true});
container.bind<DatabaseConfig>(DatabaseConfig).toConstantValue(config.get('db'));
container.bind<ServerConfig>(ServerConfig).toConstantValue(config.get('server'));

export const appModule: Container = container;