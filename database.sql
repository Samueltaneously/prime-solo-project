
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Table for user data
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(80) UNIQUE NOT NULL,
  "password" VARCHAR(1000) NOT NULL,
  "profile_pic_url" TEXT
);

-- Table for dream data
CREATE TABLE "dream" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "dream_description" TEXT NOT NULL,
  "dream_interpretation" TEXT,
  "dream_title" VARCHAR(90),
  timestamp timestamp default current_timestamp,
  "dream_image_url" TEXT,
  FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);

--  Dummy data for dream table for user with user_id of 1
INSERT INTO "dream" ("user_id", "dream_description", "dream_interpretation", "dream_title", "date", "dream_image_url")
VALUES
  (1, 'I had a dream about flying through the clouds.', 'I interpret this dream as a desire for freedom.', 'Flying in the Sky', '2023-09-01', 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Dream-Wallpapers-HD.jpg'),

  (1, 'In my dream, I was exploring an ancient castle.', 'I think this dream represents my curiosity.', 'Exploring Castle', '2023-09-02', 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Dream-Wallpapers-HD-For-Desktop.jpg'),

  (1, 'I dreamed of a peaceful beach with golden sands.', 'This dream brings me a sense of tranquility.', 'Peaceful Beach', '2023-09-03', 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Dream-Wallpapers-HD-Free-Download.jpg'),

  (1, 'I had a dream about a beautiful waterfall in a forest.', 'Waterfalls symbolize emotions for me.', 'Enchanted Waterfall', '2023-09-04', 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Backgrounds-Dream-Download-Free.jpg'),

  (1, 'My dream was about meeting an old friend I haven''t seen in years.', 'I believe this dream reflects my longing for connection.', 'Reunion with Friend', '2023-09-05', 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Desktop-Dream-Photos-Download.jpg'),

  (1, 'I had a dream about flying on a dragon over a mystical land.', 'This dream felt like an adventure.', 'Dragon Adventure', '2023-09-06', 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Download-dream-pictures.jpg'),

  (1, 'My dream was about solving a complex puzzle.', 'I think this dream relates to problem-solving in my life.', 'Puzzle Solving', '2023-09-07', 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Dream-Free-Photos.jpg'),

  (1, 'I dreamed of being in a bustling market in a foreign city.', 'This dream made me want to travel.', 'Foreign Market', '2023-09-08', 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Dream-Photos-HD.jpg'),

  (1, 'My dream was about winning a race.', 'I felt a sense of accomplishment in this dream.', 'Race Victory', '2023-09-09', 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Free-Desktop-Dream-HD-Images.jpg'),

  (1, 'I had a dream about a magical forest with talking animals.', 'This dream was like a fairy tale.', 'Magical Forest', '2023-09-10', 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Free-dream-wallpaper.jpg'),

  (1, 'My dream was about exploring an ancient temple.', 'I felt a sense of awe and reverence.', 'Ancient Temple', '2023-09-11', 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Free-HD-Dream-Wallpapers.jpg'),

  (1, 'I dreamed of flying through a field of stars.', 'This dream felt otherworldly.', 'Starry Flight', '2023-09-12', 'https://www.pixelstalk.net/wp-content/uploads/2016/11/HD-Backgrounds-Dream.jpg'),

  (1, 'My dream was about a peaceful garden.', 'I found serenity in this dream.', 'Peaceful Garden', '2023-09-13', 'https://www.pixelstalk.net/wp-content/uploads/2016/11/HD-dream-world-wallpaper.jpg'),

  (1, 'I had a dream about exploring an underwater city.', 'This dream felt like an adventure under the sea.', 'Underwater Adventure', '2023-09-14', 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Images-Download-Dream-HD.jpg'),

  (1, 'My dream was about flying like a bird.', 'I felt a sense of freedom in this dream.', 'Bird in Flight', '2023-09-15', 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Pictures-Download-Dream-HD.jpg'),

  (1, 'I dreamed of a mystical forest with glowing trees.', 'This dream felt magical.', 'Mystical Forest', '2023-09-16', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Okk2kJYelUQRaznR8ImJOQHaE8%26pid%3DApi&f=1&ipt=b8645390cc8f67ff86b207318fef08bb5640af33c9bdb9fb5679bf5f706dac11&ipo=images'),

  (1, 'My dream was about exploring an ancient temple in the jungle.', 'I felt like an archaeologist.', 'Jungle Temple Exploration', '2023-09-17', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.AUMMtUGkIA7_r-ivaxAFLAHaEc%26pid%3DApi&f=1&ipt=fac077d25aad4553b6b36c829ef4440aad4edbac865d9d4d2eb1be3ae0d6e4bf&ipo=images'),

  (1, 'I had a dream about flying on a magic carpet.', 'This dream felt like a journey through Arabian Nights.', 'Magic Carpet Ride', '2023-09-18', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.vSDHynUCdpiw3Bl4o-X8hAHaE8%26pid%3DApi&f=1&ipt=a644c51587c9f03f5fdab729a6f04edd990f1864bd43bcd9b075705374a26ef0&ipo=images'),

  (1, 'My dream was about exploring an ancient pyramid.', 'I felt like an adventurer in Egypt.', 'Pyramid Adventure', '2023-09-19', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.PNAhvQce_be9LtYZZ2GIegHaEK%26pid%3DApi&f=1&ipt=d2eaadf01990e4d3c6b7f5417c42c71a014a18aa7c065ba7d6d438c5dd9c4589&ipo=images');


-- Better Dummy data

INSERT INTO "dream" ("user_id", "dream_description")
VALUES
  (1, 'Had a dream about flying in the sky.'),
  (1, 'Dreamed of a tropical beach vacation.'),
  (1, 'Dreamt of meeting my childhood friends.'),
  (1, 'Had a nightmare about being chased by a monster.'),
  (1, 'Dreamed of a world without any worries.'),
  (1, 'Dreamt of becoming a famous musician.'),
  (1, 'Had a dream about exploring space.'),
  (1, 'Dreamed of a grand feast with family and friends.'),
  (1, 'Dreamt of winning the lottery.'),
  (1, 'Had a dream about traveling the world.');


  -- END sql