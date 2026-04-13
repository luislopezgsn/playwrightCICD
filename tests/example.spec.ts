import { test, expect } from '@playwright/test';

test.describe('Sandbox Learning Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Navigate to the base URL before each test
        await page.goto('/');
    });

    test('should assert the page title or header', async ({ page }) => {
        // Write your first test here!
        // Example: await expect(page.locator('h1')).toBeVisible();

    });

    // Add more tests below as you learn Playwright:
    // e.g. test('should fill login form', async ({ page }) => { ... })

});
