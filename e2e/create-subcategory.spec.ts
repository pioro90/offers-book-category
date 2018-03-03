import * as chai from 'chai';
import * as httpStatus from 'http-status';


import { chaiRequest } from './shared/chai-request';
import categories from './shared/category-app.data';
import { app } from '../src/app';
import { CategoryAppTest } from './shared/category-app.test';

chai.should();

describe('Create subcategory', () => {
    let parentCategoryId;

    before(() => {
        return app.startUp()
            .then(() => {
                return chaiRequest
                    .post('/categories')
                    .send(categories[0]);
            })
            .then(res => {
                parentCategoryId = res.body.id;
            });
    });

    after(() => {
        return CategoryAppTest.cleanDatabase()
            .then(() => app.shutDown());
    });

    it('should return subcategory id', () => {
        return chaiRequest
            .post(`/categories/${parentCategoryId}`)
            .send(categories[1])
            .then(res => {
                res.should.have.status(httpStatus.CREATED);
                return res.body;
            })
            .then(result => {
                result.should.have.all.keys('id');
            });
    });

    it('should create subcategory with set parent and ancestors', () => {
        return chaiRequest
            .post(`/categories/${parentCategoryId}`)
            .send(categories[1])
            .then(res => res.body.id)
            .then(categoryId => {
                return chaiRequest
                    .get(`/categories/${categoryId}`)
                    .then(res => res.body);
            })
            .then(category => {
                category.parent.should.equal(parentCategoryId);
                category.ancestors.should.have.lengthOf(1);
                category.ancestors.should.deep.equal([parentCategoryId]);
            })
    });

});