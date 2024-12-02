const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'secretkey';

const ensureAuthenticated = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }

        req.user = decoded; // Armazena a informação do usuário no objeto `req`
        next();
    });
};

module.exports = ensureAuthenticated;
