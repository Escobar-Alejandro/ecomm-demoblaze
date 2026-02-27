import { test } from '@fixtures/pageManager.fixture';
import { expect } from '@playwright/test';
import { TIMEOUTS } from '@enums';


test('DEBL-2 | Place an order for one product',
    { tag: ['@DEBL-2', '@smoke', '@regression'] },
    async ({ homePage, productDetailsPage, cartPage, page }) => {
        let productName: string | null;
        let productPrice: string | null;


    await test.step('Navigate to Home page and click on the first product', async () => {
        await homePage.navigateTo();
        await expect(homePage.productNameList.first()).toBeVisible({ timeout: TIMEOUTS.Default });
        await homePage.productNameList.first().click();
    });

    await test.step('Store product information and add it to cart', async () => {
        await expect(productDetailsPage.productName).toBeVisible();
        productName = await productDetailsPage.productName.textContent();
        productPrice = await productDetailsPage.productPrice.textContent();
        productPrice = productPrice?.split('$')[1]?.split(' ')[0] || null;
        console.log(`Selected product: ${productName} with price ${productPrice}`);
       
        

        await expect(productDetailsPage.addToCartBtn).toBeVisible();
        await expect(productDetailsPage.addToCartBtn).toBeEnabled();
        await productDetailsPage.addToCartBtn.click();
    });

    await test.step('Go to cart and verify that product information is correct', async () => {
        await productDetailsPage.header.cartBtn.click();
        await expect(cartPage.productContainerList.first()).toBeVisible();
        
        const isPresent = await page.locator('body').innerText();
        await expect(isPresent, `Expected product name "${productName}" to be present in the cart`).toContain(productName);
        await expect(isPresent, `Expected product price "${productPrice}" to be present in the cart`).toContain(productPrice);
    });

    await test.step('Click on Place Order button and verify that order form is displayed', async () => {
        await expect(cartPage.placeOrderBtn).toBeVisible();
        await cartPage.placeOrderBtn.click();
        await expect(cartPage.nameField).toBeVisible();
    });

    await test.step('Fill in the order form', async () => {
        await cartPage.nameField.fill('Carlos Rodriguez');
        await cartPage.countryField.fill('Uruguay');
        await cartPage.cityField.fill('Rivera');
        await cartPage.creditCardField.fill('1111 1111 1111 1111');
        await cartPage.monthField.fill('12');
        await cartPage.yearField.fill('2034');
    });

    await test.step('Click on Purchase button and verify order confirmation message', async () => {
        await cartPage.purchaseBtn.click();
        await expect(cartPage.orderConfirmationMessage).toBeVisible();
    });

});

