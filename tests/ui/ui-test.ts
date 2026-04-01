import { test as base, expect } from '@playwright/test';
import { ContactsPage } from './pages/contacts.page';
import { FeedPage } from './pages/feed.page';
import { LoginPage } from './pages/login.page';
import { PaymentPage } from './pages/payment.page';

type UiFixtures = {
  loginPage: LoginPage;
  contactsPage: ContactsPage;
  paymentPage: PaymentPage;
  feedPage: FeedPage;
};

export const test = base.extend<UiFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  contactsPage: async ({ page }, use) => {
    await use(new ContactsPage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  feedPage: async ({ page }, use) => {
    await use(new FeedPage(page));
  },
});

export { expect };