import {Schema, model} from "mongoose";

const InterestSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    image: {
        type: Object,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default model('Interest', InterestSchema);
