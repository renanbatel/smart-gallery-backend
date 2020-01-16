CREATE TABLE `images` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `title` varchar(256) NOT NULL,
  `description` text NULL,
  `labels` text NULL,
  `filename` varchar(40) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);
