-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);

-- 插入示例用户数据
INSERT INTO users (username, password) VALUES
  ('user1', 'password1'),
  ('user2', 'password2'),
  ('user3', 'password3');

-- 创建账单表
CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  amount REAL NOT NULL,
  date DATE NOT NULL
);

-- 插入示例账单数据
INSERT INTO transactions (user_id, title, amount, date) VALUES
  (1, 'Groceries', 50.0, '2023-01-15'),
  (1, 'Dinner', 30.0, '2023-01-17'),
  (2, 'Gas', 40.0, '2023-01-16'),
  (2, 'Coffee', 5.0, '2023-01-18');

-- 创建类别表
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

-- 插入示例类别数据
INSERT INTO categories (name) VALUES
  ('Food'),
  ('Transportation'),
  ('Entertainment');

-- 创建账单-类别关联表
CREATE TABLE IF NOT EXISTS transaction_categories (
  transaction_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  FOREIGN KEY (transaction_id) REFERENCES transactions (id),
  FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- 插入示例账单-类别关联数据
INSERT INTO transaction_categories (transaction_id, category_id) VALUES
  (1, 1), -- Groceries -> Food
  (2, 1), -- Dinner -> Food
  (3, 2), -- Gas -> Transportation
  (4, 2), -- Coffee -> Transportation;
