import { createPaymentDetails, seededUser } from '../../config/test-data';
import { test } from './ui-test';

test.describe('Payment flow', () => {
  test('creates a payment and shows it in the personal feed', async ({
    loginPage,
    contactsPage,
    paymentPage,
    feedPage,
  }) => {
    const { amount, note } = createPaymentDetails();

    await test.step('Authenticate with a seeded user', async () => {
      await loginPage.goto();
      await loginPage.login(seededUser.username, seededUser.password);
    });

    await test.step('Start a new payment and select a recipient', async () => {
      await contactsPage.openNewTransaction();
      await contactsPage.selectFirstAvailableContact();
    });

    await test.step('Submit the payment', async () => {
      await paymentPage.send(amount, note);
    });

    await test.step('Verify the new payment is visible in the personal feed', async () => {
      await feedPage.returnToTransactions();
      await feedPage.expectTransactionVisible(amount, note);
    });
  });
});
