const jwt = require('jsonwebtoken');

exports.authorization = async (req, res, next) => {
    const { user_id } = req.params;
    const { email } = jwt.verify(user_id, process.env.SECRET_KEY);

    if (email) {
        res.locals.email = email;
    }
    next();
};
