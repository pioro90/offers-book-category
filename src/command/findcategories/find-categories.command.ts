import { Command } from 'offers-book-cqrs/src/command/command';

export class FindCategoriesCommand implements Command {
    name?: string;
    description?: string;
    parent?: string;
    ancestor?: string;
    start: number;
    limit: number;

    constructor(name: string, description: string, parent: string, ancestor: string, start: number, limit: number) {
        this.name = name;
        this.description = description;
        this.parent = parent;
        this.ancestor = ancestor;
        this.start = start;
        this.limit = limit;
    }
}