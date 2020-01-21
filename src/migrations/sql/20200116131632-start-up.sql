CREATE TABLE `image` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(52) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NULL,
  `labels` text NULL,
  `filename` varchar(50) NOT NULL,
  `status` enum('active', 'deleted') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);
