import { test, expect } from '@playwright/test';
import { createApiContext, loginAsSeededUser } from './support/api-client';

type TransactionResult = {
  id: string;
  amount: number;
  status: string;
  senderName: string;
  receiverName: string;
  createdAt: string;
};

test('GET /transactions returns paginated results within the performance budget', async () => {
  const apiContext = await createApiContext();

  await loginAsSeededUser(apiContext);

  const startedAt = Date.now();
  const response = await apiContext.get('/transactions', {
    params: { page: 1, limit: 10 },
  });
  const durationMs = Date.now() - startedAt;

  await expect(response).toBeOK();
  expect(durationMs).toBeLessThan(800);

  const body = (await response.json()) as {
    pageData: {
      page: number;
      limit: number;
      hasNextPages: boolean;
      totalPages: number;
    };
    results: TransactionResult[];
  };

  expect(response.headers()['content-type']).toContain('application/json');
  expect(body.pageData).toEqual(
    expect.objectContaining({
      page: 1,
      limit: 10,
      hasNextPages: expect.any(Boolean),
      totalPages: expect.any(Number),
    })
  );
  expect(body.results).toEqual(expect.any(Array));

  if (body.results.length > 0) {
    expect(body.results[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        amount: expect.any(Number),
        status: expect.any(String),
        senderName: expect.any(String),
        receiverName: expect.any(String),
        createdAt: expect.any(String),
      })
    );
    expect(Number.isNaN(Date.parse(body.results[0].createdAt))).toBeFalsy();
  }

  await apiContext.dispose();
});
