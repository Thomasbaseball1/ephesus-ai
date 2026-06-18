CREATE TABLE `intake_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company_name` text NOT NULL,
	`contact_email` text,
	`data` text NOT NULL,
	`created_at` text NOT NULL
);
