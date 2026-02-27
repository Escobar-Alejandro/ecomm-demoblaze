import { test } from '@fixtures/pageManager.fixture';
import { expect } from '@playwright/test';


test('DEBL-3 | Sign Up feature - Try to sign up using an existing username and verify that appropriate error message is displayed',
    { tag: ['@DEBL-3', '@smoke', '@regression'] },
    async ({ homePage, page }) => {
        const username = `tester`;

        await test.step('Navigate to Home page', async () => {
            await homePage.navigateTo();
            await expect(homePage.header.signUpBtn).toBeVisible();
        });

        await test.step('Click on Sign Up button on header', async () => {
            await homePage.header.signUpBtn.click();
            await expect(homePage.header.signUpUserField).toBeVisible();
        });

        await test.step('Fill in the sign up form', async () => {
            await homePage.header.signUpUserField.fill(username);
            await homePage.header.signUpPasswordField.fill('test123!');
        });

        await test.step('Click Sign Up and verify error alert for existing username', async () => {
            const dialogPromise = page.waitForEvent('dialog');
            await homePage.header.signUpBtnInModal.click();
            const dialog = await dialogPromise;
            expect(dialog.message(), 'Expected error message for existing username').toContain('This user already exist');
        });

    });
