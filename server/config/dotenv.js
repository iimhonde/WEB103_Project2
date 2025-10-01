import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Resolve absolute path: config/ -> server/ -> .env
const envPath = resolve(__dirname, '..', '.env');
console.log('Looking for .env at:', envPath);

const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error('Error loading .env:', result.error);
} else {
    console.log('✅ Loaded environment variables:', Object.keys(result.parsed || {}));
}