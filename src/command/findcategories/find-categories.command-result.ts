import { ICategory } from '../../domain/category';

export class FindCategoriesCommandResult {
    categories: ICategory[];

    constructor(categories: ICategory[]) {
        this.categories = categories;
    }
}