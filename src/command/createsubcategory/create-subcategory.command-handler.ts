import { inject, injectable } from 'inversify';
import { CommandHandler } from 'offers-book-cqrs/src/command/command-handler';
import { CreateSubcategoryCommand } from './create-subcategory.command';
import { CreateSubcategoryCommandResult } from './create-subcategory.command-result';
import { CategoryRepository } from '../../domain/category.repository';
import { ICategory } from '../../domain/category';

@injectable()
export class CreateSubcategoryCommandHandler implements CommandHandler<CreateSubcategoryCommand, Promise<CreateSubcategoryCommandResult>> {

    constructor(@inject(CategoryRepository) private categoryRepository: CategoryRepository) {
    }

    handle(command: CreateSubcategoryCommand): Promise<CreateSubcategoryCommandResult> {
        const {name, description, parentId} = command;

        return this.categoryRepository
            .create({name, description})
            .then((category: ICategory) => {
                return Promise.all([category, this.categoryRepository.getById(parentId)]);
            })
            .then((results: ICategory[]) => {
                const [category, parentCategory] = results;

                const parentAncestors = [...parentCategory.ancestors];

                category.parent = parentCategory.id;
                category.ancestors = [parentCategory.id, ...parentAncestors];

                return category.save();
            })
            .then((category: ICategory) => new CreateSubcategoryCommandResult(category._id))
    }
}