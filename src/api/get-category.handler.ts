import { inject, injectable } from 'inversify';
import { GetCategoryCommandHandler } from '../command/getcategory/get-category.command-handler';
import { NextFunction, Request, Response } from 'express';
import { GetCategoryCommand } from '../command/getcategory/get-category.command';
import { GetCategoryCommandResult } from '../command/getcategory/get-category.command-result';


@injectable()
export class GetCategoryHandler {

    constructor(@inject(GetCategoryCommandHandler) private getCategoryCommandHandler: GetCategoryCommandHandler) {
    }

    handle(req: Request, res: Response, next: NextFunction): void {
        const getCategoryCommand: GetCategoryCommand = new GetCategoryCommand(req.params.id);

        this.getCategoryCommandHandler
            .handle(getCategoryCommand)
            .then((results: GetCategoryCommandResult) => res.json(results))
            .catch((error: any) => next(error));
    }
}