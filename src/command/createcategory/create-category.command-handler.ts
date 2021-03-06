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

    async handle(command: CreateCategoryCommand): Promise<CreateCategoryCommandResult> {
        const category: ICategory = await this.categoryRepository.create(command);

        return new CreateCategoryCommandResult(category._id);
    }

}