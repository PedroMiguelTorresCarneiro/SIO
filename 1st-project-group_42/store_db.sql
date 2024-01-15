-- Create Users Table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,                         -- add email
    user_role ENUM('admin', 'customer') NOT NULL
);

-- Create Categories Table
CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

-- Create Products Table
CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    product_image TEXT,
    category_id INT REFERENCES Categories(category_id),
    stock_quantity INT NOT NULL
);

-- Create CartItems Table
CREATE TABLE CartItems (
    cart_item_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    product_id INT REFERENCES Products(product_id),
    quantity INT NOT NULL,
    UNIQUE(user_id, product_id)                                     -- prevent duplicate rows
);

-- Create Orders Table
CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    order_date TIMESTAMP NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,                             -- add total price
    shiping_address TEXT NOT NULL,                                  -- add shiping address
    status ENUM('pending', 'shipped', 'delivered') NOT NULL
);

-- Create OrderItems Table
CREATE TABLE OrderItems (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES Orders(order_id),
    product_id INT REFERENCES Products(product_id),
    product_price DECIMAL (10,2) NOT NULL                           -- add price, because product price may change
    quantity INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL
);

-- Create Reviews Table
CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    product_id INT REFERENCES Products(product_id),
    rating INT NOT NULL,
    review_text TEXT,
    created_at TIMESTAMP DEFAULT current_timestamp                  -- add time of creation for better tracking                    
);