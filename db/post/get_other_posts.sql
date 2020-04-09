SELECT up.title, up.img, up.content, u.username, u.profile_pic FROM user_posts up
   JOIN  users u ON u.user_id = up.author_id
   WHERE NOT up.post_id = $1;