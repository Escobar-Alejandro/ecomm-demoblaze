import { test } from '../../fixtures/pageManager.fixture';

test('DEBL-1 | Place Order', async ({ page, productListPage }) => {

    await test.step('Navigate to the home page and click on the first product', async () => {
        await page.goto('https://www.demoblaze.com/');
        await productListPage.productTitleList.first().isVisible({ timeout: 10000 });
        await productListPage.productTitleList.first().click();
        await page.waitForTimeout(10000);
    });

});

