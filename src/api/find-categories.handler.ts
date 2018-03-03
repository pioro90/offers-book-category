import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { FindCategoriesCommandHandler } from '../command/findcategories/find-categories.command-handler';
import { FindCategoriesCommand } from '../command/findcategories/find-categories.command';
import { FindCategoriesCommandResult } from '../command/findcategories/find-categories.command-result';

@injectable()
export class FindCategoriesHandler {

    constructor(@inject(FindCategoriesCommandHandler) private findCategoriesCommandHandler: FindCategoriesCommandHandler) {
    }

    handle(req: Request, res: Response, next: NextFunction): void {
        const findCategoriesCommand: FindCategoriesCommand = new FindCategoriesCommand(
            req.query.name,
            req.query.description,
            req.query.parent,
            req.query.ancestors,
            parseInt(req.query.start),
            parseInt(req.query.limit)
        );

        this.findCategoriesCommandHandler
            .handle(findCategoriesCommand)
            .then((results: FindCategoriesCommandResult) => res.json(results))
            .catch((error: any) => next(error))
    }

}