
import SourcesKnowledge from "../models/sourcesKnowledge.model.js";
import Profile from "../models/profile.model.js";
import { sourcesKnowledgeValidation } from "../validations/sourcesKnowledge.validation.js";
import { deleteFile } from '../utils/uploads.js';

const getAllSourcesKnowledge = async (req, res) => {
    let sourcesKnowledge = await SourcesKnowledge.find().sort({"created_at": -1});

    if (!sourcesKnowledge.length) {
        return res.status(404).send({ message: "Não há nenhuma Fonte de Conhecimento cadastrada." });
    }

    return res.status(200).send(sourcesKnowledge);
};

const getAllProfileSourcesKnowledge = async (req, res) => {
    const profile = await Profile.findById(req.params.profileId).populate({ path: 'sourcesKnowledge', options: { sort: { 'created_at': -1 } } });
    const sourcesKnowledge = profile.sourcesKnowledge;

    if (!sourcesKnowledge.length) {
        return res.status(404).send({ message: "Não há nenhuma Fonte de Conhecimento cadastrada." });
    }

    return res.status(200).send(sourcesKnowledge);
};

const getSourcesKnowledgeById = async (req, res) => {
    let sourcesKnowledge = await SourcesKnowledge.findById(req.params.id);

    if (!sourcesKnowledge) {
        return res.status(404).send({ message: "Fonte de Conhecimento não encontrada" });
    }

    return res.status(200).send(sourcesKnowledge);
};

const createSourcesKnowledge = async (req, res) => {
    req.body.image = req.file;

    const errors = sourcesKnowledgeValidation(req.body);

    if(errors) {
        return res.status(422).send(errors);
    }

    try {
        const sourcesKnowledge = await SourcesKnowledge.create(req.body);

        await Profile.updateOne({ _id: req.body.profile._id }, { $push: { sourcesKnowledges: sourcesKnowledge._id } })

        return res.status(201).send({
            message: "Fonte de Conhecimento criada com sucesso",
            sourcesKnowledge
        });
    } catch(error) {
        if(error.code === 11000) {
            res.status(422).send({ content: "Fonte de Conhecimento já cadastrada" });
        }
    }
};

const updateSourcesKnowledge = async (req, res) => {
    req.body.image = req.file;

    const errors = sourcesKnowledgeValidation(req.body);

    if(errors) {
        return res.status(422).send(errors);
    }

    const file = await SourcesKnowledge.findById(req.params.id).select('-_id image.path');

    deleteFile(file.image.path);

    try {
        const sourcesKnowledge = await SourcesKnowledge.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });

        return res.status(200).send({
            message: "Fonte de Conhecimento atualizada com sucesso",
            sourcesKnowledge
        });
    } catch(error) {
        if(error.code === 11000) {
            res.status(422).send({ content: "Fonte de Conhecimento já cadastrada" });
        }
    }
};

const deleteSourcesKnowledge = async (req, res) => {
    await SourcesKnowledge.findByIdAndDelete(req.params.id);

    return res.status(200).send({
        message: "Fonte de Conhecimento excluída com sucesso",
    });
};

export default {
    getAllSourcesKnowledge,
    getAllProfileSourcesKnowledge,
    getSourcesKnowledgeById,
    createSourcesKnowledge,
    updateSourcesKnowledge,
    deleteSourcesKnowledge
}
