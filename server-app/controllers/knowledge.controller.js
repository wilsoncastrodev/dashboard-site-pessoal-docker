
import Knowledge from "../models/knowledge.model.js";
import Profile from "../models/profile.model.js";
import { knowledgeValidation } from "../validations/knowledge.validation.js";

const getAllKnowledge = async (req, res) => {
    let knowledge = await Knowledge.find().populate('categoryKnowledge').sort({"created_at": -1});

    if (!knowledge.length) {
        return res.status(404).send({ message: "Não há nenhum Conhecimento cadastrado." });
    }

    return res.status(200).send(knowledge);
};

const getAllProfileKnowledge = async (req, res) => {
    const profile = await Profile.findById(req.params.profileId).populate({ path: 'knowledge', options: { sort: { 'created_at': -1 } } });
    const knowledge = profile.knowledge;

    if (!knowledge.length) {
        return res.status(404).send({ message: "Não há nenhum Conhecimento cadastrado." });
    }

    return res.status(200).send(knowledge);
};

const getKnowledgeById = async (req, res) => {
    let knowledge = await Knowledge.findById(req.params.id);

    if (!knowledge) {
        return res.status(404).send({ message: "Conhecimento não encontrado" });
    }

    return res.status(200).send(knowledge);
};

const createKnowledge = async (req, res) => {
    const errors = knowledgeValidation(req.body);

    if(errors) {
        return res.status(422).send(errors);
    }

    try {
        const knowledge = await Knowledge.create(req.body);

        await Profile.updateOne({ _id: req.body.profile._id }, { $push: { knowledge: knowledge._id } })

        return res.status(201).send({
            message: "Conhecimento criada com sucesso",
            knowledge
        });
    } catch(error) {
        if(error.code === 11000) {
            res.status(422).send({ content: "Conhecimento já cadastrado" });
        }
    }
};

const updateKnowledge = async (req, res) => {
    const errors = knowledgeValidation(req.body);

    if(errors) {
        return res.status(422).send(errors);
    }

    try {
        const knowledge = await Knowledge.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });

        return res.status(200).send({
            message: "Conhecimento atualizado com sucesso",
            knowledge
        });
    } catch(error) {
        if(error.code === 11000) {
            res.status(422).send({ content: "Conhecimento já cadastrado" });
        }
    }
};

const deleteKnowledge = async (req, res) => {
    await Knowledge.findByIdAndDelete(req.params.id);

    return res.status(200).send({
        message: "Conhecimento excluído com sucesso",
    });
};

export default {
    getAllKnowledge,
    getAllProfileKnowledge,
    getKnowledgeById,
    createKnowledge,
    updateKnowledge,
    deleteKnowledge
}
