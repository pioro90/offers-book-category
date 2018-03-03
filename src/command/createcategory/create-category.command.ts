import { Command } from 'offers-book-cqrs/src/command/command';

export class CreateCategoryCommand implements Command {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}