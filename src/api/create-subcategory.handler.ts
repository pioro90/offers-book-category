import { inject, injectable } from 'inversify';
import * as httpStatus from 'http-status';
import { CreateSubcategoryCommandHandler } from '../command/createsubcategory/create-subcategory.command-handler';
import { NextFunction, Request, Response } from 'express';
import { CreateSubcategoryCommand } from '../command/createsubcategory/create-subcategory.command';
import { CreateSubcategoryCommandResult } from '../command/createsubcategory/create-subcategory.command-result';


@injectable()
export class CreateSubcategoryHandler {

    constructor(@inject(CreateSubcategoryCommandHandler) private commandHandler: CreateSubcategoryCommandHandler) {
    }

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const command: CreateSubcategoryCommand = new CreateSubcategoryCommand(
                req.params.id,
                req.body.name,
                req.body.description
            );
            const result: CreateSubcategoryCommandResult = await this.commandHandler.handle(command);
            res.status(httpStatus.CREATED).json(result);
        } catch (e) {
            next(e);
        }
    }

}