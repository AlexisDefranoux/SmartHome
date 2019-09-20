-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 13 juin 2018 à 10:48
-- Version du serveur :  5.7.21
-- Version de PHP :  5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `smart_home`
--

-- --------------------------------------------------------

--
-- Structure de la table `consigne`
--

DROP TABLE IF EXISTS `consigne`;
CREATE TABLE IF NOT EXISTS `consigne` (
  `idPlace` int(11) NOT NULL,
  `temperature` float NOT NULL DEFAULT '20',
  PRIMARY KEY (`idPlace`,`temperature`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `consigne`
--

INSERT INTO `consigne` (`idPlace`, `temperature`) VALUES
(41, 20),
(42, 20),
(43, 20),
(44, 20),
(45, 20),
(46, 21),
(47, 20),
(48, 20),
(49, 20),
(50, 20),
(51, 20);

-- --------------------------------------------------------

--
-- Structure de la table `mishap`
--

DROP TABLE IF EXISTS `mishap`;
CREATE TABLE IF NOT EXISTS `mishap` (
  `idMishap` int(11) NOT NULL AUTO_INCREMENT,
  `description` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `idPlace` int(11) DEFAULT NULL,
  `createDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idSeverity` int(11) NOT NULL,
  `idState` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `resolveDate` datetime DEFAULT NULL,
  `mishapDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idMode` int(11) DEFAULT NULL,
  PRIMARY KEY (`idMishap`),
  KEY `idUser` (`idUser`),
  KEY `idPlace` (`idPlace`),
  KEY `idEmergency` (`idSeverity`),
  KEY `idState` (`idState`),
  KEY `idMode` (`idMode`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `mishap`
--

INSERT INTO `mishap` (`idMishap`, `description`, `idPlace`, `createDate`, `idSeverity`, `idState`, `idUser`, `resolveDate`, `mishapDate`, `idMode`) VALUES
(6, 'It\'s a classic mishap', 41, '2018-06-13 09:34:00', 2, 1, 1, '1970-01-01 00:00:00', '2018-06-13 09:34:00', NULL),
(7, 'The vacation mode is activated.', 52, '2018-06-13 09:36:49', 4, 1, 1, '2018-06-17 09:36:00', '2018-06-13 09:36:49', 1);

-- --------------------------------------------------------

--
-- Structure de la table `mode`
--

DROP TABLE IF EXISTS `mode`;
CREATE TABLE IF NOT EXISTS `mode` (
  `idMode` int(11) NOT NULL AUTO_INCREMENT,
  `tMin` float NOT NULL,
  `tMax` float NOT NULL,
  `label` varchar(255) NOT NULL,
  PRIMARY KEY (`idMode`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `mode`
--

INSERT INTO `mode` (`idMode`, `tMin`, `tMax`, `label`) VALUES
(1, 12, 20, 'Holidays');

-- --------------------------------------------------------

--
-- Structure de la table `place`
--

DROP TABLE IF EXISTS `place`;
CREATE TABLE IF NOT EXISTS `place` (
  `idPlace` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `state` int(11) NOT NULL DEFAULT '1',
  `label` varchar(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idPlace`),
  UNIQUE KEY `placeName` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `place`
--

INSERT INTO `place` (`idPlace`, `name`, `state`, `label`) VALUES
(41, 'Living room', 1, 'A'),
(42, 'Kitchen', 1, 'D'),
(43, 'Entrance hall', 1, 'E'),
(44, 'Bedroom corridor', 1, 'G'),
(45, 'Children bedroom', 1, 'H'),
(46, 'Bathroom', 1, 'I'),
(47, 'Single bedroom', 1, 'J'),
(48, 'Private bathroom	', 1, 'K'),
(49, 'Couple bedroom	', 1, 'L'),
(50, 'Laundry room', 1, 'M'),
(51, 'Home office', 1, 'N'),
(52, 'All the house', 1, '0');

-- --------------------------------------------------------

--
-- Structure de la table `place_owner`
--

DROP TABLE IF EXISTS `place_owner`;
CREATE TABLE IF NOT EXISTS `place_owner` (
  `idUser` int(11) NOT NULL,
  `idPlace` int(11) NOT NULL,
  PRIMARY KEY (`idUser`,`idPlace`),
  KEY `idPlace` (`idPlace`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `recipient`
--

DROP TABLE IF EXISTS `recipient`;
CREATE TABLE IF NOT EXISTS `recipient` (
  `idTask` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  PRIMARY KEY (`idTask`,`idUser`),
  KEY `idUser` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `severity`
--

DROP TABLE IF EXISTS `severity`;
CREATE TABLE IF NOT EXISTS `severity` (
  `idSeverity` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`idSeverity`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `severity`
--

INSERT INTO `severity` (`idSeverity`, `name`) VALUES
(1, 'High'),
(2, 'Medium'),
(3, 'Low'),
(4, 'No emergency');

-- --------------------------------------------------------

--
-- Structure de la table `state`
--

DROP TABLE IF EXISTS `state`;
CREATE TABLE IF NOT EXISTS `state` (
  `idState` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`idState`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `state`
--

INSERT INTO `state` (`idState`, `name`) VALUES
(1, 'To do'),
(2, 'In progress'),
(3, 'Done');

-- --------------------------------------------------------

--
-- Structure de la table `task`
--

DROP TABLE IF EXISTS `task`;
CREATE TABLE IF NOT EXISTS `task` (
  `idTask` int(11) NOT NULL AUTO_INCREMENT,
  `idMishap` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `createDate` datetime NOT NULL,
  PRIMARY KEY (`idTask`),
  KEY `idMishap` (`idMishap`),
  KEY `idUser` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `role` int(1) NOT NULL DEFAULT '0',
  `isObject` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`idUser`, `name`, `email`, `password`, `role`, `isObject`) VALUES
(1, 'Bob', 'bob.marchal@gmail.com', 'password', 1, 0),
(2, 'Catherine', 'catherine.allard@gmail.com', 'password', 0, 0),
(3, 'Etienne', 'etienne.mao@gmail.com', 'password', 0, 0),
(4, 'David', 'david.lagache@gmail.com', 'password', 0, 0),
(5, 'Denys', 'denys.nari@gmail.com', 'password', 0, 0),
(6, 'MQTT', 'mqtt@iot.com', 'az', 1, 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `consigne`
--
ALTER TABLE `consigne`
  ADD CONSTRAINT `consigne_ibfk_1` FOREIGN KEY (`idPlace`) REFERENCES `place` (`idPlace`);

--
-- Contraintes pour la table `mishap`
--
ALTER TABLE `mishap`
  ADD CONSTRAINT `mishap_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`),
  ADD CONSTRAINT `mishap_ibfk_2` FOREIGN KEY (`idPlace`) REFERENCES `place` (`idPlace`),
  ADD CONSTRAINT `mishap_ibfk_3` FOREIGN KEY (`idSeverity`) REFERENCES `severity` (`idSeverity`),
  ADD CONSTRAINT `mishap_ibfk_4` FOREIGN KEY (`idState`) REFERENCES `state` (`idState`),
  ADD CONSTRAINT `mishap_ibfk_5` FOREIGN KEY (`idMode`) REFERENCES `mode` (`idMode`);

--
-- Contraintes pour la table `place_owner`
--
ALTER TABLE `place_owner`
  ADD CONSTRAINT `place_owner_ibfk_1` FOREIGN KEY (`idPlace`) REFERENCES `place` (`idPlace`),
  ADD CONSTRAINT `place_owner_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`);

--
-- Contraintes pour la table `recipient`
--
ALTER TABLE `recipient`
  ADD CONSTRAINT `recipient_ibfk_1` FOREIGN KEY (`idTask`) REFERENCES `task` (`idTask`),
  ADD CONSTRAINT `recipient_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`);

--
-- Contraintes pour la table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`idMishap`) REFERENCES `mishap` (`idMishap`),
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
