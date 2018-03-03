import { inject, injectable } from 'inversify';
import { Router } from 'express';
import { CreateCategoryHandler } from './create-category.handler';


@injectable()
export class ApiRouter {

    constructor(@inject(CreateCategoryHandler) private createCategoryHandler: CreateCategoryHandler) {
    }

    createRouter(): Router {
        const router: Router = Router();

        router.post('/', this.createCategoryHandler.handle.bind(this.createCategoryHandler));

        return router;
    }
}