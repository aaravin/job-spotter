CREATE DATABASE IF NOT EXISTS chat;

USE chat;

CREATE TABLE IF NOT EXISTS messages (
  /* Describe your table here.*/
  userID int(11),
  message varchar(100),
  roomname varchar(100)
);

CREATE TABLE IF NOT EXISTS users (
  userID int(11),
  username varchar(100)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

