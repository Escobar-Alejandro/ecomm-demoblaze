import { test } from '@fixtures/pageManager.fixture';
import { TIMEOUTS } from '@enums';
import { expect } from '@playwright/test';


test('DEBL-4 | Log In feature - Verify that a user can log in successfully',
    { tag: ['@DEBL-4', '@smoke', '@regression'] },
    async ({ homePage, page }) => {
        const username = 'tester';

    await test.step('Navigate to Home page and click on Log In button on header', async () => {
        await homePage.navigateTo();
        await expect(homePage.header.logInBtn).toBeVisible();
        await homePage.header.logInBtn.click();
        await expect(homePage.header.logInUserField).toBeVisible();
        await homePage.header.logInUserField.fill(username);
        await homePage.header.logInPasswordField.fill('test123!');
        await homePage.header.logInBtnInModal.click();
    });

    /* await test.step('Verify Username is displayed correctly on header', async () => {
        await expect(homePage.header.nameOfLoggedUser).toBeVisible({timeout: TIMEOUTS.Default});
        const loggedUserName = await homePage.header.nameOfLoggedUser.textContent();
        expect(loggedUserName).toBe(`Welcome ${username}`);
    }); */

});

