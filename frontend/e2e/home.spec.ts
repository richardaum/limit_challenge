import { test, expect } from '@playwright/test';

test.describe('HomePage', () => {
  test('renders page title', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Submission Tracker Challenge' })).toBeVisible();
  });

  test('renders go to submissions button', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Go to Submissions' })).toBeVisible();
  });

  test('navigates to submissions page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Go to Submissions' }).click();
    await expect(page).toHaveURL('/submissions');
    await expect(page.getByRole('heading', { name: 'Submissions' })).toBeVisible();
  });
});

test.describe('HomePage Visual Snapshots', () => {
  test('desktop', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      maxDiffPixelRatio: 0.05,
    });
  });

  test('mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});
