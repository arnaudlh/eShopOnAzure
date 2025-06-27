import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

// Check if environment variables are set
if (!process.env.USERNAME1) {
  throw new Error('USERNAME1 environment variable is not set. Please set it in your repository secrets as PLAYWRIGHT_USERNAME.');
}
if (!process.env.PASSWORD) {
  throw new Error('PASSWORD environment variable is not set. Please set it in your repository secrets as PLAYWRIGHT_PASSWORD.');
}

setup('Login', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Ready for a new adventure?' })).toBeVisible();

  await page.getByLabel('Sign in').click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  await page.getByPlaceholder('Username').fill(process.env.USERNAME1!);
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Ready for a new adventure?' })).toBeVisible();
  await page.context().storageState({ path: STORAGE_STATE });
})
