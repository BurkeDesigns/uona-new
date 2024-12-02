PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`updated_at` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`deleted_at` text,
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
INSERT INTO `__new_users`("id", "updated_at", "created_at", "deleted_at", "last_login", "name", "email", "phone", "image", "type", "group", "job_title", "notes") SELECT "id", "updated_at", "created_at", "deleted_at", "last_login", "name", "email", "phone", "image", "type", "group", "job_title", "notes" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);