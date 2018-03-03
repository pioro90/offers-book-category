import {Document} from "mongoose";

export interface ICategory extends Document {
    name: string;
    description: string;
    parent?: string;
    ancestors?: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}