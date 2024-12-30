PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_forms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uid` integer,
	`updated_at` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`deleted_at` text,
	`status` text DEFAULT 'draft',
	`title` text NOT NULL,
	`description` text,
	`type` text DEFAULT 'form',
	`groups` text,
	`images` text,
	`fields` text,
	`metadata` text,
	`settings` text,
	`expires` text,
	`version` integer DEFAULT 1,
	FOREIGN KEY (`uid`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_forms`("id", "uid", "updated_at", "created_at", "deleted_at", "status", "title", "description", "type", "groups", "images", "fields", "metadata", "settings", "expires", "version") SELECT "id", "uid", "updated_at", "created_at", "deleted_at", "status", "title", "description", "type", "groups", "images", "fields", "metadata", "settings", "expires", "version" FROM `forms`;--> statement-breakpoint
DROP TABLE `forms`;--> statement-breakpoint
ALTER TABLE `__new_forms` RENAME TO `forms`;--> statement-breakpoint
PRAGMA foreign_keys=ON;