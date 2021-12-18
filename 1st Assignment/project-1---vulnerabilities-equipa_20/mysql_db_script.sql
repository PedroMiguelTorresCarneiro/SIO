CREATE DATABASE `library` /*!40100 DEFAULT CHARACTER SET utf8 */;


-- library.Book definition

CREATE TABLE `Book` (
  `name` varchar(100) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- library.`User` definition

CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO library.Book (name, author, `date`) VALUES('A Gentleman in Moscow', 'Amor Tobles', '2021-11-11');
INSERT INTO library.Book (name, author, `date`) VALUES('Song of Achiles', 'Madelain Milles', '2021-11-11');
INSERT INTO library.Book (name, author, `date`) VALUES('The Human Zoo', 'Desmond Morries', '2021-11-11');
INSERT INTO library.Book (name, author, `date`) VALUES('Sapiens', 'Yuval Noa Harari', '2021-11-11');

INSERT INTO library.`User` (`user`, password) VALUES('admin', MD5('top-secret'));
INSERT INTO library.`User` (`user`, password) VALUES('librarian', MD5('secret'));
