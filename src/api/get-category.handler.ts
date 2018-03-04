import { inject, injectable } from 'inversify';
import { GetCategoryCommandHandler } from '../command/getcategory/get-category.command-handler';
import { NextFunction, Request, Response } from 'express';
import { GetCategoryCommand } from '../command/getcategory/get-category.command';
import { GetCategoryCommandResult } from '../command/getcategory/get-category.command-result';


@injectable()
export class GetCategoryHandler {

    constructor(@inject(GetCategoryCommandHandler) private commandHandler: GetCategoryCommandHandler) {
    }

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const command: GetCategoryCommand = new GetCategoryCommand(req.params.id);
            const result: GetCategoryCommandResult = await this.commandHandler.handle(command);

            res.json(result);
        } catch (e) {
            next(e);
        }
    }
}