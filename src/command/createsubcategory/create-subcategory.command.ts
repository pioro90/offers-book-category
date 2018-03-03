import { Command } from 'offers-book-cqrs/src/command/command';

export class CreateSubcategoryCommand implements Command {
    parentId: string;
    name: string;
    description: string;

    constructor(parentId: string, name: string, description: string) {
        this.parentId = parentId;
        this.name = name;
        this.description = description;
    }
}