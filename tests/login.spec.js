const { test, expect } = require('@playwright/test');

test.describe('Authorization on Sauce Demo', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('User should successfully log in', async ({ page }) => {
        await page.locator('#user-name').fill('standard_user');

        await page.locator('[placeholder="Password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('User should see an error message when entering invalid credentials', async ({ page }) => {
        await page.locator('#user-name').fill('locked_out_user');

        await page.locator('[placeholder="Password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });
});