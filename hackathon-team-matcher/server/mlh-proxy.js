import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

// More permissive CORS configuration
app.use(cors({
  origin: '*', // Allow any origin temporarily for testing
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

app.use(express.json());

// Add a simple root route
app.get('/', (req, res) => {
  res.send('MLH Proxy Server is running. Available endpoints: POST /api/mlh/token, GET /api/mlh/user');
});

// Proxy endpoint for token exchange
app.post('/api/mlh/token', async (req, res) => {
  try {
    const { code, redirectUri } = req.body;
    
    // Get values from environment variables
    const clientId = process.env.VITE_MLH_CLIENT_ID;
    const clientSecret = process.env.VITE_MLH_CLIENT_SECRET;
    
    console.log('Exchanging code for access token...');
    console.log('Using redirect URI:', redirectUri);
    
    // Create form data for request
    const formData = new URLSearchParams();
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);
    formData.append('code', code);
    formData.append('redirect_uri', redirectUri);
    formData.append('grant_type', 'authorization_code');
    
    const response = await fetch('https://beta.my.mlh.io/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('MLH token exchange error:', errorData);
      return res.status(response.status).send(errorData);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Server proxy error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Proxy endpoint for user profile
app.get('/api/mlh/user', async (req, res) => {
  try {
    const { token } = req.query;
    
    console.log('Fetching MLH user profile...');
    const response = await fetch('https://beta.my.mlh.io/api/v4/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('MLH user profile error:', errorData);
      return res.status(response.status).send(errorData);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Server proxy error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`MLH Proxy server running on http://0.0.0.0:${port}`);
  console.log(`Access via GitHub Codespaces at: https://super-duper-pancake-x9q9rg7xjv7h97jg-3001.app.github.dev`);
});
