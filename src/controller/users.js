const User = require('../model/database').models.User;

const update = async (req, res, next) => {
    try {
        const result = await User.update(req.body, {
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
        await User.destroy({
            where: { id: req.params.id },
        });
        return res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    update,
    _delete,
}