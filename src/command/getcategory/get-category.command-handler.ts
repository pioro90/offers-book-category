import { CommandHandler } from 'offers-book-cqrs/src/command/command-handler';
import { GetCategoryCommand } from './get-category.command';
import { GetCategoryCommandResult } from './get-category.command-result';
import { inject, injectable } from 'inversify';
import { CategoryRepository } from '../../domain/category.repository';
import { ICategory } from '../../domain/category';

@injectable()
export class GetCategoryCommandHandler implements CommandHandler<GetCategoryCommand, Promise<GetCategoryCommandResult>> {

    constructor(@inject(CategoryRepository) private categoryRepository: CategoryRepository) {}

    handle(command: GetCategoryCommand): Promise<GetCategoryCommandResult> {
        return this.categoryRepository.getById(command.id)
            .then((category: ICategory) => {
               return new GetCategoryCommandResult(
                   category.name,
                   category.description,
                   category.parent,
                   category.ancestors,
                   category.createdAt,
                   category.updatedAt,
                   category.deletedAt
               );
            });
    }

}