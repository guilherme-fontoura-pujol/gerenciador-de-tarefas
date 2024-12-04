const jwt = require('jsonwebtoken');

// Middleware para verificar o token JWT
const ensureAuthenticated = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Token não fornecido.' });
  }

  // Remover o "Bearer" do token
  const tokenWithoutBearer = token.split(' ')[1];

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido.' });
    }

    req.user = decoded; // Coloca as informações do usuário no request
    next();  // Chama a próxima função/middleware
  });
};

module.exports = ensureAuthenticated;
