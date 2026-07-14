CREATE TABLE `spotifyConfig` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`spotifyUserId` varchar(255) NOT NULL,
	`spotifyEmail` varchar(320),
	`spotifyDisplayName` varchar(255),
	`accessToken` text NOT NULL,
	`refreshToken` text,
	`selectedPlaylistId` varchar(255),
	`selectedPlaylistName` varchar(255),
	`tokenExpiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `spotifyConfig_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `spotifyConfig` ADD CONSTRAINT `spotifyConfig_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;