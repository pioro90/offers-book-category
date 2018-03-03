import { inject, injectable } from 'inversify';
import { CommandHandler } from 'offers-book-cqrs/src/command/command-handler';
import { CreateCategoryCommand } from './create-category.command';
import { CreateCategoryCommandResult } from './create-category.command-result';
import { CategoryRepository } from '../../domain/category.repository';
import { ICategory } from '../../domain/category';


@injectable()
export class CreateCategoryCommandHandler implements CommandHandler<CreateCategoryCommand, Promise<CreateCategoryCommandResult>> {

    constructor(@inject(CategoryRepository) private categoryRepository: CategoryRepository) {
    }

    handle(command: CreateCategoryCommand): Promise<CreateCategoryCommandResult> {
        return this.categoryRepository
            .create(command)
            .then((category: ICategory) => new CreateCategoryCommandResult(category._id));
    }

}