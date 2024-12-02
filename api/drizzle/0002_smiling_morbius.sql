CREATE TABLE `pages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uid` integer NOT NULL,
	`updated_at` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`deleted_at` text,
	`status` text DEFAULT 'draft',
	`type` text NOT NULL,
	`slug` text NOT NULL,
	`group` text,
	`author` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`content` text NOT NULL,
	`expires` text,
	FOREIGN KEY (`uid`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_access` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uid` integer,
	`type` text,
	`resource_id` text,
	`access_level` text,
	`updated_at` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`deleted_at` text,
	`expires` text,
	FOREIGN KEY (`uid`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_access`("id", "uid", "type", "resource_id", "access_level", "updated_at", "created_at", "deleted_at", "expires") SELECT "id", "uid", "type", "resource_id", "access_level", "updated_at", "created_at", "deleted_at", "expires" FROM `access`;--> statement-breakpoint
DROP TABLE `access`;--> statement-breakpoint
ALTER TABLE `__new_access` RENAME TO `access`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `users` ADD `expires` text;