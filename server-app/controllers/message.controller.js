import Message from "../models/message.model.js";
import Profile from "../models/profile.model.js";
import { messageValidation } from "../validations/message.validation.js";

const getAllMessage = async (req, res) => {
    let messages = await Message.find().sort({"created_at": -1});

    if (!messages.length) {
        return res.status(404).send({ message: "Não há nenhuma Mensagem cadastrada." });
    }

    return res.status(200).send(messages);
};

const getAllProfileMessages = async (req, res) => {
    const profile = await Profile.findById(req.params.profileId).populate({ path: 'messages', options: { sort: { 'created_at': -1 } } });
    const messages = profile.messages;

    if (!messages.length) {
        return res.status(404).send({ message: "Não há nenhuma Mensagem cadastrada." });
    }

    return res.status(200).send(messages);
};

const getMessageById = async (req, res) => {
    let message = await Message.findById(req.params.id);

    if (!message) {
        return res.status(404).send({ message: "Mensagem não encontrada" });
    }

    return res.status(200).send(message);
};

const createMessage = async (req, res) => {
    const errors = messageValidation(req.body);

    if(errors) {
        return res.status(422).send(errors);
    }

    try {
        const message = await Message.create(req.body);

        await Profile.updateOne({ _id: req.body.profile._id }, { $push: { messages: message._id } })

        return res.status(201).send({
            message: "Mensagem criada com sucesso",
            message
        });
    } catch(error) {
        if(error.code === 11000) {
            res.status(422).send({ content: "Mensagem já cadastrada" });
        }
    }
};

const deleteMessage = async (req, res) => {
    await Message.findByIdAndDelete(req.params.id);

    return res.status(200).send({
        message: "Mensagem excluída com sucesso",
    });
};

export default {
    getAllMessage,
    getAllProfileMessages,
    getMessageById,
    createMessage,
    deleteMessage
}
