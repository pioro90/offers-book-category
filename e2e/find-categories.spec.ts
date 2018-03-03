import * as chai from 'chai';
import * as httpStatus from 'http-status';


import { chaiRequest } from './shared/chai-request';
import categories from './data/categories.data';
import { app } from '../src/app';
import { CategoryAppTest } from './shared/category-app.test';

chai.should();

describe('Find categories', () => {

    before(() => {
        return app.startUp();
    });

    after(() => {
        return CategoryAppTest.cleanDatabase()
            .then(() => app.shutDown());
    });

});