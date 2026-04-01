import { seededUser } from '../../config/test-data';
import { test, expect } from './ui-test';

test.describe('Smoke tests', () => {
  test('user can login', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(seededUser.username, seededUser.password);

    await expect(loginPage.navigationHome).toBeVisible();
  });

  test('transaction feed loads after login', async ({ loginPage, feedPage }) => {
    await loginPage.goto();
    await loginPage.login(seededUser.username, seededUser.password);

    await feedPage.expectLoaded();
  });
});