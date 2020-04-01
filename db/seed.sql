CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    password VARCHAR(250),
    username VARCHAR(30)
    profile_pic TEXT
    );

CREATE TABLE user_posts (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    img TEXT,
    content TEXT,
    author_id INT REFERENCES users(user_id)
    );