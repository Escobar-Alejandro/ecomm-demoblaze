import { test } from '@fixtures/pageManager.fixture';
import { expect } from '@playwright/test';


test('DEBL-3 | Sign Up feature - Verify that a user can sign up successfully',
    { tag: ['@DEBL-3', '@smoke', '@regression'] },
    async ({ homePage }) => {

    await test.step('Navigate to Home page and click on Sign Up button on header', async () => {
        await homePage.navigateTo();
        await expect(homePage.header.signUpBtn).toBeVisible();
        await homePage.header.signUpBtn.click();
        await expect(homePage.header.signUpUserField).toBeVisible();
        await homePage.header.signUpUserField.fill('tester');
        await homePage.header.signUpPasswordField.fill('test123!');
        await homePage.header.signUpBtnInModal.click();
    });

});
