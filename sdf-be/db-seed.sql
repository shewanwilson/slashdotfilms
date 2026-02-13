-- MySQL dump 10.13  Distrib 9.5.0, for macos15.7 (arm64)
--
-- Host: localhost    Database: sdf_db
-- ------------------------------------------------------
-- Server version	9.5.0

CREATE DATABASE IF NOT EXISTS sdf_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE sdf_db;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

-- SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '6176f000-c246-11f0-b900-8145d55f5cad:1-89';

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
-- Table structure for table `board_user`
--

DROP TABLE IF EXISTS `board_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_user`
--

LOCK TABLES `board_user` WRITE;
/*!40000 ALTER TABLE `board_user` DISABLE KEYS */;
INSERT INTO `board_user` VALUES (1,'barry','barry@example.com','$2b$10$N9qo8uLOickgx2ZMRZo5i.ej4Fz3mK2KxW1zPZp6Jr4lYpJ5yA8Wy','2025-12-25 01:11:06'),(2,'admin','admin@example.com','$2b$10$9w6mJtY4m8kJqkZrR3h3b.f5C6P5x8xM0mZK0pZ9Z9bQ1W6Yz','2025-12-25 01:11:06'),(3,'Hepocles','hep@example.com','$2b$10$opXFvJGxGCJAw6VhNLNNPOPjFgMyP9JLBT9OCU5sSk.t4272OZUVq','2025-12-26 20:10:23'),(4,'AryaFan21','af21@example.com','$2b$10$NZGeHC7/1sDIPS9Af6B6r.FvqgsbHVOv8FhYCoRRosnVMaTVpsi4q','2026-01-24 18:44:56'),(5,'OldNan123','on123@example.com','$2b$10$Y4CGk/fI6lC5/BFHJbKkceeS5X6E/otrBUG.Q3BFhHJSmUh3Cbovi','2026-01-24 18:45:51'),(6,'DragonQueen','dq@example.com','$2b$10$avl8Z6Upa88lDkO7faWLSuAY53X2WHhat8ANhJtVNNpPlSrz/tieq','2026-01-24 18:46:10'),(7,'ScoreSeeker','ss@example.com','$2b$10$P9xwabVUmj2yZZ56UCpbiuvqDFShlXo7wgCIgDU8ax0g0cRP4Xvai','2026-01-24 18:46:46'),(8,'CinemaSnob','cs@example.com','$2b$10$9sJszC2REjiw47MGyEnhbe2GNEH5y2d8TAPs/WyfGDCo3iB0cK0y6','2026-01-24 18:47:09'),(9,'BingeBro','bb@example.com','$2b$10$zH80rUN5iHccuqCEHla6beSFf3B69iYDVAIhDkG7m7718H2akubl2','2026-01-24 18:47:41'),(10,'DebateKing','dk@example.com','$2b$10$bRecG/9Fmie6i8yU23LJ8ucsovjWWOOx7Cpdg98TbNFEH85//UPI2','2026-01-24 18:48:02'),(11,'RealTalker','rt@example.com','$2b$10$arojFTUGz5ocWbPQTH2xyOYZv682WhE6/KJvUNbytjvn2Lk4ZfZO6','2026-01-24 18:48:22'),(12,'ForumBot','fb@example.com','$2b$10$KcPxhog5E9urPLFpFBz98OZd.15WL3twQOy8f3bGP4UQqtBx8EwuG','2026-01-24 18:48:42'),(13,'ModJane','mj@example.com','$2b$10$EFRmESOzSssHVzQsPZvBqudyjKR5krSqIPZXlFzB6KKgHWVLwlcly','2026-01-24 18:49:00'),(14,'fdfd','dfdf@example.com','$2b$10$IoVBTr2zXmTIqyqo0n.qp.cr66jLt4RhnijsSxgoDAtLaz63Q1pXC','2026-01-24 18:53:44'),(15,'ggfd','ggdfdf@example.com','$2b$10$wrBNFYq2K71qxcICG0CvXeg9400w1kUFvuPMBDVjwz9.jmPPb1Omq','2026-01-24 19:00:27'),(16,'sdsd','sdfdf@example.com','$2b$10$ceV5mS/87BO8.itDmp/rreKVGT/SeWdx4aWf85/A.Bp/iwoc1pC0e','2026-01-25 15:53:52');
/*!40000 ALTER TABLE `board_user` ENABLE KEYS */;
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
  `post_author_id` int DEFAULT NULL,
  `thread_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Who is Azor Ahai?','The Targaryens are one of the most well-known families in Westeros, originally from the Valyrian Freehold. They ruled the Seven Kingdoms for nearly three centuries, with their dragons providing a distinct advantage over their enemies.',1,1,'2026-01-24 22:16:01'),(2,'Who is Azor Ahai?','Jon Snow, raised as Eddard Stark\'s bastard, is later revealed to have a hidden parentage tied to the Targaryen line. This revelation changes the course of the War of the Five Kings and has significant implications for the Iron Throne.',14,1,'2026-01-24 22:16:01'),(3,'Who is Azor Ahai?','The Red Wedding was a tragic event in Westeros history where many key characters were murdered in a brutal betrayal at the hands of House Frey. This event marked a turning point in the War of the Five Kings.',14,1,'2026-01-24 22:16:01'),(4,'The Wall and the Night\'s Watch','The Wall is an immense structure built to protect the realm from dangers beyond. The Night\'s Watch, tasked with guarding it, has been a symbol of honor and sacrifice, though it is often undermanned and disregarded by the political powers of Westeros.',1,2,'2026-01-24 22:16:01'),(5,'The Dothraki and Their Culture','The Dothraki are a fierce nomadic people known for their cavalry and horse-riding skills. They follow the Great Stallion and have a unique culture, centered around strength, honor, and the belief that a man’s worth is tied to the horses he owns.',14,2,'2026-01-24 22:16:01'),(6,'Brienne of Tarth and Her Honor','Brienne of Tarth is known as the Maid of Tarth and is one of the few women in Westeros who takes up the sword as a knight. Her dedication to her oath and her sense of honor make her a standout character in the series.',1,2,'2026-01-24 22:16:01'),(7,'The War of the Five Kings','The War of the Five Kings was a civil war in Westeros following the death of King Robert Baratheon. The main claimants were King Stannis Baratheon, King Renly Baratheon, Robb Stark, Joffrey Baratheon, and Balon Greyjoy.',1,2,'2026-01-24 22:16:01'),(8,'Varys and His Spies','Varys, the spymaster of Westeros, has a vast network of informants, which he uses to manipulate the political landscape. His enigmatic nature and loyalty to the realm make him both a fascinating and mysterious character.',14,2,'2026-01-24 22:16:01'),(9,'Daenerys Targaryen\'s Rise to Power','Daenerys Targaryen, the last surviving Targaryen after the fall of her house, begins her journey in Essos with nothing but a few followers. Over time, she gains an army, dragons, and the loyalty of many, setting her sights on the Iron Throne.',1,2,'2026-01-24 22:16:01'),(10,'The Battle of the Bastards','The Battle of the Bastards was a pivotal conflict in the North, where Jon Snow and Sansa Stark led their forces against Ramsay Bolton in an attempt to reclaim Winterfell. The battle is known for its brutal tactics and its impact on the Stark family’s future.',1,2,'2026-01-24 22:16:01'),(11,'Test','Trigger check',1,1,'2026-01-25 13:31:45'),(14,'Test 2','Trigger check',1,1,'2026-01-25 13:36:44');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_post_after_insert` AFTER INSERT ON `post` FOR EACH ROW UPDATE thread
SET
  no_of_posts = no_of_posts + 1,
  time_of_last_post = CURRENT_TIMESTAMP
WHERE thread_id = NEW.thread_id */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `thread`
--

DROP TABLE IF EXISTS `thread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thread` (
  `thread_id` int NOT NULL AUTO_INCREMENT,
  `thread_title` varchar(45) DEFAULT NULL,
  `time_of_last_post` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `no_of_posts` int unsigned NOT NULL DEFAULT '1',
  `board_id` int DEFAULT NULL,
  `started_by_user_id` int NOT NULL,
  PRIMARY KEY (`thread_id`),
  KEY `board_id_idx` (`board_id`),
  KEY `fk_thread_started_by` (`started_by_user_id`),
  CONSTRAINT `fk_thread_started_by` FOREIGN KEY (`started_by_user_id`) REFERENCES `board_user` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread`
--

LOCK TABLES `thread` WRITE;
/*!40000 ALTER TABLE `thread` DISABLE KEYS */;
INSERT INTO `thread` VALUES (1,'Who is Azor Ahai?','2026-01-25 13:36:44',4,4,4),(2,'Bran is the Night King?','2025-04-09 17:05:00',25,4,5),(3,'Best scenes in Season 6','2025-04-11 08:15:00',18,4,6),(4,'Best Movie Soundtracks?','2025-04-10 20:50:00',8,2,7),(5,'Movie remakes better than originals?','2025-04-10 12:20:00',14,2,8),(6,'What to watch this weekend?','2025-04-11 09:10:00',6,2,9),(7,'The 2025 Elections Thread','2025-04-11 06:00:00',47,3,10),(8,'Is AI taking our jobs?','2025-04-10 22:45:00',33,3,11),(9,'Forum Games: Count to 1,000','2025-04-11 10:25:00',152,1,12),(10,'Introduce Yourself Here!','2025-04-10 11:00:00',5,1,13),(11,'Test timestamp','2026-01-24 18:28:10',0,1,7),(12,'Test timestamp 2','2026-01-24 18:32:05',0,1,7),(13,NULL,'2026-01-25 16:48:52',0,1,1),(14,NULL,'2026-01-25 20:35:32',0,1,1),(15,NULL,'2026-01-25 20:35:38',0,1,1),(16,'api test thread 1','2026-01-25 20:36:26',0,1,1),(17,'api test thread 2','2026-01-25 20:40:57',1,1,1);
/*!40000 ALTER TABLE `thread` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sdf_db'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-02 19:35:30
