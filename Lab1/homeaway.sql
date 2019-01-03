-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2018 at 06:54 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homeaway`
--

-- --------------------------------------------------------

--
-- Table structure for table `ownerproperty`
--

CREATE TABLE `ownerproperty` (
  `propID` int(11) NOT NULL,
  `propName` varchar(255) NOT NULL,
  `propDescription` varchar(255) NOT NULL,
  `propType` varchar(255) NOT NULL,
  `bedrooms` int(11) NOT NULL,
  `accomodates` int(11) NOT NULL,
  `bathroom` int(11) NOT NULL,
  `propPhotos` varchar(255) NOT NULL,
  `availableStart` date NOT NULL,
  `availableEnd` date NOT NULL,
  `pricePerNight` int(11) NOT NULL,
  `country` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zipcode` int(11) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ownerproperty`
--

INSERT INTO `ownerproperty` (`propID`, `propName`, `propDescription`, `propType`, `bedrooms`, `accomodates`, `bathroom`, `propPhotos`, `availableStart`, `availableEnd`, `pricePerNight`, `country`, `address`, `city`, `state`, `zipcode`, `email`) VALUES
(4, 'Beautiful San Jose Cottage', '1BR Cottage', 'cottage', 1, 2, 1, '\"one.jpg\"', '2018-10-03', '2018-10-30', 50, 'US', '5th street', 'San Jose', 'California', 95112, 'owner@gmail.com'),
(5, 'Private Cottage close to Apple', 'Near san jose center', 'cottage', 1, 2, 1, '\"two.jpg\"', '2018-10-03', '2018-10-30', 56, 'US', '2nd street', 'San Jose', 'California', 95112, 'owner@gmail.com'),
(6, 'Your home away from home on wheels', 'small Rv with room for two with small kitchen', 'studio', 1, 2, 0, '\"three.jpg\"', '2018-10-06', '2018-10-30', 30, 'US', '1st street', 'San Jose', 'California', 95112, 'owner1@gmail.com'),
(7, 'Private and Tranquil', 'Our guest house, located on our property, is set in a private, picturesque garden', 'cottage', 1, 2, 1, '\"three.jpg\"', '2018-10-06', '2018-10-30', 50, 'US', '9th street', 'San Jose', 'California', 95112, 'owner@gmail.com'),
(15, 'The Gathering Suite', 'A comfortable suite with a kitchenette, private bath, dining and living room.', 'Studio', 1, 2, 1, '\"one.jpg\"', '2018-10-01', '2018-12-01', 50, 'US', '4th street', 'San Jose', 'California', 95113, 'ownertest@gmail.com'),
(16, 'Lux 1bd CA w/Pool+Spa', 'Apartment in San Jose, 1 bedroom, 1 bathroom, sleeps 2', 'Apatment', 1, 2, 1, '\"two.jpg\"', '2018-10-01', '2018-12-01', 69, 'US', '2nd street', 'San Jose', 'California', 95113, 'ownertest@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `profileinfo`
--

CREATE TABLE `profileinfo` (
  `Srno` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profileImage` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `aboutMe` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `school` varchar(255) NOT NULL,
  `hometown` varchar(255) NOT NULL,
  `languages` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `oORt` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profileinfo`
--

INSERT INTO `profileinfo` (`Srno`, `firstName`, `lastName`, `email`, `password`, `profileImage`, `phoneNumber`, `aboutMe`, `city`, `country`, `company`, `school`, `hometown`, `languages`, `gender`, `oORt`) VALUES
(0, 'daniel', 'Shroff', 'ownertest@gmail.com', 'admin', '', '', '', '', '', '', '', '', '', '', 'o'),
(0, 'devu', 'triv', 'traveler@gmail.com', 'admin', 'download.jpg', '123456', 'hey', 'san jose', 'ca', 'abc', 'xyz', 'ny', 'eng', 'F', 't'),
(0, 'John', 'Snow', 'travelertest@gmail.com', 'admin', 'travelertest.jpg', '123456789', 'Hi there.', 'San Jose', 'US', 'Nvidia', 'SJSU', 'NY', 'English', 'Male', 't');

-- --------------------------------------------------------

--
-- Table structure for table `propertyblock`
--

CREATE TABLE `propertyblock` (
  `srno` int(11) NOT NULL,
  `propName` varchar(255) NOT NULL,
  `propEmail` varchar(255) NOT NULL,
  `blockdateStart` date NOT NULL,
  `blockdateEnd` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `propertyblock`
--

INSERT INTO `propertyblock` (`srno`, `propName`, `propEmail`, `blockdateStart`, `blockdateEnd`) VALUES
(0, 'Beautiful San Jose Cottage', 'owner@gmail.com', '2018-10-09', '2018-10-13');

-- --------------------------------------------------------

--
-- Table structure for table `travelerbookings`
--

CREATE TABLE `travelerbookings` (
  `srno` int(11) NOT NULL,
  `tmail` varchar(255) NOT NULL,
  `propName` varchar(255) NOT NULL,
  `bookdateStart` date NOT NULL,
  `bookdateEnd` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `travelerbookings`
--

INSERT INTO `travelerbookings` (`srno`, `tmail`, `propName`, `bookdateStart`, `bookdateEnd`) VALUES
(1, 'traveler@gmail.com', 'Beautiful San Jose Cottage', '2018-10-05', '2018-10-08'),
(2, 'traveler@gmail.com', 'Private Cottage close to Apple', '2018-10-05', '2018-10-08'),
(3, 'traveler@gmail.com', 'Beautiful San Jose Cottage', '2018-10-05', '2018-10-08'),
(4, 'travelertest@gmail.com', 'The Gathering Suite', '2018-10-01', '2018-10-06'),
(5, 'travelertest@gmail.com', 'Lux 1bd CA w/Pool+Spa', '2018-10-01', '2018-10-06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ownerproperty`
--
ALTER TABLE `ownerproperty`
  ADD PRIMARY KEY (`propID`);

--
-- Indexes for table `profileinfo`
--
ALTER TABLE `profileinfo`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `propertyblock`
--
ALTER TABLE `propertyblock`
  ADD PRIMARY KEY (`srno`);

--
-- Indexes for table `travelerbookings`
--
ALTER TABLE `travelerbookings`
  ADD PRIMARY KEY (`srno`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ownerproperty`
--
ALTER TABLE `ownerproperty`
  MODIFY `propID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `travelerbookings`
--
ALTER TABLE `travelerbookings`
  MODIFY `srno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
