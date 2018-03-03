import { inject, injectable } from 'inversify';
import { Router } from 'express';
import { CreateCategoryHandler } from './create-category.handler';
import { GetCategoryHandler } from './get-category.handler';


@injectable()
export class ApiRouter {

    constructor(@inject(CreateCategoryHandler) private createCategoryHandler: CreateCategoryHandler,
                @inject(GetCategoryHandler) private getCategoryHandler: GetCategoryHandler) {
    }

    createRouter(): Router {
        const router: Router = Router();

        router.post('/', this.createCategoryHandler.handle.bind(this.createCategoryHandler));
        router.get('/:id', this.getCategoryHandler.handle.bind(this.getCategoryHandler));

        return router;
    }
}