import Category from './category';
import { chaiRequest } from '../shared/chai-request';

export class FindCategoriesTest {

    loadCategory(category: Category, parentCategoryId?: string): Promise<any> {
        const categoryCreateUrl = '/categories' + (parentCategoryId ? `/${parentCategoryId}` : '');
        const {name, description} = category;

        return chaiRequest
            .post(categoryCreateUrl)
            .send({name, description})
            .then(res => res.body.id)
            .then(parentId => {
                if (!category.subcategories) return Promise.resolve([]);
                return Promise.all(category.subcategories.map(subcategory => this.loadCategory(subcategory, parentId)))
            })
    }

}

export const findCategoriesTest: FindCategoriesTest = new FindCategoriesTest();