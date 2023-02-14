import { Schema, model } from "mongoose";

const ExperienceSchema = new Schema({
    position: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    from: {
        type: Date,
        required: true,
    },
    to: {
        type: Date,
    },
    current: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
    },
    technologies: {
        type: [String]
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default model('Experience', ExperienceSchema);
