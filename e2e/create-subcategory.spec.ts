import * as chai from 'chai';
import * as httpStatus from 'http-status';


import { chaiRequest } from './shared/chai-request';
import categories from './shared/category-app.data';
import { app } from '../src/app';
import { CategoryAppTest } from './shared/category-app.test';

chai.should();

describe('Create subcategory', () => {
    let parentCategoryId: string;

    before(async () => {
        await app.startUp();

        const res: any = await chaiRequest
            .post('/categories')
            .send(categories[0]);
        parentCategoryId = res.body.id;
    });

    after(async () => {
        await CategoryAppTest.cleanDatabase();
        await app.shutDown();
    });

    it('should return subcategory id', async () => {
        const res: any = await chaiRequest
            .post(`/categories/${parentCategoryId}`)
            .send(categories[1]);
        res.body.should.have.all.keys('id');
    });

    it('should create subcategory with set parent and ancestors', async () => {
        const createSubcategoryResponse: any = await chaiRequest
            .post(`/categories/${parentCategoryId}`)
            .send(categories[1]);
        const getSubcategoryResponse: any = await chaiRequest
            .get(`/categories/${createSubcategoryResponse.body.id}`);
        const subcategory: any = getSubcategoryResponse.body;

        subcategory.parent.should.equal(parentCategoryId);
        subcategory.ancestors.should.have.lengthOf(1);
        subcategory.ancestors.should.deep.equal([parentCategoryId]);
    });

});