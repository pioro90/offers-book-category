import { model, Model } from 'mongoose';
import { ICategory } from './category';
import { CategorySchema } from './category.schema';
import { injectable } from 'inversify';


@injectable()
export class CategoryRepository {
    categoryModel: Model<ICategory>;

    constructor() {
        this.categoryModel = model<ICategory>('Category', CategorySchema);
    }

    create(category: any): Promise<any> {
        return this.categoryModel.create(category);
    }
}