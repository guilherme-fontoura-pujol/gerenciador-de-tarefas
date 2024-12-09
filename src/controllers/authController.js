const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function generateToken(user) {
  return jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
}

const register = async (req, res) => {
  try {
    const { email, password, name, picture } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos!' });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Este email já está em uso.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { email, password: hashedPassword, name, picture };

    await User.create(newUser);
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.error('Erro na rota de registro:', err);
    res.status(500).json({ error: 'Erro ao criar o usuário.' });
  }
};

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

const listUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ error: 'Erro ao listar usuários.' });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, picture } = req.body;

  if (!name && !picture) {
    return res.status(400).json({ error: 'Nenhum dado para atualizar foi enviado.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await User.update(userId, { name, picture });
    res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await User.delete(userId);
    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    res.status(500).json({ error: 'Erro ao deletar usuário.' });
  }
};

module.exports = { register, login, listUsers, updateUser, deleteUser };
