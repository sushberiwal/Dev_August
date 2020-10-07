CREATE TABLE user_table(
    uid VARCHAR(255) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
     phone BIGINT NOT NULL UNIQUE,
     email VARCHAR(200) UNIQUE,
     handle VARCHAR(50) NOT NULL UNIQUE,
     bio VARCHAR(100) ,
     is_verified Boolean DEFAULT FALSE,
     is_public Boolean DEFAULT TRUE
 )



 