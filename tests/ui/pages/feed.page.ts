import { Locator, Page, expect } from '@playwright/test';

export class FeedPage {
  readonly transactionList: Locator;
  readonly personalTab: Locator;
  readonly returnToTransactionsButton: Locator;

  constructor(private page: Page) {
    this.transactionList = page.getByTestId('transaction-list');
    this.personalTab = page.getByTestId('nav-personal-tab');
    this.returnToTransactionsButton = page.getByTestId('new-transaction-return-to-transactions');
  }

  async expectLoaded() {
    await expect(this.transactionList).toBeVisible();
  }

  async returnToTransactions() {
    await this.returnToTransactionsButton.click();
    await this.expectLoaded();
  }

  transactionByNote(note: string) {
    return this.page.locator('[data-test^="transaction-item-"]', { hasText: note }).first();
  }

  async expectTransactionVisible(amount: number, note: string) {
    await this.personalTab.click();
    await this.expectLoaded();

    const transaction = this.transactionByNote(note);

    await expect(transaction).toBeVisible();
    await expect(transaction).toContainText(note);
    await expect(transaction.locator('[data-test^="transaction-amount-"]').first()).toContainText(
      `-$${amount.toFixed(2)}`
    );
  }
}
