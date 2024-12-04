const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Função para gerar o token JWT
function generateToken(user) {
  return jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
}

// Registro de usuário
const register = async (req, res) => {
  console.log('Rota /register foi chamada', req.body); // Log para depuração
  const { email, password, name, picture } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos!' });
  }

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Este email já está em uso.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { email, password: hashedPassword, name, picture };

    await User.create(newUser);
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar o usuário.' });
  }
};

// Login de usuário
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos!' });
  }

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Senha incorreta.' });
    }

    const token = generateToken(user);
    res.status(200).json({ message: 'Login bem-sucedido!', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao processar login.' });
  }
};

module.exports = { register, login };
