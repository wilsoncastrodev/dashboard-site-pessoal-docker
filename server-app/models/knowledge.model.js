import {Schema, model} from "mongoose";

const KnowledgeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    categoryKnowledge: {
        type: Schema.Types.ObjectId,
        ref: 'CategoryKnowledge'
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default model('Knowledge', KnowledgeSchema);
