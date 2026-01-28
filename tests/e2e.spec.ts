import { test, expect } from '@playwright/test';

test.describe('Enterprise Access Console E2E Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for hydration/network to be idle to improve stability
    // await page.waitForLoadState('networkidle'); // Can be flaky if network never idles
    await page.waitForTimeout(500); // explicit wait for hydration as fallback
  });

  test('should show validation error when fields are empty', async ({ page }) => {
    await page.getByTestId('sign-in-btn').click();
    await expect(page.getByTestId('validation-error')).toContainText('Both fields required');
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await page.getByTestId('login-email').pressSequentially('invalid-email');
    await page.getByTestId('login-password').pressSequentially('password123');
    // Ensure values are set
    await expect(page.getByTestId('login-email')).toHaveValue('invalid-email');
    await expect(page.getByTestId('login-password')).toHaveValue('password123');

    await page.getByTestId('sign-in-btn').click();
    await expect(page.getByTestId('validation-error')).toContainText('Invalid email format');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.getByTestId('login-email').pressSequentially('test@example.com');
    await page.getByTestId('login-password').pressSequentially('password123');
    // Ensure values are set
    await expect(page.getByTestId('login-email')).toHaveValue('test@example.com');
    await expect(page.getByTestId('login-password')).toHaveValue('password123');

    await page.getByTestId('sign-in-btn').click();

    await expect(page.getByTestId('toast-message')).toContainText('Login successful');
    await expect(page.getByTestId('profile-role')).toBeVisible();
    await expect(page.getByTestId('logout-btn')).toBeVisible();
  });

  test('should handle password reset flow', async ({ page }) => {
    await page.getByTestId('reset-password-btn').click();
    await expect(page.getByTestId('reset-confirm-email')).toBeVisible();

    await page.getByTestId('reset-confirm-email').pressSequentially('test@example.com');
    await page.getByTestId('reset-confirm-btn').click();

    await expect(page.getByTestId('toast-message')).toContainText('Credentials reset sent to email');
    await expect(page.getByTestId('reset-confirm-email')).not.toBeVisible();
  });

  test.describe('Authenticated User Actions', () => {
    test.beforeEach(async ({ page }) => {
      // Perform login before each test in this block
      await page.getByTestId('login-email').pressSequentially('test@example.com');
      await page.getByTestId('login-password').pressSequentially('password123');
      await expect(page.getByTestId('login-email')).toHaveValue('test@example.com');
      await expect(page.getByTestId('login-password')).toHaveValue('password123');
      await page.getByTestId('sign-in-btn').click();
      await expect(page.getByTestId('profile-role')).toBeVisible();
    });

    test('should update profile role and status', async ({ page }) => {
      await page.getByTestId('profile-role').selectOption('Manager');
      await page.getByTestId('profile-status').selectOption('Inactive');
      await page.getByTestId('save-profile-btn').click();

      await expect(page.getByTestId('toast-message')).toContainText('Changes saved successfully');

      // Verify values persist (in client state)
      await expect(page.getByTestId('profile-role')).toHaveValue('Manager');
      await expect(page.getByTestId('profile-status')).toHaveValue('Inactive');
    });

    test('should update access settings', async ({ page }) => {
      await page.getByTestId('save-access-btn').click();
      await expect(page.getByTestId('toast-message')).toContainText('Access settings updated');
    });

    test('should logout successfully', async ({ page }) => {
      await page.getByTestId('logout-btn').click();
      await expect(page.getByTestId('toast-message')).toContainText('Logged out successfully');
      await expect(page.getByTestId('sign-in-btn')).toBeVisible();
    });
  });
});
