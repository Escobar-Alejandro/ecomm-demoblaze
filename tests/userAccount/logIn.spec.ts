import { test } from '@fixtures/pageManager.fixture';
import { TIMEOUTS } from '@models/enums/Timeouts';
import { expect } from '@playwright/test';


test('DEBL-4 | Log in form',
    { tag: ['@DEBL-4', '@smoke', '@regression'] },
    async ({ homePage }) => {
        const username = 'tester';

        await test.step('Navigate to Home page', async () => {
            await homePage.navigateTo();
            await expect(homePage.header.logInBtn).toBeVisible();
        });

        await test.step('Click on Log In button on header', async () => {
            await homePage.header.logInBtn.click();
            await expect(homePage.header.logInUserField).toBeVisible();
        });

        await test.step('Fill in the log in form and click login', async () => {
            await homePage.header.logInUserField.fill(username);
            await homePage.header.logInPasswordField.fill('test123!');
            await homePage.header.logInBtnInModal.click();
        });

        await test.step('Verify Username is displayed correctly on header', async () => {
            await expect(homePage.header.nameOfLoggedUser, 'User was not logged in after clicking login').toBeVisible({ timeout: TIMEOUTS.Default });
            const loggedUserName = homePage.header.nameOfLoggedUser;
            await expect(loggedUserName, `Expected username to be "Welcome ${username}"`).toHaveText(`Welcome ${username}`);
        });

    });

