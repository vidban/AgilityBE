CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL,
	photo_url TEXT
);

CREATE TABLE events (
	id SERIAL PRIMARY KEY,
	userId INTEGER REFERENCES users ON DELETE CASCADE,
	title TEXT NOT NULL,
	_start TIMESTAMPTZ NOT NULL,
	_end TIMESTAMPTZ NOT NULL,
	allDay BOOLEAN DEFAULT 'false',
	color TEXT NOT NULL
);

CREATE TABLE todos (
	id SERIAL PRIMARY KEY,
	eventId INTEGER NOT NULL REFERENCES events ON DELETE CASCADE,
	todo_name TEXT NOT NULL,
	completed BOOLEAN DEFAULT 'false'
);

