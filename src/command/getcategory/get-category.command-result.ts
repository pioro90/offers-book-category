export class GetCategoryCommandResult {
    name: string;
    description: string;
    parent?: string;
    ancestors?: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;


    constructor(name: string, description: string, parent: string, ancestors: string[], createdAt: Date, updatedAt: Date, deletedAt: Date) {
        this.name = name;
        this.description = description;
        this.parent = parent;
        this.ancestors = ancestors;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}