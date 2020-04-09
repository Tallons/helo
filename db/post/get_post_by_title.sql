SELECT * FROM user_posts up
    JOIN  users u ON u.user_id = up.author_id
    WHERE up.title LIKE '%'|| $1 || '%' AND NOT u.user_id = $2;

