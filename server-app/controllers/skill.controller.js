
import Skill from "../models/skill.model.js";
import Profile from "../models/profile.model.js";
import { skillValidation } from "../validations/skill.validation.js";

const getAllSkill = async (req, res) => {
    let skills = await Skill.find().populate('categorySkill').sort({"created_at": -1});

    if (!skills.length) {
        return res.status(404).send({ message: "Não há nenhuma Habilidade cadastrada." });
    }

    return res.status(200).send(skills);
};

const getAllProfileSkills = async (req, res) => {
    const profile = await Profile.findById(req.params.profileId).populate({ path: 'skills', options: { sort: { 'created_at': -1 } } });
    const skills = profile.skills;

    if (!skills.length) {
        return res.status(404).send({ message: "Não há nenhuma Habilidade cadastrada." });
    }

    return res.status(200).send(skills);
};

const getSkillById = async (req, res) => {
    let skill = await Skill.findById(req.params.id);

    if (!skill) {
        return res.status(404).send({ message: "Habilidade não encontrada" });
    }

    return res.status(200).send(skill);
};

const createSkill = async (req, res) => {
    const errors = skillValidation(req.body);

    if(errors) {
        return res.status(422).send(errors);
    }

    try {
        const skill = await Skill.create(req.body);

        await Profile.updateOne({ _id: req.body.profile._id }, { $push: { skills: skill._id } })

        return res.status(201).send({
            message: "Habilidade criada com sucesso",
            skill
        });
    } catch(error) {
        if(error.code === 11000) {
            res.status(422).send({ content: "Habilidade já cadastrada" });
        }
    }
};

const updateSkill = async (req, res) => {
    const errors = skillValidation(req.body);

    if(errors) {
        return res.status(422).send(errors);
    }

    try {
        const skill = await Skill.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });

        return res.status(200).send({
            message: "Habilidade atualizada com sucesso",
            skill
        });
    } catch(error) {
        if(error.code === 11000) {
            res.status(422).send({ content: "Habilidade já cadastrada" });
        }
    }
};

const deleteSkill = async (req, res) => {
    await Skill.findByIdAndDelete(req.params.id);

    return res.status(200).send({
        message: "Habilidade excluída com sucesso",
    });
};

export default {
    getAllSkill,
    getAllProfileSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill
}
