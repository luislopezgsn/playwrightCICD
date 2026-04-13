import { test, expect } from '@playwright/test';

test.describe('Sandbox Challenge Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Challenge 1: Authentication Form', async ({ page }) => {
        // Fill credentials using ids
        await page.locator('#email').fill('test@tester.com');
        await page.locator('#password').fill('password123');

        // Interact with checkbox
        await page.locator('#remember-me').check();
        await expect(page.locator('#remember-me')).toBeChecked();

        // Submit and assert success state
        await page.locator('#login-btn').click();
        await expect(page.locator('#welcome-message')).toBeVisible();
        await expect(page.locator('#welcome-message h3')).toHaveText('Welcome back!');

        // Logout
        await page.locator('#logout-btn').click();
        await expect(page.locator('#login-form')).toBeVisible();
    });

    test('Challenge 2: Dynamic Elements Auto-waiting', async ({ page }) => {
        const fetchBtn = page.locator('#load-data-btn');

        // Start fetch
        await fetchBtn.click();

        // Spinner should appear immediately
        await expect(page.locator('#loading-spinner')).toBeVisible();

        // Playwright automatically waits for this logic to resolve up to the timeout.
        // The spinner takes 2s, Playwright will just wait dynamically!
        await expect(page.locator('#data-result')).toBeVisible({ timeout: 5000 });
        await expect(page.locator('#data-result')).toContainText('Data successfully loaded from server.');
    });

    test('Challenge 3: State Verification (Counter)', async ({ page }) => {
        const counterValue = page.locator('#counter-value');

        // Default is 0
        await expect(counterValue).toHaveText('0');

        // Click increase twice
        await page.locator('#increment-btn').click();
        await page.locator('#increment-btn').click();
        await expect(counterValue).toHaveText('2');

        // Click decrease once
        await page.locator('#decrement-btn').click();
        await expect(counterValue).toHaveText('1');

        // Reset
        await page.locator('#reset-btn').click();
        await expect(counterValue).toHaveText('0');
    });

    test('Challenge 4: Hover Interactions', async ({ page }) => {
        const dropdownMenu = page.locator('#dropdown-content');

        // Menu is hidden by default
        await expect(dropdownMenu).toBeHidden();

        // Hover over the target
        await page.locator('.dropdown-trigger').hover();

        // Now it should be visible
        await expect(dropdownMenu).toBeVisible();

        // Click a menu item
        const action1 = page.locator('#menu-action-1');
        await expect(action1).toHaveText('Profile Settings');
    });

});
