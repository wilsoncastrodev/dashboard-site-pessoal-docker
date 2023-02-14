import {Schema, model} from "mongoose";

const CategoryKnowledgeSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default model('CategoryKnowledge', CategoryKnowledgeSchema);
