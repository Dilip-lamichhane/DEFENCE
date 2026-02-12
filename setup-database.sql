-- Step 1: Enable PostGIS extension (run this first)
CREATE EXTENSION IF NOT EXISTS postgis;

-- Step 2: Create shops table
CREATE TABLE IF NOT EXISTS shops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    location GEOGRAPHY(POINT, 4326)
);

-- Step 3: Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    shop_id INTEGER NOT NULL,
    CONSTRAINT fk_shop
        FOREIGN KEY(shop_id) 
        REFERENCES shops(id)
        ON DELETE CASCADE
);

-- Step 4: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_shops_location ON shops USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_products_shop_id ON products(shop_id);

-- Step 5: Verify tables were created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('shops', 'products');

-- Step 6: Check PostGIS extension
SELECT postgis_version();