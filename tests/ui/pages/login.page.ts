import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly errorMessage: Locator;
  readonly navigationHome: Locator;

  constructor(private page: Page) {
    this.username = page.getByTestId('signin-username').locator('input');
    this.password = page.getByTestId('signin-password').locator('input');
    this.submit = page.getByTestId('signin-submit');
    this.errorMessage = page.getByTestId('signin-error');
    this.navigationHome = page.getByTestId('sidenav-home');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForURL(/\/signin$/);
    await this.expectLoaded();
  }

  async expectLoaded() {
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.submit).toBeVisible();
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await expect(this.username).toHaveValue(user);
    await this.password.fill(pass);
    await expect(this.password).toHaveValue(pass);
    await expect(this.submit).toBeEnabled();
    await this.submit.click();

    await Promise.race([
      this.page.waitForURL((url) => !url.pathname.endsWith('/signin')),
      this.errorMessage.waitFor({ state: 'visible' }),
    ]);

    await expect(this.errorMessage).toHaveCount(0);
    await expect(this.navigationHome).toBeVisible();
  }
}
