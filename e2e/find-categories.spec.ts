import * as chai from 'chai';


import { chaiRequest } from './shared/chai-request';
import categoryMock from './findcategories/find-categories.data';
import { app } from '../src/app';
import { CategoryAppTest } from './shared/category-app.test';
import { findCategoriesTest } from './findcategories/find-categories.test';
import Category from './findcategories/category';

chai.should();

describe('Find categories', () => {
    const category: Category = categoryMock;

    before(() => {
        return app.startUp()
            .then(() => {
                return findCategoriesTest.loadCategory(category);
            });
    });

    after(() => {
        return CategoryAppTest.cleanDatabase()
            .then(() => app.shutDown());
    });

    it('should return only one category', () => {
        return chaiRequest
            .get('/categories')
            .query({
                start: 0,
                limit: 1
            })
            .then(res => res.body.categories)
            .then(categories => {
                categories.should.have.lengthOf(1);
            })
    });

    it('should return all categories', () => {
        return chaiRequest
            .get('/categories')
            .query({
                start: 0,
                limit: 100
            })
            .then(res => res.body.categories)
            .then(categories => {
                categories.should.have.lengthOf(12);
            })
    });

});