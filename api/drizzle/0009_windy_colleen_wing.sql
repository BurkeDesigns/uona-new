CREATE TABLE `files` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`updated_at` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`deleted_at` text,
	`uid` integer,
	`path` text,
	`name` text,
	`type` text,
	`size` integer,
	`group` text,
	`tags` text,
	`description` text,
	`metadata` text,
	`expires` text,
	`locked` integer,
	FOREIGN KEY (`uid`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`locked`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
