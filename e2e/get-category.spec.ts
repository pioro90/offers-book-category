import * as chai from 'chai';


import { chaiRequest } from './shared/chai-request';
import categories from './shared/category-app.data';
import { app } from '../src/app';
import { CategoryAppTest } from './shared/category-app.test';

chai.should();

describe('Get category', () => {
    let categoryId: string;

    before(async () => {
        await app.startUp();

        const res: any = await chaiRequest
            .post('/categories')
            .send(categories[0]);
        categoryId = res.body.id;
    });

    after(async () => {
        await CategoryAppTest.cleanDatabase();
        await app.shutDown();
    });

    it('should return category', async () => {
        const res: any = await chaiRequest
            .get(`/categories/${categoryId}`);
        res.body.should.have.all.keys(
            'name',
            'ancestors',
            'description',
            'createdAt',
            'updatedAt'
        )
    });

});