-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 10/12/2024 às 04:19
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `tarefas`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tarefas`
--

CREATE TABLE `tarefas` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `prioridade` enum('baixa','media','alta') DEFAULT 'media',
  `status` enum('pendente','concluida') DEFAULT 'pendente',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tarefas`
--

INSERT INTO `tarefas` (`id`, `user_id`, `title`, `description`, `prioridade`, `status`, `created_at`) VALUES
(3, 5, 'Minha segunda tarefa', 'Descrição da tarefa', 'alta', 'pendente', '2024-12-06 19:28:02'),
(4, 5, 'Título atualizado', 'Descrição atualizada', 'media', 'pendente', '2024-12-06 20:04:35'),
(5, 6, 'Tarefa 1', 'Descrição da tarefa 1', 'media', '', '2024-12-06 20:47:10'),
(6, 6, 'Tarefa 2', 'Descrição da tarefa 2', 'media', 'pendente', '2024-12-06 20:47:10');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `picture`, `created_at`) VALUES
(1, 'usuario@email.com', '$2a$10$efW9TDIh8hStyVe1a.aikuEym3H15cpg4iE4xEedhCA9wZz0MBfLO', 'Usuário Teste', 'https://example.com/profile.png', '2024-12-03 19:34:37'),
(2, 'teste@example.com', '$2a$10$VSnN2q68RdcJsOputAoXFOSIm58W8Ux33V/4iKqtm3fd2IZQ8qSHu', 'Teste', NULL, '2024-12-04 19:46:00'),
(3, 'exemplo@dominio.com', '$2a$10$ziunerwAqDckaUE3JSufO.ObHjwU5nLq909CN394XlerYbUVkuf0C', 'Nome de Exemplo', 'url_da_imagem', '2024-12-06 18:05:17'),
(5, 'novousuario@example.com', '$2a$10$b0vrP7YZk7L7Gnf9hMKwVusLA2TSbDAMHKoqnbyTDGEd6WTKH1k1y', 'Novo Usuário', 'https://example.com/imagem.png', '2024-12-06 19:10:25'),
(6, 'outrousuario@example.com', '$2a$10$CNtf3vriALA6c2DJo6PQ0e1MC.xMN1WZ4d/1lexD5FGOeRCPODAJq', 'Novo Usuário', 'https://example.com/imagem.png', '2024-12-06 20:17:17');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tarefas`
--
ALTER TABLE `tarefas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tarefas`
--
ALTER TABLE `tarefas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tarefas`
--
ALTER TABLE `tarefas`
  ADD CONSTRAINT `tarefas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
