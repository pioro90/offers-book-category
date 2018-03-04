import * as chai from 'chai';

import { chaiRequest } from './shared/chai-request';
import categoryMock from './findcategories/find-categories.data';
import { app } from '../src/app';
import { CategoryAppTest } from './shared/category-app.test';
import { findCategoriesTest } from './findcategories/find-categories.test';

chai.should();

describe('Find categories', () => {

    before(async () => {
        await app.startUp();
        await findCategoriesTest.loadCategory(categoryMock);
    });

    after(async () => {
        await CategoryAppTest.cleanDatabase();
        await app.shutDown();
    });

    it('should return only one category', async () => {
        const res: any = await chaiRequest
            .get('/categories')
            .query({
                start: 0,
                limit: 1
            });
        res.body.categories.should.have.lengthOf(1);
    });

    it('should return all categories', async () => {
        const res: any = await chaiRequest
            .get('/categories')
            .query({
                start: 0,
                limit: 100
            });
        res.body.categories.should.have.lengthOf(12);
    });

});