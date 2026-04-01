import { test, expect } from '@playwright/test';
import { seededUser } from '../../config/test-data';
import { createApiContext, loginAsSeededUser } from './support/api-client';

test('POST /login authenticates the seeded user', async () => {
  const apiContext = await createApiContext();
  const response = await loginAsSeededUser(apiContext);

  const body = await response.json();

  expect(response.headers()['content-type']).toContain('application/json');
  expect(body).toEqual(
    expect.objectContaining({
      user: expect.objectContaining({
        id: expect.any(String),
        username: seededUser.username,
      }),
    })
  );
  expect(response.headers()['set-cookie']).toContain('connect.sid=');

  await apiContext.dispose();
});
