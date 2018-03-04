import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { FindCategoriesCommandHandler } from '../command/findcategories/find-categories.command-handler';
import { FindCategoriesCommand } from '../command/findcategories/find-categories.command';
import { FindCategoriesCommandResult } from '../command/findcategories/find-categories.command-result';

@injectable()
export class FindCategoriesHandler {

    constructor(@inject(FindCategoriesCommandHandler) private commandHandler: FindCategoriesCommandHandler) {
    }

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const command: FindCategoriesCommand = new FindCategoriesCommand(
                req.query.name,
                req.query.description,
                req.query.parent,
                req.query.ancestors,
                parseInt(req.query.start),
                parseInt(req.query.limit)
            );

            const result: FindCategoriesCommandResult = await this.commandHandler.handle(command);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

}