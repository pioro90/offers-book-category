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

    async handle(command: CreateSubcategoryCommand): Promise<CreateSubcategoryCommandResult> {
        const {name, description, parentId} = command;
        const category: ICategory = await this.categoryRepository.create({name, description});
        const parentCategory: ICategory = await this.categoryRepository.getById(parentId);

        const parentAncestors = [...parentCategory.ancestors];

        category.parent = parentCategory.id;
        category.ancestors = [parentCategory.id, ...parentAncestors];

        await category.save();
        
        return new CreateSubcategoryCommandResult(category._id);
    }
}