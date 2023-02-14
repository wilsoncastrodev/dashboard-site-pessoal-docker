import { Schema, model } from "mongoose";

const EducationSchema = new Schema({
    institution: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    specialization: {
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
    status: {
        type: String,
        enum: ['Superior Completo', 'Superior Incompleto']
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default model('Education', EducationSchema);
