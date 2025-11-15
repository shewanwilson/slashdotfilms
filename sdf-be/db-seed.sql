CREATE DATABASE  IF NOT EXISTS `sdf_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sdf_db`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: sdf_db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_id` int NOT NULL AUTO_INCREMENT,
  `board_name` varchar(45) NOT NULL,
  PRIMARY KEY (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,'General'),(2,'Film General'),(3,'Sopabox'),(4,'Game of Thrones');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_title` varchar(500) DEFAULT NULL,
  `post_body` varchar(500) DEFAULT NULL,
  `post_author` int DEFAULT NULL,
  `thread_id` int DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Who is Azor Ahai?','The Targaryens are one of the most well-known families in Westeros, originally from the Valyrian Freehold. They ruled the Seven Kingdoms for nearly three centuries, with their dragons providing a distinct advantage over their enemies.',10,1),(2,'Who is Azor Ahai?','Jon Snow, raised as Eddard Stark\'s bastard, is later revealed to have a hidden parentage tied to the Targaryen line. This revelation changes the course of the War of the Five Kings and has significant implications for the Iron Throne.',20,1),(3,'Who is Azor Ahai?','The Red Wedding was a tragic event in Westeros history where many key characters were murdered in a brutal betrayal at the hands of House Frey. This event marked a turning point in the War of the Five Kings.',303,1),(4,'The Wall and the Night\'s Watch','The Wall is an immense structure built to protect the realm from dangers beyond. The Night\'s Watch, tasked with guarding it, has been a symbol of honor and sacrifice, though it is often undermanned and disregarded by the political powers of Westeros.',40,NULL),(5,'The Dothraki and Their Culture','The Dothraki are a fierce nomadic people known for their cavalry and horse-riding skills. They follow the Great Stallion and have a unique culture, centered around strength, honor, and the belief that a man’s worth is tied to the horses he owns.',50,NULL),(6,'Brienne of Tarth and Her Honor','Brienne of Tarth is known as the Maid of Tarth and is one of the few women in Westeros who takes up the sword as a knight. Her dedication to her oath and her sense of honor make her a standout character in the series.',60,NULL),(7,'The War of the Five Kings','The War of the Five Kings was a civil war in Westeros following the death of King Robert Baratheon. The main claimants were King Stannis Baratheon, King Renly Baratheon, Robb Stark, Joffrey Baratheon, and Balon Greyjoy.',70,NULL),(8,'Varys and His Spies','Varys, the spymaster of Westeros, has a vast network of informants, which he uses to manipulate the political landscape. His enigmatic nature and loyalty to the realm make him both a fascinating and mysterious character.',80,NULL),(9,'Daenerys Targaryen\'s Rise to Power','Daenerys Targaryen, the last surviving Targaryen after the fall of her house, begins her journey in Essos with nothing but a few followers. Over time, she gains an army, dragons, and the loyalty of many, setting her sights on the Iron Throne.',90,NULL),(10,'The Battle of the Bastards','The Battle of the Bastards was a pivotal conflict in the North, where Jon Snow and Sansa Stark led their forces against Ramsay Bolton in an attempt to reclaim Winterfell. The battle is known for its brutal tactics and its impact on the Stark family’s future.',100,NULL);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thread`
--

DROP TABLE IF EXISTS `thread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thread` (
  `thread_id` int NOT NULL AUTO_INCREMENT,
  `thread_title` varchar(45) DEFAULT NULL,
  `started_by` varchar(45) DEFAULT NULL,
  `time_of_last_post` datetime DEFAULT NULL,
  `no_of_posts` int DEFAULT NULL,
  `board_id` int DEFAULT NULL,
  PRIMARY KEY (`thread_id`),
  KEY `board_id_idx` (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread`
--

LOCK TABLES `thread` WRITE;
/*!40000 ALTER TABLE `thread` DISABLE KEYS */;
INSERT INTO `thread` VALUES (1,'Who is Azor Ahai?','AryaFan21','2025-04-10 14:23:00',12,4),(2,'Bran is the Night King?','OldNan123','2025-04-09 18:05:00',25,4),(3,'Best scenes in Season 6','DragonQueen','2025-04-11 09:15:00',18,4),(4,'Best Movie Soundtracks?','ScoreSeeker','2025-04-10 21:50:00',8,2),(5,'Movie remakes better than originals?','CinemaSnob','2025-04-10 13:20:00',14,2),(6,'What to watch this weekend?','BingeBro','2025-04-11 10:10:00',6,2),(7,'The 2025 Elections Thread','DebateKing','2025-04-11 07:00:00',47,3),(8,'Is AI taking our jobs?','RealTalker','2025-04-10 23:45:00',33,3),(9,'Forum Games: Count to 1,000','ForumBot','2025-04-11 11:25:00',152,1),(10,'Introduce Yourself Here!','ModJane','2025-04-10 12:00:00',5,1);
/*!40000 ALTER TABLE `thread` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-15 15:49:12
