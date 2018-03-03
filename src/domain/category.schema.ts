import { Schema } from 'mongoose';

export const CategorySchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    parent: Schema.Types.ObjectId,
    ancestors: [Schema.Types.ObjectId],
    deletedAt: Date
}, {
    timestamps: true,
    strict: true,
    collection: 'categories'
});