import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.com/');
  await page.getByRole('link', { name: 'Sign in', exact: true }).click();
  await page.goto('https://www.amazon.com/');
  await expect(page.getByRole('link', { name: 'Amazon', exact: true })).toBeVisible();
});