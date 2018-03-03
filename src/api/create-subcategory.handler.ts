import { inject, injectable } from 'inversify';
import * as httpStatus from 'http-status';
import { CreateSubcategoryCommandHandler } from '../command/createsubcategory/create-subcategory.command-handler';
import { NextFunction, Request, Response } from 'express';
import { CreateSubcategoryCommand } from '../command/createsubcategory/create-subcategory.command';
import { CreateSubcategoryCommandResult } from '../command/createsubcategory/create-subcategory.command-result';


@injectable()
export class CreateSubcategoryHandler {

    constructor(@inject(CreateSubcategoryCommandHandler) private createSubcategoryCommandHandler: CreateSubcategoryCommandHandler) {
    }

    handle(req: Request, res: Response, next: NextFunction): void {
        const command: CreateSubcategoryCommand = new CreateSubcategoryCommand(
            req.params.id,
            req.body.name,
            req.body.description
        );

        this.createSubcategoryCommandHandler
            .handle(command)
            .then((results: CreateSubcategoryCommandResult) => res.status(httpStatus.CREATED).json(results))
            .catch((error: any) => next(error));
    }

}