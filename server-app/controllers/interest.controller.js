
import Interest from "../models/interest.model.js";
import Profile from "../models/profile.model.js";
import { interestValidation } from "../validations/interest.validation.js";
import { deleteFile } from '../utils/uploads.js';

const getAllInterest = async (req, res) => {
    let interest = await Interest.find().sort({"created_at": -1});

    if (!interest.length) {
        return res.status(404).send({ message: "Não há nenhum Interesse cadastrado." });
    }

    return res.status(200).send(interest);
};

const getAllProfileInterests = async (req, res) => {
    const profile = await Profile.findById(req.params.profileId).populate({ path: 'interests', options: { sort: { 'created_at': -1 } } });
    const interests = profile.interests;

    if (!interests.length) {
        return res.status(404).send({ message: "Não há nenhum Interesse cadastrado." });
    }

    return res.status(200).send(interests);
};

const getInterestById = async (req, res) => {
    let interest = await Interest.findById(req.params.id);

    if (!interest) {
        return res.status(404).send({ message: "Interesse não encontrado" });
    }

    return res.status(200).send(interest);
};

const createInterest = async (req, res) => {
    req.body.image = req.file;

    const errors = interestValidation(req.body);

    if(errors) {
        return res.status(422).send(errors);
    }

    try {
        const interest = await Interest.create(req.body);

        await Profile.updateOne({ _id: req.body.profile._id }, { $push: { interests: interest._id } })

        return res.status(201).send({
            message: "Interesse criado com sucesso",
            interest
        });
    } catch(error) {
        if(error.code === 11000) {
            res.status(422).send({ content: "Interesse já cadastrado" });
        }
    }
};

const updateInterest = async (req, res) => {
    req.body.image = req.file;

    const errors = interestValidation(req.body);

    if(errors) {
        return res.status(422).send(errors);
    }

    const file = await Interest.findById(req.params.id).select('-_id image.path');

    deleteFile(file.image.path);

    try {
        const interest = await Interest.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });

        return res.status(200).send({
            message: "Interesse atualizado com sucesso",
            interest
        });
    } catch(error) {
        if(error.code === 11000) {
            res.status(422).send({ content: "Interesse já cadastrado" });
        }
    }
};

const deleteInterest = async (req, res) => {
    await Interest.findByIdAndDelete(req.params.id);

    return res.status(200).send({
        message: "Interesse excluído com sucesso",
    });
};

export default {
    getAllInterest,
    getAllProfileInterests,
    getInterestById,
    createInterest,
    updateInterest,
    deleteInterest
}
