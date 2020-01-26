CREATE TABLE IF NOT EXISTS medicines (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- many to many relationship: user <=> medicine
CREATE TABLE IF NOT EXISTS schedules (
  id SERIAL PRIMARY KEY,
  medicine INT NOT NULL REFERENCES medicines(id),
  user_id INT NOT NULL REFERENCES users(id),
  weekdays VARCHAR(7) NOT NULL,
  time_taken time NOT NULL,
  CONSTRAINT no_duplicate_schedule UNIQUE (medicine, user_id)
);

-- many to many relationship: user <=> medicine
CREATE TABLE IF NOT EXISTS taken (
  id SERIAL PRIMARY KEY,
  medicine INT NOT NULL REFERENCES medicines(id),
  user_id INT NOT NULL REFERENCES users(id),
  datetime TIMESTAMP NOT NULL,
  CONSTRAINT no_duplicate_medicine UNIQUE (medicine, user_id, datetime)
);
