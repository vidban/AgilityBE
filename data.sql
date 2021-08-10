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

CREATE TABLE public.categories (
	id SERIAL PRIMARY KEY,
	category_name text NOT NULL	
)

CREATE TABLE pivot-table {
	categoryId integer NOT NULL,
	eventId integer NOT NULL,
	userId integer NOT NULL,
	todoId integer NOT NULL
}

CREATE TABLE images(
	id SERIAL PRIMARY KEY,
	img_name text NOT NULL,
	img_desc text NOT NULL,
	img_by text NOT NULL,
	img_by_link text NOT NULL,
	site_name text NOT NULL,
	site_url text NOT NULL
);

INSERT INTO images (img_name,img_desc,img_by, img_by_link,site_name,site_url) 
VALUES ('morning1.jpg','Taking The Scenic Route','v2osk', 'https://unsplash.com/@v2osk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText', 'unsplash', 'https://unsplash.com/s/photos/nature?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' ),
('morning2.jpg', 'Multnoman falls','Blake Richard Verdoorn', 'https://unsplash.com/@blakeverdoorn?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' , 'Unsplash', 'https://unsplash.com/s/photos/nature?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'),
('morning3.jpg', 'not known', 'Robert Lukeman', 'https://unsplash.com/@robertlukeman?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText', 'unsplash', 'https://unsplash.com/s/photos/nature?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' ),
('morning4.jpg', 'Kalepa Ridge, Hawaii', 'Jelle de Gier', 'https://unsplash.com/@vultured?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText', 'unsplash', 'https://unsplash.com/s/photos/j-d-geier-hawaii?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
),
('morning5.jpg', 'North Shore,  Waialua USA','Sean Oulashin', 'https://unsplash.com/@oulashin?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText', 'unsplash', 'https://unsplash.com/s/photos/j-d-geier-hawaii?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' )
;

  