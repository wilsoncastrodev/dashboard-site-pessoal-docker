
import CategorySkill from "../models/categorySkill.model.js";
import { categorySkillValidation } from "../validations/categorySkill.validation.js";

const getAllCategorySkill = async (req, res) => {
    let categorySkill = await CategorySkill.find().sort({"created_at": -1});

    if (!categorySkill.length) {
        return res.status(404).send({ message: "Não há nenhuma Categoria cadastrada." });
    }

    return res.status(200).send(categorySkill);
};

const getCategorySkillById = async (req, res) => {
    let categorySkill = await CategorySkill.findById(req.params.id);

    if (!categorySkill) {
        return res.status(404).send({ message: "Categoria não encontrada" });
    }

    return res.status(200).send(categorySkill);
};

const createCategorySkill = async (req, res) => {
    const errors = categorySkillValidation(req.body);

    if(errors) {
        return res.status(422).send(errors);
    }

    try {
        const categorySkill = await CategorySkill.create(req.body);

        return res.status(201).send({
            message: "Categoria criada com sucesso",
            categorySkill
        });
    } catch(error) {
        if(error.code === 11000) {
            res.status(422).send({ name: "Categoria já cadastrada" });
        }
    }
};

const updateCategorySkill = async (req, res) => {
    const errors = categorySkillValidation(req.body);

    if(errors) {
        return res.status(422).send(errors);
    }

    try {
        const categorySkill = await CategorySkill.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });

        return res.status(200).send({
            message: "Categoria atualizada com sucesso",
            categorySkill
        });
    } catch(error) {
        if(error.code === 11000) {
            res.status(422).send({ name: "Categoria já cadastrada" });
        }
    }
};

const deleteCategorySkill = async (req, res) => {
    await CategorySkill.findByIdAndDelete(req.params.id);

    return res.status(200).send({
        message: "Categoria excluída com sucesso",
    });
};

export default {
    getAllCategorySkill,
    getCategorySkillById,
    createCategorySkill,
    updateCategorySkill,
    deleteCategorySkill
}
