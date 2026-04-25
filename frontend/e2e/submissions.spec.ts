import { test, expect } from '@playwright/test';

test.describe('SubmissionsPage', () => {
  test('renders page title', async ({ page }) => {
    await page.goto('/submissions');
    await expect(page.getByRole('heading', { name: 'Submissions' })).toBeVisible();
  });

  test('renders status filter', async ({ page }) => {
    await page.goto('/submissions');
    await expect(page.getByLabel(/status/i)).toBeVisible();
  });

  test('renders broker filter', async ({ page }) => {
    await page.goto('/submissions');
    await expect(page.getByLabel(/broker/i)).toBeVisible();
  });

  test('renders company search input', async ({ page }) => {
    await page.goto('/submissions');
    await expect(page.getByLabel(/company search/i)).toBeVisible();
  });
});

test.describe('SubmissionsPage Visual Snapshots', () => {
  test('desktop', async ({ page }) => {
    await page.goto('/submissions');
    await expect(page).toHaveScreenshot('submissions-desktop.png', {
      maxDiffPixelRatio: 0.05,
    });
  });

  test('mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/submissions');
    await expect(page).toHaveScreenshot('submissions-mobile.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});
