//this doesn't exist - just an example!
const Book = require('../model/database').models.Book;

const _get = async (req, res, next) => {
    try {
        const result = await Book.findAll();
        return res.status(200).send(result);
    } catch (error) {
        next(err);
    }
}

const _create = async (req, res, next) => {
    try {
        const result = await Book.create(req.body);
        return res.status(201).send(result);
    } catch (err) {
        next(err);
    }
}

const _update = async (req, res, next) => {
    try {
        const result = await Follow.update(req.body, {
            where: { id: req.params.id },
            returning: true,
            plain: true,
        });
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
}

const _delete = async (req, res, next) => {
    try {
        await Book.destroy({
            where: { id: req.params.id },
        });
        return res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    _get,
    _create,
    _update,
    _delete,
}