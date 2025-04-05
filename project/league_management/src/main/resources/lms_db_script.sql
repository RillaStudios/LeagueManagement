-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2025 at 11:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `conferences`
--

CREATE TABLE `conferences` (
  `conference_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `league_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `division`
--

CREATE TABLE `division` (
  `division_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT 'NULL',
  `league_id` int(10) UNSIGNED NOT NULL,
  `max_teams` int(11) DEFAULT NULL,
  `conference_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `game_id` int(10) UNSIGNED NOT NULL,
  `home_team_id` int(10) UNSIGNED NOT NULL,
  `away_team_id` int(10) UNSIGNED NOT NULL,
  `season_id` int(10) UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `venue_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `league`
--

CREATE TABLE `league` (
  `league_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `game_type` varchar(50) DEFAULT 'NULL',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `description` tinytext DEFAULT NULL,
  `current_season_id` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT 'NULL',
  `created_by` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `league_news`
--

CREATE TABLE `league_news` (
  `league_news_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `content` tinytext NOT NULL,
  `league_id` int(10) UNSIGNED NOT NULL,
  `created_by` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `league_permission`
--

CREATE TABLE `league_permission` (
  `league_permission_id` int(10) UNSIGNED NOT NULL,
  `permission_name` varchar(50) NOT NULL DEFAULT current_timestamp(),
  `permission_desc` varchar(1000) DEFAULT 'NULL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `league_role`
--

CREATE TABLE `league_role` (
  `league_role_id` int(10) UNSIGNED NOT NULL,
  `league_role_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `league_role_permission`
--

CREATE TABLE `league_role_permission` (
  `league_role_permission_id` int(10) UNSIGNED NOT NULL,
  `league_permission_id` int(10) UNSIGNED NOT NULL,
  `league_role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `permission_name` varchar(50) NOT NULL,
  `permission_desc` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`permission_id`, `permission_name`, `permission_desc`) VALUES
(2, 'ADMIN_READ', 'Allows admin to read.'),
(3, 'UPDATE_PERMISSIONS', 'Allows user to edit permissions.');

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

CREATE TABLE `player` (
  `player_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `height` varchar(10) DEFAULT NULL,
  `weight` varchar(10) DEFAULT NULL,
  `skill_level` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `team_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int(10) UNSIGNED NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `role_desc` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`, `role_desc`) VALUES
(1, 'ADMIN', 'Admin Role'),
(2, 'USER', 'User Role'),
(4, 'SUPER_ADMIN', 'Access to all priveledges.');

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `role_permission_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  `permission_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`role_permission_id`, `role_id`, `permission_id`) VALUES
(2, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `season`
--

CREATE TABLE `season` (
  `season_id` int(10) UNSIGNED NOT NULL,
  `league_id` int(10) UNSIGNED NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `max_teams` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `team_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `league_id` int(10) UNSIGNED NOT NULL,
  `division_id` int(10) UNSIGNED DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `conference_id` int(10) UNSIGNED DEFAULT NULL,
  `owner_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `team_game_stats`
--

CREATE TABLE `team_game_stats` (
  `team_game_stats_id` int(10) UNSIGNED NOT NULL,
  `team_id` int(10) UNSIGNED NOT NULL,
  `points_for` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `points_against` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `game_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `team_news`
--

CREATE TABLE `team_news` (
  `team_news_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `team_id` int(10) UNSIGNED NOT NULL,
  `content` tinytext NOT NULL,
  `created_by` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `team_season`
--

CREATE TABLE `team_season` (
  `team_season_id` int(10) UNSIGNED NOT NULL,
  `team_id` int(10) UNSIGNED NOT NULL,
  `season_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `team_season_stats`
--

CREATE TABLE `team_season_stats` (
  `team_season_stats_id` int(10) UNSIGNED NOT NULL,
  `team_season_id` int(10) UNSIGNED NOT NULL,
  `total_wins` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `total_losses` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `total_ties` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `total_points_for` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `total_points_against` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `token_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `token` varchar(255) NOT NULL,
  `id` int(11) NOT NULL,
  `expired` bit(1) NOT NULL,
  `revoked` bit(1) NOT NULL,
  `tokenType` enum('BEARER') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `token_seq`
--

CREATE TABLE `token_seq` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) UNSIGNED NOT NULL,
  `cycle_option` tinyint(1) UNSIGNED NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB;

--
-- Dumping data for table `token_seq`
--

INSERT INTO `token_seq` (`next_not_cached_value`, `minimum_value`, `maximum_value`, `start_value`, `increment`, `cache_size`, `cycle_option`, `cycle_count`) VALUES
(10801, 1, 9223372036854775806, 1, 50, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `account_enabled` tinyint(1) NOT NULL,
  `account_expired` tinyint(1) NOT NULL,
  `credentials_expired` tinyint(1) NOT NULL,
  `account_locked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `user_league_role`
--

CREATE TABLE `user_league_role` (
  `user_league_role_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `league_role_id` int(10) UNSIGNED NOT NULL,
  `league_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_role_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `venue`
--

CREATE TABLE `venue` (
  `venue_id` int(10) UNSIGNED NOT NULL,
  `league_id` int(10) UNSIGNED NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `conferences`
--
ALTER TABLE `conferences`
  ADD PRIMARY KEY (`conference_id`),
  ADD KEY `conferences_relation_league_id` (`league_id`);

--
-- Indexes for table `division`
--
ALTER TABLE `division`
  ADD PRIMARY KEY (`division_id`),
  ADD KEY `division_relation_league` (`league_id`),
  ADD KEY `division_relation_conference` (`conference_id`);

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`game_id`),
  ADD KEY `game_relation_season` (`season_id`),
  ADD KEY `game_relation_home` (`home_team_id`),
  ADD KEY `game_relation_away` (`away_team_id`),
  ADD KEY `game_relation_venue` (`venue_id`);

--
-- Indexes for table `league`
--
ALTER TABLE `league`
  ADD PRIMARY KEY (`league_id`),
  ADD KEY `league_relation_created_by` (`created_by`);

--
-- Indexes for table `league_news`
--
ALTER TABLE `league_news`
  ADD PRIMARY KEY (`league_news_id`),
  ADD KEY `league_news_relation_league` (`league_id`),
  ADD KEY `league_news_relation_created_by` (`created_by`);

--
-- Indexes for table `league_permission`
--
ALTER TABLE `league_permission`
  ADD PRIMARY KEY (`league_permission_id`);

--
-- Indexes for table `league_role`
--
ALTER TABLE `league_role`
  ADD PRIMARY KEY (`league_role_id`);

--
-- Indexes for table `league_role_permission`
--
ALTER TABLE `league_role_permission`
  ADD PRIMARY KEY (`league_role_permission_id`),
  ADD KEY `league_role_permission_relation_permission` (`league_permission_id`),
  ADD KEY `league_role_permission_relation_role` (`league_role_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permission_id`);

--
-- Indexes for table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`player_id`),
  ADD KEY `player_relation_team` (`team_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`role_permission_id`),
  ADD KEY `role_permissions_relation_role` (`role_id`),
  ADD KEY `role_permissions_relation_permission` (`permission_id`);

--
-- Indexes for table `season`
--
ALTER TABLE `season`
  ADD PRIMARY KEY (`season_id`),
  ADD KEY `season_relation_league` (`league_id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`team_id`),
  ADD KEY `team_relation_league_id` (`league_id`),
  ADD KEY `team_relation_conference` (`conference_id`),
  ADD KEY `team_relation_owner` (`owner_id`),
  ADD KEY `team_relation_division` (`division_id`);

--
-- Indexes for table `team_game_stats`
--
ALTER TABLE `team_game_stats`
  ADD PRIMARY KEY (`team_game_stats_id`),
  ADD KEY `team_game_stats_relation_team` (`team_id`),
  ADD KEY `team_game_stats_relation_2` (`game_id`);

--
-- Indexes for table `team_news`
--
ALTER TABLE `team_news`
  ADD PRIMARY KEY (`team_news_id`),
  ADD KEY `team_news_relation_team` (`team_id`),
  ADD KEY `team_news_relation_created_by` (`created_by`);

--
-- Indexes for table `team_season`
--
ALTER TABLE `team_season`
  ADD PRIMARY KEY (`team_season_id`),
  ADD KEY `team_season_relation_season` (`season_id`),
  ADD KEY `team_season_relation_team` (`team_id`);

--
-- Indexes for table `team_season_stats`
--
ALTER TABLE `team_season_stats`
  ADD PRIMARY KEY (`team_season_stats_id`),
  ADD KEY `team_season_stats_relation_team_season` (`team_season_id`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`token_id`),
  ADD KEY `token_relation_user` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_league_role`
--
ALTER TABLE `user_league_role`
  ADD PRIMARY KEY (`user_league_role_id`),
  ADD KEY `user_league_role_relation_user` (`user_id`),
  ADD KEY `user_league_role_relation_league` (`league_id`),
  ADD KEY `user_league_role_relation_role` (`league_role_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_role_id`),
  ADD KEY `user_roles_relation_user` (`user_id`),
  ADD KEY `user_roles_relation_role` (`role_id`);

--
-- Indexes for table `venue`
--
ALTER TABLE `venue`
  ADD PRIMARY KEY (`venue_id`),
  ADD KEY `venue_relation_league` (`league_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conferences`
--
ALTER TABLE `conferences`
  MODIFY `conference_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `division`
--
ALTER TABLE `division`
  MODIFY `division_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
  MODIFY `game_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `league`
--
ALTER TABLE `league`
  MODIFY `league_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `league_news`
--
ALTER TABLE `league_news`
  MODIFY `league_news_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `league_permission`
--
ALTER TABLE `league_permission`
  MODIFY `league_permission_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `league_role`
--
ALTER TABLE `league_role`
  MODIFY `league_role_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `league_role_permission`
--
ALTER TABLE `league_role_permission`
  MODIFY `league_role_permission_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `player_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `role_permission_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `season`
--
ALTER TABLE `season`
  MODIFY `season_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `team_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `team_game_stats`
--
ALTER TABLE `team_game_stats`
  MODIFY `team_game_stats_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `team_news`
--
ALTER TABLE `team_news`
  MODIFY `team_news_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `team_season`
--
ALTER TABLE `team_season`
  MODIFY `team_season_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `team_season_stats`
--
ALTER TABLE `team_season_stats`
  MODIFY `team_season_stats_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `token_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1752;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user_league_role`
--
ALTER TABLE `user_league_role`
  MODIFY `user_league_role_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `user_role_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `venue`
--
ALTER TABLE `venue`
  MODIFY `venue_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `conferences`
--
ALTER TABLE `conferences`
  ADD CONSTRAINT `conferences_relation_league_id` FOREIGN KEY (`league_id`) REFERENCES `league` (`league_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `division`
--
ALTER TABLE `division`
  ADD CONSTRAINT `division_relation_conference` FOREIGN KEY (`conference_id`) REFERENCES `conferences` (`conference_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `division_relation_league` FOREIGN KEY (`league_id`) REFERENCES `league` (`league_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `game`
--
ALTER TABLE `game`
  ADD CONSTRAINT `game_relation_away` FOREIGN KEY (`away_team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `game_relation_home` FOREIGN KEY (`home_team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `game_relation_season` FOREIGN KEY (`season_id`) REFERENCES `season` (`season_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `game_relation_venue` FOREIGN KEY (`venue_id`) REFERENCES `venue` (`venue_id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `league`
--
ALTER TABLE `league`
  ADD CONSTRAINT `league_relation_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `league_news`
--
ALTER TABLE `league_news`
  ADD CONSTRAINT `league_news_relation_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `league_news_relation_league` FOREIGN KEY (`league_id`) REFERENCES `league` (`league_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `league_role_permission`
--
ALTER TABLE `league_role_permission`
  ADD CONSTRAINT `league_role_permission_relation_permission` FOREIGN KEY (`league_permission_id`) REFERENCES `league_permission` (`league_permission_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `league_role_permission_relation_role` FOREIGN KEY (`league_role_id`) REFERENCES `league_role` (`league_role_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `player`
--
ALTER TABLE `player`
  ADD CONSTRAINT `player_relation_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_relation_permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `role_permissions_relation_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `season`
--
ALTER TABLE `season`
  ADD CONSTRAINT `season_relation_league` FOREIGN KEY (`league_id`) REFERENCES `league` (`league_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `team_relation_conference` FOREIGN KEY (`conference_id`) REFERENCES `conferences` (`conference_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `team_relation_division` FOREIGN KEY (`division_id`) REFERENCES `division` (`division_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `team_relation_league_id` FOREIGN KEY (`league_id`) REFERENCES `league` (`league_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `team_relation_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `team_game_stats`
--
ALTER TABLE `team_game_stats`
  ADD CONSTRAINT `team_game_stats_relation_2` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `team_game_stats_relation_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `team_news`
--
ALTER TABLE `team_news`
  ADD CONSTRAINT `team_news_relation_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `team_news_relation_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `team_season`
--
ALTER TABLE `team_season`
  ADD CONSTRAINT `team_season_relation_season` FOREIGN KEY (`season_id`) REFERENCES `season` (`season_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `team_season_relation_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `team_season_stats`
--
ALTER TABLE `team_season_stats`
  ADD CONSTRAINT `team_season_stats_relation_team_season` FOREIGN KEY (`team_season_id`) REFERENCES `team_season` (`team_season_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `token_relation_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `user_league_role`
--
ALTER TABLE `user_league_role`
  ADD CONSTRAINT `user_league_role_relation_league` FOREIGN KEY (`league_id`) REFERENCES `league` (`league_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_league_role_relation_role` FOREIGN KEY (`league_role_id`) REFERENCES `league_role` (`league_role_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_league_role_relation_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_relation_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_roles_relation_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `venue`
--
ALTER TABLE `venue`
  ADD CONSTRAINT `venue_relation_league` FOREIGN KEY (`league_id`) REFERENCES `league` (`league_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
