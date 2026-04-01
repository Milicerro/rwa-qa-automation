import { APIRequestContext, expect, request } from '@playwright/test';
import { config } from '../../../config/env';
import { seededUser } from '../../../config/test-data';

export async function createApiContext() {
  return request.newContext({ baseURL: config.apiBaseURL });
}

export async function loginAsSeededUser(apiContext: APIRequestContext) {
  const response = await apiContext.post('/login', {
    data: {
      username: seededUser.username,
      password: seededUser.password,
    },
  });

  await expect(response).toBeOK();
  return response;
}