
import { Locator, Page, expect } from '@playwright/test';

export class ContactsPage {
  readonly newTransactionButton: Locator;
  readonly usersList: Locator;
  readonly searchInput: Locator;
  readonly userItems: Locator;
  readonly transactionForm: Locator;

  constructor(private page: Page) {
    this.newTransactionButton = page.getByTestId('nav-top-new-transaction');
    this.usersList = page.getByTestId('users-list');
    this.searchInput = page.getByTestId('user-list-search-input');
    this.userItems = page.locator('[data-test^="user-list-item-"]');
    this.transactionForm = page.getByTestId('transaction-create-form');
  }

  async openNewTransaction() {
    await this.newTransactionButton.click();
    await expect(this.usersList).toBeVisible();
  }

  async selectFirstAvailableContact() {
    const firstUser = this.userItems.first();
    await expect(firstUser).toBeVisible();
    await firstUser.click();
    await expect(this.transactionForm).toBeVisible();
  }

  async selectContact(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    const matchingUser = this.userItems.filter({ hasText: searchTerm }).first();
    await expect(matchingUser).toBeVisible();
    await matchingUser.click();
    await expect(this.transactionForm).toBeVisible();
  }
}