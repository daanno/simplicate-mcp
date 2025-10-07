import dotenv from 'dotenv';
import path from 'path';

// Load .env from the project root directory
const envPath = path.join(__dirname, '../../.env');
dotenv.config({ path: envPath });

export interface Config {
  simplicate: {
    apiKey: string;
    apiSecret: string;
    baseUrl: string;
  };
}

function validateConfig(): Config {
  const apiKey = process.env.SIMPLICATE_API_KEY;
  const apiSecret = process.env.SIMPLICATE_API_SECRET;
  const baseUrl = process.env.SIMPLICATE_API_BASE_URL;

  if (!apiKey || !apiSecret) {
    throw new Error(
      'Missing Simplicate API credentials. Please set SIMPLICATE_API_KEY and SIMPLICATE_API_SECRET in your .env file.'
    );
  }

  if (!baseUrl) {
    throw new Error(
      'Missing Simplicate API base URL. Please set SIMPLICATE_API_BASE_URL in your .env file.'
    );
  }

  return {
    simplicate: {
      apiKey,
      apiSecret,
      baseUrl,
    },
  };
}

export const config = validateConfig();

