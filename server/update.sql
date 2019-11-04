ALTER TABLE cities ADD COLUMN  limitation bool DEFAULT false;
ALTER TABLE jobs ADD COLUMN id_area INT;
ALTER TABLE personas ADD COLUMN id_area INT;
ALTER TABLE users ADD CONSTRAINT facebookId UNIQUE (facebookId);