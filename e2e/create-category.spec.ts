import * as chai from 'chai';
import * as httpStatus from 'http-status';


import { chaiRequest } from './shared/chai-request';
import categories from './shared/category-app.data';
import { app } from '../src/app';
import { CategoryAppTest } from './shared/category-app.test';

chai.should();

describe('Create category', () => {

    before(async () => {
        await app.startUp();
    });

    after(async () => {
        await CategoryAppTest.cleanDatabase();
        await app.shutDown();
    });

    it('should return created category id', async () => {
        const res: any = await chaiRequest
            .post('/categories')
            .send(categories[0]);
        res.should.have.status(httpStatus.CREATED);
        res.body.should.have.all.keys('id');
    });

});