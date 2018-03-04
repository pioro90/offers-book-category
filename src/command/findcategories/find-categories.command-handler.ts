import { CommandHandler } from 'offers-book-cqrs/src/command/command-handler';
import { FindCategoriesCommand } from './find-categories.command';
import { FindCategoriesCommandResult } from './find-categories.command-result';
import { inject, injectable } from 'inversify';
import { CategoryRepository } from '../../domain/category.repository';
import { ICategory } from '../../domain/category';

@injectable()
export class FindCategoriesCommandHandler implements CommandHandler<FindCategoriesCommand, Promise<FindCategoriesCommandResult>> {

    constructor(@inject(CategoryRepository) private categoryRepository: CategoryRepository) {
    }

    async handle(command: FindCategoriesCommand): Promise<FindCategoriesCommandResult> {
        const categories: ICategory[] = await this.categoryRepository.find(command);

        return new FindCategoriesCommandResult(categories);
    }
}