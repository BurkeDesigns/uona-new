CREATE TABLE `form_responses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`form` integer NOT NULL,
	`uid` integer,
	`updated_at` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`deleted_at` text,
	`data` text NOT NULL,
	`metadata` text,
	`status` text DEFAULT 'submitted',
	`reviewer` integer,
	`notes` text,
	`version` integer DEFAULT 1,
	FOREIGN KEY (`form`) REFERENCES `forms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`uid`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reviewer`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `forms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uid` integer,
	`updated_at` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`deleted_at` text,
	`status` text DEFAULT 'draft',
	`title` text NOT NULL,
	`description` text,
	`images` text,
	`fields` text,
	`metadata` text,
	`settings` text,
	`expires` text,
	`version` integer DEFAULT 1,
	FOREIGN KEY (`uid`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
