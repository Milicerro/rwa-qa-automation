import { Locator, Page, expect } from '@playwright/test';

export class PaymentPage {
  readonly amountInput: Locator;
  readonly descriptionInput: Locator;
  readonly submitPaymentButton: Locator;
  readonly returnToTransactionsButton: Locator;

  constructor(private page: Page) {
    this.amountInput = page.getByTestId('transaction-create-amount-input').locator('input');
    this.descriptionInput = page
      .getByTestId('transaction-create-description-input')
      .locator('input');
    this.submitPaymentButton = page.getByTestId('transaction-create-submit-payment');
    this.returnToTransactionsButton = page.getByTestId('new-transaction-return-to-transactions');
  }

  async expectLoaded() {
    await expect(this.amountInput).toBeVisible();
    await expect(this.descriptionInput).toBeVisible();
    await expect(this.submitPaymentButton).toBeVisible();
  }

  async send(amount: number, note: string) {
    await this.expectLoaded();

    await this.amountInput.fill(String(amount));
    await this.descriptionInput.fill(note);

    await expect(this.submitPaymentButton).toBeEnabled();
    await this.submitPaymentButton.click();

    await expect(this.returnToTransactionsButton).toBeVisible();
  }
}