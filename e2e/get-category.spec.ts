import * as chai from 'chai';
import * as httpStatus from 'http-status';


import { chaiRequest } from './shared/chai-request';
import categories from './data/categories.data';
import { app } from '../src/app';
import { CategoryAppTest } from './shared/category-app.test';

chai.should();

describe('Get category', () => {
    let categoryId: string;

    before(() => {
        return app.startUp()
            .then(() => {
                return chaiRequest
                    .post('/categories')
                    .send(categories[0])
                    .then(res => {
                        categoryId = res.body.id;
                    })
            })
    });

    after(() => {
        return CategoryAppTest.cleanDatabase()
            .then(() => app.shutDown());
    });

    it('should return category', () => {
        return chaiRequest
            .get(`/categories/${categoryId}`)
            .then(res => {
                res.should.have.status(httpStatus.OK);
                return res.body;
            })
            .then(category => {
                category.should.have.all.keys(
                    'name',
                    'ancestors',
                    'description',
                    'createdAt',
                    'updatedAt'
                )
            })
    });


});