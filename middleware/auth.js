const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

        if (!token) {
            throw new Error('No token provided');
        }

        const decodedToken = jwt.verify(token, 'RANDOM_SECRET_KEY');
        const userId = decodedToken.userId;
        req.auth = { userId: userId };
        next();
    } catch (error) {
        res.status(401).json({ error: 'Requête non authentifiée !' });
    }
};