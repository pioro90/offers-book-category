import { inject, injectable } from 'inversify';
import { CREATED } from 'http-status';
import { CreateCategoryCommandHandler } from '../command/createcategory/create-category.command-handler';
import { NextFunction, Request, Response } from 'express';
import { CreateCategoryCommand } from '../command/createcategory/create-category.command';
import { CreateCategoryCommandResult } from '../command/createcategory/create-category.command-result';


@injectable()
export class CreateCategoryHandler {
    constructor(@inject(CreateCategoryCommandHandler) private createCategoryCommandHandler: CreateCategoryCommandHandler) {
    }

    handle(req: Request, res: Response, next: NextFunction): void {
        const createCategoryCommand: CreateCategoryCommand = req.body;

        this.createCategoryCommandHandler
            .handle(createCategoryCommand)
            .then((results: CreateCategoryCommandResult) => res.status(CREATED).json(results))
            .catch((error: any) => next(error));
    }
}