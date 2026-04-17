import { type Locator, type Page } from '@playwright/test';

export class SandboxPage {
    readonly page: Page;

    // Challenge 1: Authentication Form
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly rememberCheckbox: Locator;
    readonly loginButton: Locator;
    readonly logoutButton: Locator;
    readonly welcomeMessage: Locator;
    readonly loginForm: Locator;

    // Challenge 2: Dynamic Elements
    readonly fetchButton: Locator;
    readonly loadingSpinner: Locator;
    readonly dataResult: Locator;

    // Challenge 3: State Verification (Counter)
    readonly counterValue: Locator;
    readonly incrementButton: Locator;
    readonly decrementButton: Locator;
    readonly resetButton: Locator;

    // Challenge 4: Hover Interactions
    readonly dropdownTrigger: Locator;
    readonly dropdownMenu: Locator;
    readonly profileSettingsItem: Locator;

    // Challenge 5: Dialog Handling
    readonly triggerConfirmButton: Locator;
    readonly dialogStatus: Locator;

    // Challenge 6: Select Dropdown
    readonly colorSelectBox: Locator;
    readonly selectResult: Locator;

    constructor(page: Page) {
        this.page = page;

        // Auth
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.rememberCheckbox = page.locator('#remember-me');
        this.loginButton = page.locator('#login-btn');
        this.logoutButton = page.locator('#logout-btn');
        this.welcomeMessage = page.locator('#welcome-message');
        this.loginForm = page.locator('#login-form');

        // Dynamic
        this.fetchButton = page.locator('#load-data-btn');
        this.loadingSpinner = page.locator('#loading-spinner');
        this.dataResult = page.locator('#data-result');

        // Counter
        this.counterValue = page.locator('#counter-value');
        this.incrementButton = page.locator('#increment-btn');
        this.decrementButton = page.locator('#decrement-btn');
        this.resetButton = page.locator('#reset-btn');

        // Hover
        this.dropdownTrigger = page.locator('.dropdown-trigger');
        this.dropdownMenu = page.locator('#dropdown-content');
        this.profileSettingsItem = page.locator('#menu-action-1');

        // Dialog
        this.triggerConfirmButton = page.locator('#trigger-confirm-btn');
        this.dialogStatus = page.locator('#dialog-status');

        // Select
        this.colorSelectBox = page.locator('#color-select');
        this.selectResult = page.locator('#select-result');
    }

    async goto() {
        await this.page.goto('/');
    }

    // --- Abstracted Domain Specific Actions ---

    async loginFully(email: string, pass: string, remember: boolean = true) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(pass);
        if (remember) {
            await this.rememberCheckbox.check();
        }
        await this.loginButton.click();
    }

    async fetchDynamicData() {
        await this.fetchButton.click();
    }
}
