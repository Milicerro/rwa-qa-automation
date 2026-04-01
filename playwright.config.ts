import { defineConfig, devices } from '@playwright/test';
import { config as app } from './config/env';

const webServer = app.webServerCommand
  ? {
      command: app.webServerCommand,
      url: app.baseURL,
      reuseExistingServer: !process.env.CI,
      timeout: app.webServerTimeout,
    }
  : undefined;

export default defineConfig({
  testDir: './tests',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  timeout: app.timeout,
  expect: { timeout: app.expectTimeout },
  use: {
    baseURL: app.baseURL,
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
  webServer,
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
