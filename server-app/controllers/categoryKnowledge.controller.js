
import CategoryKnowledge from "../models/categoryKnowledge.model.js";
import { categoryKnowledgeValidation } from "../validations/categoryKnowledge.validation.js";

const getAllCategoryKnowledge = async (req, res) => {
    let categoryKnowledge = await CategoryKnowledge.find().sort({"created_at": -1});

    if (!categoryKnowledge.length) {
        return res.status(404).send({ message: "Não há nenhuma Categoria cadastrada." });
    }

    return res.status(200).send(categoryKnowledge);
};

const getCategoryKnowledgeById = async (req, res) => {
    let categoryKnowledge = await CategoryKnowledge.findById(req.params.id);

    if (!categoryKnowledge) {
        return res.status(404).send({ message: "Categoria não encontrada" });
    }

    return res.status(200).send(categoryKnowledge);
};

const createCategoryKnowledge = async (req, res) => {
    const errors = categoryKnowledgeValidation(req.body);

    if(errors) {
        return res.status(422).send(errors);
    }

    try {
        const categoryKnowledge = await CategoryKnowledge.create(req.body);

        return res.status(201).send({
            message: "Categoria criada com sucesso",
            categoryKnowledge
        });
    } catch(error) {
        if(error.code === 11000) {
            res.status(422).send({ name: "Categoria já cadastrada" });
        }
    }
};

const updateCategoryKnowledge = async (req, res) => {
    const errors = categoryKnowledgeValidation(req.body);

    if(errors) {
        return res.status(422).send(errors);
    }

    try {
        const categoryKnowledge = await CategoryKnowledge.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });

        return res.status(200).send({
            message: "Categoria atualizada com sucesso",
            categoryKnowledge
        });
    } catch(error) {
        if(error.code === 11000) {
            res.status(422).send({ name: "Categoria já cadastrada" });
        }
    }
};

const deleteCategoryKnowledge = async (req, res) => {
    await CategoryKnowledge.findByIdAndDelete(req.params.id);

    return res.status(200).send({
        message: "Categoria excluída com sucesso",
    });
};

export default {
    getAllCategoryKnowledge,
    getCategoryKnowledgeById,
    createCategoryKnowledge,
    updateCategoryKnowledge,
    deleteCategoryKnowledge
}
