SELECT * FROM user_posts up
    JOIN  users u ON u.user_id = up.author_id
    WHERE up.title LIKE '%'|| $1 || '%' AND u.user_id = $2;

-- SELECT up.title, up.img, up.content, u.username, u.profile_pic FROM user_posts up
--    JOIN  users u ON u.user_id = up.author_id
--    WHERE up.post_id = $1;