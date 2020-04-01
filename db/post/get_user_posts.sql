SELECT up.title, up.img, up.content, u.username FROM user_posts up
   JOIN  users u ON u.user_id = up.author_id


--SELECT pt.trainer_name, p.pokemon_name FROM pokemon_trainer pt
--       JOIN pokemon p ON pt.trainer_id = p.trainer_id;

