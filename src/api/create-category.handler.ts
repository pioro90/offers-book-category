import { inject, injectable } from 'inversify';
import * as httpStatus from 'http-status';
import { CreateCategoryCommandHandler } from '../command/createcategory/create-category.command-handler';
import { NextFunction, Request, Response } from 'express';
import { CreateCategoryCommand } from '../command/createcategory/create-category.command';
import { CreateCategoryCommandResult } from '../command/createcategory/create-category.command-result';


@injectable()
export class CreateCategoryHandler {
    constructor(@inject(CreateCategoryCommandHandler) private commandHandler: CreateCategoryCommandHandler) {
    }

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const command: CreateCategoryCommand = req.body;
            const result: CreateCategoryCommandResult = await this.commandHandler.handle(command);

            res.status(httpStatus.CREATED).json(result);
        } catch (e) {
            next(e);
        }
    }
}