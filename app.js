require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const QRCode = require('qrcode');
const fs = require('fs').promises;

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection configuration
const pool = new Pool({
  user: process.env.DB_USER || 'your_username',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'inventory_db',
  password: process.env.DB_PASSWORD || 'your_password',
  port: process.env.DB_PORT || 5432,
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Create public/qr directory if it doesn't exist
async function ensureQRDirectory() {
  try {
    await fs.access('./public/qr');
  } catch {
    await fs.mkdir('./public/qr', { recursive: true });
  }
}

// Database initialization
async function initDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        unique_id VARCHAR(255) UNIQUE NOT NULL,
        type VARCHAR(255) NOT NULL,
        dept VARCHAR(255) NOT NULL,
        serial_no VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        hazard VARCHAR(255) NOT NULL,
        data_sensitivity VARCHAR(255) NOT NULL,
        date_decommissioned DATE,
        item_url VARCHAR(500) NOT NULL,
        qr_code_path VARCHAR(500),
        qr_svg_data TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database table initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    client.release();
  }
}

// Generate QR Code function
async function generateQRCode(unique_id, item_url) {
  try {
    // QR Code options with high contrast and error correction
    const qrOptions = {
      errorCorrectionLevel: 'M', // Medium error correction
      type: 'png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',  // High contrast black
        light: '#FFFFFF'  // High contrast white
      },
      width: 300, // Minimum 300px for 30mm at 300 DPI printing
      height: 300
    };

    // Generate PNG QR Code
    const qrCodeBuffer = await QRCode.toBuffer(item_url, qrOptions);
    const qrCodePath = `./public/qr/${unique_id}.png`;
    await fs.writeFile(qrCodePath, qrCodeBuffer);

    // Generate SVG QR Code for scalability
    const svgOptions = {
      errorCorrectionLevel: 'M',
      type: 'svg',
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    };

    const svgString = await QRCode.toString(item_url, svgOptions);

    return {
      qrCodePath: `/qr/${unique_id}.png`,
      svgData: svgString
    };
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

// Routes

// Home route - display form
app.get('/', (req, res) => {
  res.render('form', { message: null });
});

// Display all items
app.get('/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items ORDER BY created_at DESC');
    res.render('items', { items: result.rows });
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).send('Error fetching items');
  }
});

// Display single item by unique_id
app.get('/item/:unique_id', async (req, res) => {
  try {
    const { unique_id } = req.params;
    const result = await pool.query('SELECT * FROM items WHERE unique_id = $1', [unique_id]);
    
    if (result.rows.length === 0) {
      return res.status(404).send('Item not found');
    }
    
    res.render('item-detail', { item: result.rows[0] });
  } catch (err) {
    console.error('Error fetching item:', err);
    res.status(500).send('Error fetching item');
  }
});

// Download QR Code as PNG
app.get('/qr/:unique_id/png', async (req, res) => {
  try {
    const { unique_id } = req.params;
    const result = await pool.query('SELECT * FROM items WHERE unique_id = $1', [unique_id]);
    
    if (result.rows.length === 0) {
      return res.status(404).send('Item not found');
    }

    const qrPath = path.join(__dirname, 'public', 'qr', `${unique_id}.png`);
    res.download(qrPath, `item-${unique_id}-qr.png`);
  } catch (err) {
    console.error('Error downloading QR code:', err);
    res.status(500).send('Error downloading QR code');
  }
});

// Download QR Code as SVG
app.get('/qr/:unique_id/svg', async (req, res) => {
  try {
    const { unique_id } = req.params;
    const result = await pool.query('SELECT qr_svg_data FROM items WHERE unique_id = $1', [unique_id]);
    
    if (result.rows.length === 0) {
      return res.status(404).send('Item not found');
    }

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Content-Disposition', `attachment; filename="item-${unique_id}-qr.svg"`);
    res.send(result.rows[0].qr_svg_data);
  } catch (err) {
    console.error('Error downloading SVG QR code:', err);
    res.status(500).send('Error downloading SVG QR code');
  }
});

// Handle form submission
app.post('/submit', async (req, res) => {
  try {
    const {
      type,
      dept,
      serial_no,
      category,
      hazard,
      data_sensitivity,
      date_decommissioned
    } = req.body;

    // Generate unique ID
    const unique_id = uuidv4();
    
    // Generate URL
    const website_name = process.env.WEBSITE_NAME || 'inventory.example.com';
    const item_url = `https://${website_name}/item/${unique_id}`;

    // Generate QR Code
    await ensureQRDirectory();
    const { qrCodePath, svgData } = await generateQRCode(unique_id, item_url);

    // Insert into database
    const query = `
      INSERT INTO items (unique_id, type, dept, serial_no, category, hazard, data_sensitivity, date_decommissioned, item_url, qr_code_path, qr_svg_data)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;
    
    const values = [
      unique_id,
      type,
      dept,
      serial_no,
      category,
      hazard,
      data_sensitivity,
      date_decommissioned || null,
      item_url,
      qrCodePath,
      svgData
    ];

    const result = await pool.query(query, values);
    
    res.render('form', { 
      message: {
        type: 'success',
        text: `Item created successfully! Unique ID: ${unique_id}`,
        url: item_url,
        qrCode: qrCodePath,
        item: result.rows[0]
      }
    });
    
  } catch (err) {
    console.error('Error creating item:', err);
    res.render('form', { 
      message: {
        type: 'error',
        text: 'Error creating item. Please try again.'
      }
    });
  }
});

// API endpoint to get item data as JSON
app.get('/api/item/:unique_id', async (req, res) => {
  try {
    const { unique_id } = req.params;
    const result = await pool.query('SELECT * FROM items WHERE unique_id = $1', [unique_id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Bulk QR Code generation endpoint (for existing items)
app.post('/generate-qr-bulk', async (req, res) => {
  try {
    const result = await pool.query('SELECT unique_id, item_url FROM items WHERE qr_code_path IS NULL');
    const items = result.rows;
    
    await ensureQRDirectory();
    let processed = 0;
    
    for (const item of items) {
      try {
        const { qrCodePath, svgData } = await generateQRCode(item.unique_id, item.item_url);
        
        await pool.query(
          'UPDATE items SET qr_code_path = $1, qr_svg_data = $2 WHERE unique_id = $3',
          [qrCodePath, svgData, item.unique_id]
        );
        
        processed++;
      } catch (error) {
        console.error(`Error generating QR for item ${item.unique_id}:`, error);
      }
    }
    
    res.json({ 
      message: `Generated QR codes for ${processed} items`,
      processed: processed,
      total: items.length 
    });
  } catch (err) {
    console.error('Error in bulk QR generation:', err);
    res.status(500).json({ error: 'Error generating QR codes' });
  }
});

// Start server
async function startServer() {
  try {
    await initDatabase();
    await ensureQRDirectory();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      console.log('QR Code Features:');
      console.log('- PNG format: 300x300px (30mm at 300 DPI)');
      console.log('- SVG format: Scalable for any print size');
      console.log('- Error correction level: M (Medium)');
      console.log('- High contrast black/white colors');
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

startServer();