import 'dotenv/config';

export const config = {
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
  apiBaseURL: process.env.API_BASE_URL || 'http://localhost:3001',

  timeout: Number(process.env.PW_TIMEOUT || 30000),
  expectTimeout: Number(process.env.PW_EXPECT_TIMEOUT || 8000),

  webServerCommand: process.env.PW_WEB_SERVER_COMMAND,

  webServerTimeout: Number(process.env.PW_WEB_SERVER_TIMEOUT || 120000),
};