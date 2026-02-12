const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://qbimoqxwrcqamnghiear.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiaW1vcXh3cmNxYW1uZ2hpZWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NzQ4ODIsImV4cCI6MjA4NjQ1MDg4Mn0.EV4ZIxOVFZwy4aL1kfUO8imV4S_tZ8Hb5p8SEHtvI1E';

// Raw data from prompt.md
const rawData = [
  {
    "id": 1,
    "name": "The Lazy Griller",
    "category": "Restaurant",
    "address": "Mahapal Road, Lalitpur",
    "coordinates": { "lat": 27.6675, "lng": 85.3210 },
    "products": [
      { "id": 101, "name": "Chicken Burger", "price": 320 },
      { "id": 102, "name": "Pork Chop Platter", "price": 650 },
      { "id": 103, "name": "Grilled Salmon", "price": 890 },
      { "id": 104, "name": "Caesar Salad", "price": 280 },
      { "id": 105, "name": "Iced Latte", "price": 180 },
      { "id": 106, "name": "French Fries", "price": 150 },
      { "id": 107, "name": "Mushroom Soup", "price": 220 },
      { "id": 108, "name": "Brownie with Ice Cream", "price": 250 },
      { "id": 109, "name": "Lemonade", "price": 120 },
      { "id": 110, "name": "Veggie Wrap", "price": 200 }
    ]
  },
  {
    "id": 2,
    "name": "Newari Dhaba",
    "category": "Restaurant",
    "address": "Jawalakhel, Lalitpur",
    "coordinates": { "lat": 27.6950, "lng": 85.3170 },
    "products": [
      { "id": 111, "name": "Buff Choila", "price": 180 },
      { "id": 112, "name": "Buff Mo:Mo", "price": 120 },
      { "id": 113, "name": "Chatamari", "price": 100 },
      { "id": 114, "name": "Bara", "price": 60 },
      { "id": 115, "name": "Yomari", "price": 80 },
      { "id": 116, "name": "Aloo Chop", "price": 50 },
      { "id": 117, "name": "Thwon (Rice Beer)", "price": 150 },
      { "id": 118, "name": "Buff Sekuwa", "price": 200 },
      { "id": 119, "name": "Bhutan", "price": 160 },
      { "id": 120, "name": "Achar (Pickle)", "price": 40 }
    ]
  },
  {
    "id": 3,
    "name": "Delta Tech Store",
    "category": "Electronics",
    "address": "Kumaripati, Lalitpur",
    "coordinates": { "lat": 27.6680, "lng": 85.3200 },
    "products": [
      { "id": 201, "name": "Wireless Mouse", "price": 1200 },
      { "id": 202, "name": "Mechanical Keyboard", "price": 4500 },
      { "id": 203, "name": "27-inch Monitor", "price": 22000 },
      { "id": 204, "name": "USB-C Hub", "price": 1500 },
      { "id": 205, "name": "Bluetooth Speaker", "price": 3500 },
      { "id": 206, "name": "Laptop Stand", "price": 1800 },
      { "id": 207, "name": "HDMI Cable (2m)", "price": 400 },
      { "id": 208, "name": "Power Bank 10000mAh", "price": 2500 },
      { "id": 209, "name": "Webcam 1080p", "price": 3000 },
      { "id": 210, "name": "RGB Mouse Pad", "price": 900 }
    ]
  },
  {
    "id": 4,
    "name": "Smartcare Home Appliances",
    "category": "Electronics",
    "address": "Pulchowk, Lalitpur",
    "coordinates": { "lat": 27.6820, "lng": 85.3180 },
    "products": [
      { "id": 211, "name": "Air Conditioner (1.5 Ton)", "price": 55000 },
      { "id": 212, "name": "Front Load Washing Machine", "price": 45000 },
      { "id": 213, "name": "Refrigerator (300L)", "price": 38000 },
      { "id": 214, "name": "Microwave Oven", "price": 12000 },
      { "id": 215, "name": "Water Purifier", "price": 15000 },
      { "id": 216, "name": "Induction Cooktop", "price": 4000 },
      { "id": 217, "name": "Electric Kettle", "price": 1500 },
      { "id": 218, "name": "Vaccum Cleaner", "price": 8000 },
      { "id": 219, "name": "Hair Dryer", "price": 1200 },
      { "id": 220, "name": "Iron", "price": 1800 }
    ]
  },
  {
    "id": 5,
    "name": "Iron Temple Gym & Shop",
    "category": "Fitness",
    "address": "Satdobato, Lalitpur",
    "coordinates": { "lat": 27.6570, "lng": 85.3440 },
    "products": [
      { "id": 301, "name": "Monthly Membership Pass", "price": 2000 },
      { "id": 302, "name": "Whey Protein (1kg)", "price": 4500 },
      { "id": 303, "name": "Yoga Mat", "price": 1200 },
      { "id": 304, "name": "Resistance Bands Set", "price": 800 },
      { "id": 305, "name": "Dumbbells (5kg pair)", "price": 1500 },
      { "id": 306, "name": "Shaker Bottle", "price": 400 },
      { "id": 307, "name": "Lifting Gloves", "price": 700 },
      { "id": 308, "name": "Gym Bag", "price": 2500 },
      { "id": 309, "name": "Jump Rope", "price": 500 },
      { "id": 310, "name": "Pre-Workout Supplement", "price": 3500 }
    ]
  },
  {
    "id": 6,
    "name": "Zen Yoga Studio",
    "category": "Fitness",
    "address": "Jhamsikhel, Lalitpur",
    "coordinates": { "lat": 27.6710, "lng": 85.3100 },
    "products": [
      { "id": 311, "name": "Yoga Class Drop-in", "price": 500 },
      { "id": 312, "name": "Premium Yoga Mat", "price": 2500 },
      { "id": 313, "name": "Yoga Pants (Unisex)", "price": 1800 },
      { "id": 314, "name": "Meditation Cushion", "price": 900 },
      { "id": 315, "name": "Yoga Blocks (2pc)", "price": 600 },
      { "id": 316, "name": "Yoga Strap", "price": 300 },
      { "id": 317, "name": "Essential Oil Set", "price": 1200 },
      { "id": 318, "name": "Incense Sticks Pack", "price": 150 },
      { "id": 319, "name": "Breathing Exercise Device", "price": 1500 },
      { "id": 320, "name": "Tai Chi Shoes", "price": 1200 }
    ]
  },
  {
    "id": 7,
    "name": "Nepal Pharma Distributors",
    "category": "Health/Medicine",
    "address": "Lagankhel, Lalitpur",
    "coordinates": { "lat": 27.6630, "lng": 85.3220 },
    "products": [
      { "id": 401, "name": "N95 Face Mask (5pcs)", "price": 250 },
      { "id": 402, "name": "Digital Thermometer", "price": 500 },
      { "id": 403, "name": "Hand Sanitizer (500ml)", "price": 300 },
      { "id": 404, "name": "Vitamin C Tablets", "price": 150 },
      { "id": 405, "name": "Pain Relief Spray", "price": 250 },
      { "id": 406, "name": "First Aid Kit Box", "price": 800 },
      { "id": 407, "name": "Blood Pressure Monitor", "price": 2500 },
      { "id": 408, "name": "Bandage Roll", "price": 50 },
      { "id": 409, "name": "Antiseptic Liquid", "price": 120 },
      { "id": 410, "name": "Orthopedic Heating Pad", "price": 1500 }
    ]
  },
  {
    "id": 8,
    "name": "Herbal Life Store",
    "category": "Health/Medicine",
    "address": "Kupondole, Lalitpur",
    "coordinates": { "lat": 27.6880, "lng": 85.3150 },
    "products": [
      { "id": 411, "name": "Ashwagandha Powder", "price": 400 },
      { "id": 412, "name": "Aloe Vera Juice", "price": 350 },
      { "id": 413, "name": "Green Tea (Organic)", "price": 250 },
      { "id": 414, "name": "Honey (Raw)", "price": 500 },
      { "id": 415, "name": "Turmeric Capsules", "price": 600 },
      { "id": 416, "name": "Herbal Toothpaste", "price": 180 },
      { "id": 417, "name": "Neem Soap", "price": 80 },
      { "id": 418, "name": "Massage Oil", "price": 450 },
      { "id": 419, "name": "Chyawanprash", "price": 700 },
      { "id": 420, "name": "Herbal Shampoo", "price": 350 }
    ]
  },
  {
    "id": 9,
    "name": "Mahindra Auto Parts",
    "category": "Automobile",
    "address": "Ekantakuna, Lalitpur",
    "coordinates": { "lat": 27.6590, "lng": 85.3330 },
    "products": [
      { "id": 501, "name": "Engine Oil (5W30)", "price": 1500 },
      { "id": 502, "name": "Brake Pads (Front)", "price": 2500 },
      { "id": 503, "name": "Car Battery (60Ah)", "price": 8500 },
      { "id": 504, "name": "Air Filter", "price": 600 },
      { "id": 505, "name": "Tire (195/55 R16)", "price": 7500 },
      { "id": 506, "name": "Car Shampoo", "price": 450 },
      { "id": 507, "name": "Microfiber Cloth Set", "price": 300 },
      { "id": 508, "name": "Tire Inflator (Portable)", "price": 2000 },
      { "id": 509, "name": "Car Vacuum Cleaner", "price": 2500 },
      { "id": 510, "name": "Headlight Bulb (LED)", "price": 1500 }
    ]
  },
  {
    "id": 10,
    "name": "Hero Bike Zone",
    "category": "Automobile",
    "address": "Kusunti, Lalitpur",
    "coordinates": { "lat": 27.6550, "lng": 85.3280 },
    "products": [
      { "id": 511, "name": "Bike Chain Spray", "price": 350 },
      { "id": 512, "name": "Helmet (ISI Marked)", "price": 2500 },
      { "id": 513, "name": "Bike Cover (Waterproof)", "price": 600 },
      { "id": 514, "name": "Mobile Phone Holder", "price": 500 },
      { "id": 515, "name": "Rear View Mirror", "price": 350 },
      { "id": 516, "name": "Disk Brake Oil", "price": 250 },
      { "id": 517, "name": "Spark Plug", "price": 150 },
      { "id": 518, "name": "Bike Horn", "price": 200 },
      { "id": 519, "name": "Seat Cover", "price": 400 },
      { "id": 520, "name": "Foot Rest (Alloy)", "price": 800 }
    ]
  }
];

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Transform coordinates to PostGIS POINT format
 * @param {Object} coordinates - Object with lat and lng properties
 * @returns {string} - PostGIS POINT string format: POINT(lng lat)
 */
function transformToPostGISPoint(coordinates) {
    return `POINT(${coordinates.lng} ${coordinates.lat})`;
}

/**
 * Clear existing data from database
 * Deletes products first (due to foreign key constraint), then shops
 */
async function clearExistingData() {
    console.log('Clearing existing data...');
    
    try {
        // Delete products first (foreign key constraint)
        const { error: productsError } = await supabase
            .from('products')
            .delete()
            .neq('id', 0); // Delete all products
        
        if (productsError) {
            console.warn('Warning when deleting products:', productsError.message);
        } else {
            console.log('✓ All products deleted');
        }
        
        // Delete shops
        const { error: shopsError } = await supabase
            .from('shops')
            .delete()
            .neq('id', 0); // Delete all shops
        
        if (shopsError) {
            console.warn('Warning when deleting shops:', shopsError.message);
        } else {
            console.log('✓ All shops deleted');
        }
        
        console.log('✓ Existing data cleared successfully');
    } catch (error) {
        console.error('Error clearing existing data:', error);
        throw error;
    }
}

/**
 * Insert shops and return mapping of old IDs to new IDs
 * @param {Array} shopsData - Array of shop objects
 * @returns {Object} - Mapping of old shop IDs to new Supabase IDs
 */
async function insertShops(shopsData) {
    console.log(`Inserting ${shopsData.length} shops...`);
    
    const idMapping = {};
    
    for (const shop of shopsData) {
        try {
            // Prepare shop data with PostGIS location
            const shopData = {
                name: shop.name,
                category: shop.category,
                address: shop.address,
                latitude: shop.coordinates.lat,
                longitude: shop.coordinates.lng,
                location: transformToPostGISPoint(shop.coordinates)
            };
            
            const { data, error } = await supabase
                .from('shops')
                .insert(shopData)
                .select()
                .single();
            
            if (error) {
                console.error(`Error inserting shop "${shop.name}":`, error);
                throw error;
            }
            
            // Map old ID to new ID
            idMapping[shop.id] = data.id;
            console.log(`✓ Inserted shop: ${shop.name} (old ID: ${shop.id} → new ID: ${data.id})`);
            
        } catch (error) {
            console.error(`Failed to insert shop "${shop.name}":`, error);
            throw error;
        }
    }
    
    console.log(`✓ Successfully inserted ${shopsData.length} shops`);
    return idMapping;
}

/**
 * Insert products using the shop ID mapping
 * @param {Array} shopsData - Array of shop objects with products
 * @param {Object} idMapping - Mapping of old shop IDs to new Supabase IDs
 */
async function insertProducts(shopsData, idMapping) {
    console.log('Inserting products...');
    
    let totalProducts = 0;
    
    for (const shop of shopsData) {
        const newShopId = idMapping[shop.id];
        
        if (!newShopId) {
            console.warn(`Warning: No ID mapping found for shop ID ${shop.id}`);
            continue;
        }
        
        try {
            // Prepare products data for this shop
            const productsData = shop.products.map(product => ({
                name: product.name,
                price: product.price,
                shop_id: newShopId
            }));
            
            const { error } = await supabase
                .from('products')
                .insert(productsData);
            
            if (error) {
                console.error(`Error inserting products for shop "${shop.name}":`, error);
                throw error;
            }
            
            totalProducts += productsData.length;
            console.log(`✓ Inserted ${productsData.length} products for shop: ${shop.name}`);
            
        } catch (error) {
            console.error(`Failed to insert products for shop "${shop.name}":`, error);
            throw error;
        }
    }
    
    console.log(`✓ Successfully inserted ${totalProducts} products total`);
}

/**
 * Main seeding function
 */
async function seedDatabase() {
    console.log('🌱 Starting database seeding...');
    console.log('Supabase URL:', SUPABASE_URL);
    
    try {
        // Step 1: Clear existing data
        await clearExistingData();
        
        // Step 2: Insert shops and get ID mapping
        const idMapping = await insertShops(rawData);
        
        // Step 3: Insert products using the ID mapping
        await insertProducts(rawData, idMapping);
        
        console.log('🎉 Database seeding completed successfully!');
        console.log(`📊 Summary:`);
        console.log(`   - Shops inserted: ${rawData.length}`);
        console.log(`   - Products inserted: ${rawData.reduce((sum, shop) => sum + shop.products.length, 0)}`);
        
    } catch (error) {
        console.error('❌ Database seeding failed:', error);
        process.exit(1);
    }
}

/**
 * Verify database connection and run seeder
 */
async function main() {
    try {
        // Test Supabase connection
        console.log('Testing Supabase connection...');
        const { data, error } = await supabase
            .from('shops')
            .select('id')
            .limit(1);
        
        if (error) {
            console.error('❌ Failed to connect to Supabase:', error);
            console.error('Please verify your Supabase URL and anon key are correct.');
            process.exit(1);
        }
        
        console.log('✓ Supabase connection successful');
        
        // Run the seeder
        await seedDatabase();
        
    } catch (error) {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    } finally {
        // Exit the script
        process.exit(0);
    }
}

// Run the main function
if (require.main === module) {
    main();
}

module.exports = { seedDatabase, transformToPostGISPoint };