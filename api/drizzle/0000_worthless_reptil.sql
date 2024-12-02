CREATE TABLE `access` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uid` integer,
	`type` text,
	`resource_id` text,
	`access_level` text,
	`created_on` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`uid`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_on` text DEFAULT (CURRENT_TIMESTAMP),
	`last_login` text DEFAULT (CURRENT_TIMESTAMP),
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`image` text,
	`type` text,
	`group` text,
	`job_title` text,
	`notes` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);