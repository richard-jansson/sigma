CREATE TABLE users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username char(64),
    password char(64),
    email char(128)
);

CREATE TABLE config(
    cfg_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    cfg_key char(64),
    cfg_val char(64)
);

CREATE TABLE stats(
    sess_id INT AUTO_INCREMENT PRIMARY KEY, 
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    req char(255) 
);
