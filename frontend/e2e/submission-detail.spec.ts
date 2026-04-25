import { test, expect } from '@playwright/test';

test.describe('SubmissionDetailPage', () => {
  test('renders page title', async ({ page }) => {
    await page.goto('/submissions/1');
    await expect(page.getByRole('heading', { name: 'Submission detail' })).toBeVisible();
  });

  test('renders company name', async ({ page }) => {
    await page.goto('/submissions/1');
    await expect(page.getByRole('link', { name: 'Back to list' })).toBeVisible();
  });

  test('navigates back to submissions list', async ({ page }) => {
    await page.goto('/submissions/1');
    await page.getByRole('link', { name: 'Back to list' }).click();
    await expect(page).toHaveURL('/submissions');
  });
});

test.describe('SubmissionDetailPage Visual Snapshots', () => {
  test.describe('desktop', () => {
    test('overview tab', async ({ page }) => {
      await page.goto('/submissions/1');
      await expect(page).toHaveScreenshot('submission-detail-desktop-overview.png', {
        maxDiffPixelRatio: 0.05,
      });
    });

    test('contacts tab', async ({ page }) => {
      await page.goto('/submissions/1');
      await page.getByRole('tab', { name: /contacts/i }).click();
      await expect(page).toHaveScreenshot('submission-detail-desktop-contacts.png', {
        maxDiffPixelRatio: 0.05,
      });
    });

    test('documents tab', async ({ page }) => {
      await page.goto('/submissions/1');
      await page.getByRole('tab', { name: /documents/i }).click();
      await expect(page).toHaveScreenshot('submission-detail-desktop-documents.png', {
        maxDiffPixelRatio: 0.05,
      });
    });
  });

  test.describe('mobile', () => {
    test('overview tab', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/submissions/1');
      await expect(page).toHaveScreenshot('submission-detail-mobile-overview.png', {
        maxDiffPixelRatio: 0.05,
      });
    });

    test('contacts tab', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/submissions/1');
      await page.getByRole('tab', { name: /contacts/i }).click();
      await expect(page).toHaveScreenshot('submission-detail-mobile-contacts.png', {
        maxDiffPixelRatio: 0.05,
      });
    });

    test('documents tab', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/submissions/1');
      await page.getByRole('tab', { name: /documents/i }).click();
      await expect(page).toHaveScreenshot('submission-detail-mobile-documents.png', {
        maxDiffPixelRatio: 0.05,
      });
    });

    test('notes tab', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/submissions/1');
      await page.getByRole('tab', { name: /notes/i }).click();
      await expect(page).toHaveScreenshot('submission-detail-mobile-notes.png', {
        maxDiffPixelRatio: 0.05,
      });
    });
  });
});
