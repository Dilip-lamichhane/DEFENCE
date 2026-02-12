-- Enable PostGIS extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create shops table
CREATE TABLE shops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    location GEOGRAPHY(POINT, 4326) -- PostGIS Geography Point with WGS84 SRID
);

-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    shop_id INTEGER NOT NULL,
    CONSTRAINT fk_shop
        FOREIGN KEY(shop_id) 
        REFERENCES shops(id)
        ON DELETE CASCADE
);

-- Create spatial index for better performance
CREATE INDEX idx_shops_location ON shops USING GIST (location);

-- Create index on shop_id for products table
CREATE INDEX idx_products_shop_id ON products(shop_id);