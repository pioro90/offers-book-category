import { Command } from 'offers-book-cqrs/src/command/command';

export class GetCategoryCommand implements Command {
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}