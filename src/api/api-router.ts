import { inject, injectable } from 'inversify';
import { Router } from 'express';
import { CreateCategoryHandler } from './create-category.handler';
import { GetCategoryHandler } from './get-category.handler';
import { FindCategoriesHandler } from './find-categories.handler';


@injectable()
export class ApiRouter {

    constructor(@inject(CreateCategoryHandler) private createCategoryHandler: CreateCategoryHandler,
                @inject(GetCategoryHandler) private getCategoryHandler: GetCategoryHandler,
                @inject(FindCategoriesHandler) private findCategoriesHandler: FindCategoriesHandler) {
    }

    createRouter(): Router {
        const router: Router = Router();

        router.post('/', this.createCategoryHandler.handle.bind(this.createCategoryHandler));
        router.get('/:id', this.getCategoryHandler.handle.bind(this.getCategoryHandler));
        router.get('/', this.findCategoriesHandler.handle.bind(this.findCategoriesHandler));

        return router;
    }
}