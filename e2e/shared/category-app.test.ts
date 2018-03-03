import { connection } from 'mongoose';


export class CategoryAppTest {

    static cleanDatabase(): Promise<boolean> {
        return connection.db.dropCollection('categories');
    }

}