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

    create(category: any): Promise<ICategory> {
        return this.categoryModel.create(category);
    }

    getById(id: string): Promise<ICategory> {
        return this.categoryModel.findById(id)
            .exec();
    }

    find(q: any): Promise<ICategory[]> {
        const query = this.categoryModel.find({});

        if (q.name) {
            query.regex('name', new RegExp(`${q.name}`, 'i'));
        }

        if (q.description) {
            query.regex('description', new RegExp(`${q.description}`, 'i'));
        }

        if (q.parent) {
            query.where('parent').equals(q.parent);
        }

        if (q.ancestor) {
            query.where('ancestors').in([q.ancestor]);
        }

        if (q.start) {
            query.skip(q.start);
        }

        if (q.limit) {
            query.limit(q.limit);
        }

        return query.exec();
    }
}