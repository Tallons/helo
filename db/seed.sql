CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    password varchar(250),
    username varchar(30)
    );

CREATE TABLE user_posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    post text
    );