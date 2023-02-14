
import Education from "../models/education.model.js";
import Profile from "../models/profile.model.js";
import { educationValidation } from "../validations/education.validation.js";

const getAllEducation = async (req, res) => {
    let education = await Education.find().sort({"created_at": -1});

    if (!education.length) {
        return res.status(404).send({ message: "Não há nenhuma Educação cadastrada." });
    }

    return res.status(200).send(education);
};

const getAllProfileEducation = async (req, res) => {
    const profile = await Profile.findById(req.params.profileId).populate({ path: 'education', options: { sort: { 'created_at': -1 } } });
    const education = profile.education;

    if (!education.length) {
        return res.status(404).send({ message: "Não há nenhuma Educação cadastrada." });
    }

    return res.status(200).send(education);
};

const getEducationById = async (req, res) => {
    let education = await Education.findById(req.params.id);

    if (!education) {
        return res.status(404).send({ message: "Educação não encontrada" });
    }

    return res.status(200).send(education);
};

const createEducation = async (req, res) => {
    const errors = educationValidation(req.body);

    if(errors) {
        return res.status(422).send(errors);
    }

    const education = await Education.create(req.body);

    await Profile.updateOne({ _id: req.body.profile._id }, { $push: {education: education._id} })

    return res.status(200).send({
        message: "Educação criada com sucesso",
        education
    });
};

const updateEducation = async (req, res) => {
    const errors = educationValidation(req.body);

    if (errors) {
        return res.status(422).send(errors);
    }

    const education = await Education.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });

    return res.status(200).send({
        message: "Educação atualizada com sucesso",
        education
    });
};

const deleteEducation = async (req, res) => {
    await Education.findByIdAndDelete(req.params.id);

    return res.status(200).send({
        message: "Educação excluída com sucesso",
    });
};

export default {
    getAllEducation,
    getAllProfileEducation,
    getEducationById,
    createEducation,
    updateEducation,
    deleteEducation
}
