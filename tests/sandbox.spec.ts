import { test, expect } from '@playwright/test';
import { SandboxPage } from '../pages/SandboxPage';

test.describe('Sandbox Challenge Tests (POM Architecture)', () => {
    let sandbox: SandboxPage;

    test.beforeEach(async ({ page }) => {
        // Initialize our Page Object Model with the current browser page
        sandbox = new SandboxPage(page);
        await sandbox.goto();
    });

    test('Challenge 1: Authentication Form', async ({ page }) => {
        // Use credentials from environment variables
        const email = process.env.TEST_USER_EMAIL || 'test@tester.com';
        const password = process.env.TEST_USER_PASSWORD || 'password123';

        // Use our abstracted POM test helper
        await sandbox.loginFully(email, password, true);

        // Assert success dynamically via the POM locators
        await expect(sandbox.welcomeMessage).toBeVisible();
        await expect(sandbox.welcomeMessage.locator('h3')).toHaveText('Welcome back!');

        // Logout
        await sandbox.logoutButton.click();
        await expect(sandbox.loginForm).toBeVisible();
    });

    test('Challenge 2: Dynamic Elements Auto-waiting', async () => {
        // Start fetch seamlessly from the component function
        await sandbox.fetchDynamicData();

        // Spinner should appear immediately
        await expect(sandbox.loadingSpinner).toBeVisible();

        // Assert loaded state natively using the isolated locators
        await expect(sandbox.dataResult).toBeVisible({ timeout: 5000 });
        await expect(sandbox.dataResult).toContainText('Data successfully loaded from server.');
    });

    test('Challenge 3: State Verification (Counter)', async () => {
        // Verify default state utilizing POM locators directly
        await expect(sandbox.counterValue).toHaveText('0');

        // Execute DOM clicks intuitively
        await sandbox.incrementButton.click();
        await sandbox.incrementButton.click();
        await expect(sandbox.counterValue).toHaveText('2');

        await sandbox.decrementButton.click();
        await expect(sandbox.counterValue).toHaveText('1');

        await sandbox.resetButton.click();
        await expect(sandbox.counterValue).toHaveText('0');
    });

    test('Challenge 4: Hover Interactions', async () => {
        // Hidden by default
        await expect(sandbox.dropdownMenu).toBeHidden();

        // Playwright explicit hover event
        await sandbox.dropdownTrigger.hover();

        // Exposed successfully
        await expect(sandbox.dropdownMenu).toBeVisible();
        await expect(sandbox.profileSettingsItem).toHaveText('Profile Settings');
    });

    test('Challenge 5: Dialog and Alert Handling', async ({ page }) => {
        // We still need the page object to hook events
        page.once('dialog', async dialog => {
            expect(dialog.message()).toBe('Are you sure you want to delete this?');
            await dialog.accept();
        });

        // Trigger leveraging the POM
        await sandbox.triggerConfirmButton.click();

        // Verify state mutated upon acceptance
        await expect(sandbox.dialogStatus).toHaveText('Confirmed');
    });

    test('Challenge 6: Select Dropdown', async () => {
        // Assert initial blank
        await expect(sandbox.selectResult).toHaveText('None');

        // Select the "blue" option using value
        await sandbox.colorSelectBox.selectOption('blue');

        // Assert state correctly mapped it
        await expect(sandbox.selectResult).toHaveText('blue');

        // Select using label explicitly
        await sandbox.colorSelectBox.selectOption({ label: 'Green' });
        await expect(sandbox.selectResult).toHaveText('green');
    });

    test('Challenge 7: File Upload', async () => {
        // Provide the path to a dummy file to upload
        await sandbox.fileUploadInput.setInputFiles('tests/dummy-upload.txt');
        
        // Assert the file name appears in the DOM
        await expect(sandbox.uploadResult).toHaveText('dummy-upload.txt');
    });

    test('Challenge 8: Drag and Drop', async () => {
        // Assert initial state
        await expect(sandbox.dropTarget).toHaveText('Drop Here');

        // Playwright utility for easy drag and drop
        await sandbox.dragSource.dragTo(sandbox.dropTarget);

        // Assert success state change
        await expect(sandbox.dropTarget).toHaveText('Dropped!');
    });

    test('Challenge 9: Network Mocking (API Intercept)', async ({ page }) => {
        // Intercept the outgoing API request from the frontend
        await page.route('https://jsonplaceholder.typicode.com/users/1', async route => {
            // Fulfill the request with our own MOCKED response!
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ name: 'Playwright Mocked Agent' }),
            });
        });

        // Trigger the request in UI
        await sandbox.fetchUserButton.click();

        // The UI should show our mocked text, NOT the real API response
        await expect(sandbox.apiUserResult).toHaveText('Playwright Mocked Agent');
    });
});

test.describe('Sandbox Visual Regression', () => {
    let sandbox: SandboxPage;

    test.beforeEach(async ({ page }) => {
        sandbox = new SandboxPage(page);
        await sandbox.goto();
    });

    test('should match the full page snapshot', async ({ page }) => {
        // This will take a screenshot and compare it against the golden baseline
        // If the baseline doesn't exist, it will create it on the first run.
        await expect(page).toHaveScreenshot('landing-page.png', {
            fullPage: true,
            maxDiffPixels: 100 // Allow for minor sub-pixel rendering differences
        });
    });

    test('should match the login card component snapshot', async () => {
        // You can also capture specific components instead of the whole page!
        await expect(sandbox.loginForm).toHaveScreenshot('login-card.png');
    });
});
