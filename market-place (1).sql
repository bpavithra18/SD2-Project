-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: May 01, 2023 at 09:53 PM
-- Server version: 8.0.32
-- PHP Version: 8.1.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `market-place`
--

-- --------------------------------------------------------

--
-- Table structure for table `Credentials`
--

CREATE TABLE `Credentials` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Credentials`
--

INSERT INTO `Credentials` (`id`, `email`, `password`) VALUES
(6, 'yk@gmail.com', '$2a$10$QjF7r4EZmPkLt06fq3TCFu4NJPogl.rBjf12n93LgWpk9VXiCEk3K'),
(7, 'donadi@gamil.com', '$2a$10$HpcEQRHqVGlsP5QxI2SNzeClFka92rmLAYbpZdpZbWsYOAbsCE7bC'),
(8, 'revchitti@gmail.com', '$2a$10$Nq1bG6LJx78N4fUWDq/gWuDAcJ3EDQXHRRWilltf50CmjXplswQMq'),
(9, 'pav@gmail.com', '$2a$10$WFt/0F.gFJ8qHQybdpXmpe/T8pqFZ4aE6Nugn2x0RqTWUxZlK9lzC'),
(10, 'dam@gmail.com', '$2a$10$lKgQ/pPsfcB6FoSjU7LQBuc2ZumgmtMy2.rqzkZJ.wvzU9316b576'),
(11, 'kk@gmail.com', '$2a$10$VxFI06N24cZhhH/C949Awufl1aOiwZzPQwYVz82cBmjzGyd/ZNlnu'),
(12, 'dd@gmail.com', '$2a$10$SzTl6UcBCvIXlfnhWLvE0uDWltgoKc0mHxDVeFmPQ6kN6C0qTDCui'),
(13, 'pp@gmail.com', '$2a$10$Plqg9vPC9IiJ3u0s1jxMVOJ.2adRhFZQauKSyGTeGtoTPks1gDEMS'),
(14, 'rv@gmail.com', '$2a$10$/j4ajU/f1.d9R64xuY9diuBL6MOObHq5ebIUwQ8EKq200AGeRmhCe'),
(15, 'yuvadonadi17@gmail.com', '$2a$10$h.IlAUzxh9b1KeLreHj4COjwpELPDJ0OuuJovQnN4htx2cu8U7x4i');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` int NOT NULL,
  `property_type` varchar(255) DEFAULT NULL,
  `bedrooms` int DEFAULT NULL,
  `bathrooms` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text,
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `property_type`, `bedrooms`, `bathrooms`, `price`, `description`, `contact_name`, `contact_email`, `contact_phone`, `image`) VALUES
(1, 'house', 1, 1, 2000.00, 'well furnitured', 'yk', 'yk@gmail.com', '07867239283', 'property1.jpg'),
(2, 'house', 2, 1, 2000.00, 'home', 'kishore', 'yk@gmail.com', '07867239283', 'property1.jpg'),
(3, 'house', 3, 1, 2000.00, 'home', 'kishore', 'yk@gmail.com', '07867239283', 'property1.jpg'),
(4, 'apartment', 3, 2, 100000.00, 'revanths villa', 'revanth', 'rv@gmail.com', '07867239228', 'property1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `id` varchar(10) NOT NULL,
  `location` varchar(30) NOT NULL,
  `type` varchar(30) NOT NULL,
  `category` varchar(50) NOT NULL,
  `cost` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`id`, `location`, `type`, `category`, `cost`) VALUES
('1', 'hounslow', 'flat', '2bhk', 1000),
('2', 'westfield', 'house', '3bhk', 2000),
('3', 'hounslow', 'apartment', '2bhk', 3000);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int NOT NULL,
  `name` varchar(10) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `address` varchar(50) NOT NULL,
  `psd` varchar(30) NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `name`, `phone`, `email`, `address`, `psd`, `dob`, `gender`) VALUES
(1, 'kishore', '7867239283', 'kishore@gamil.com', 'hounslow', 'kishore@123', '1997-07-17', 'male'),
(2, 'revanth', '7867239284', 'revanth@gamil.com', 'westfield', 'revanth@123', '1998-07-17', 'male'),
(3, 'pavitra', '7867239285', 'pavitra@gamil.com', 'hounslow', 'pavitra@123', '1999-07-17', 'female');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Credentials`
--
ALTER TABLE `Credentials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Credentials`
--
ALTER TABLE `Credentials`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
