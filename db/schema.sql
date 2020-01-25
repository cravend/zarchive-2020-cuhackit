CREATE TEMPORARY TABLE medicines (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO medicines (name) VALUES ('dummy medicine');

CREATE TEMPORARY TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

-- many to many relationship: user <=> medicine
CREATE TEMPORARY TABLE schedules (
  id SERIAL PRIMARY KEY,
  medicine INT NOT NULL REFERENCES medicines(id),
  user_id INT NOT NULL REFERENCES users(id),
  weekdays VARCHAR(7) NOT NULL
);

CREATE TEMPORARY TABLE taken (
  id SERIAL PRIMARY KEY,
  medicine INT NOT NULL REFERENCES medicines(id),
  user_id INT NOT NULL REFERENCES users(id),
  datetime TIMESTAMP NOT NULL
);
