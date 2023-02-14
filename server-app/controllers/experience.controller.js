
import Experience from "../models/experience.model.js";
import Profile from "../models/profile.model.js";
import { experienceValidation } from "../validations/experience.validation.js";

const getAllExperience = async (req, res) => {
    let experiences = await Experience.find().sort({"created_at": -1});

    if (!experiences.length) {
        return res.status(404).send({ message: "Não há nenhuma Experiência cadastrada." });
    }

    return res.status(200).send(experiences);
};

const getAllProfileExperiences = async (req, res) => {
    const profile = await Profile.findById(req.params.profileId).populate({ path: 'experiences', options: { sort: { 'created_at': -1 } } });
    const experiences = profile.experiences;

    if (!experiences.length) {
        return res.status(404).send({ message: "Não há nenhuma Experiência cadastrada." });
    }

    return res.status(200).send(experiences);
};

const getExperienceById = async (req, res) => {
    let experience = await Experience.findById(req.params.id);

    if (!experience) {
        return res.status(404).send({ message: "Experiência não encontrada" });
    }

    return res.status(200).send(experience);
};

const createExperience = async (req, res) => {
    const errors = experienceValidation(req.body);

    if(errors) {
        return res.status(422).send(errors);
    }

    const experience = await Experience.create(req.body);

    await Profile.updateOne({ _id: req.body.profile._id }, { $push: {experiences: experience._id} })

    return res.status(200).send({
        message: "Experiência criada com sucesso",
        experience
    });
};

const updateExperience = async (req, res) => {
    const errors = experienceValidation(req.body);

    if (errors) {
        return res.status(422).send(errors);
    }

    const experience = await Experience.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });

    return res.status(200).send({
        message: "Experiência atualizada com sucesso",
        experience
    });
};

const deleteExperience = async (req, res) => {
    await Experience.findByIdAndDelete(req.params.id);

    return res.status(200).send({
        message: "Experiência excluída com sucesso",
    });
};

export default {
    getAllExperience,
    getAllProfileExperiences,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience
}
