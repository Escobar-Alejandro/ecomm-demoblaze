import { test } from '@fixtures/pageManager.fixture';
import { TIMEOUTS } from '@enums';
import { writeFile } from 'fs/promises';
import { mkdirSync, existsSync } from 'fs';


test('DEBL-1 | Retrieve and store product data from Product List Page',
    { tag: ['@DEBL-1', '@smoke', '@regression'] },
    async ({ productListPage, page }) => {
        
    const productDataArray: { name: string; price: number; link: string }[] = [];
    const outputDir = './output';
    if (!existsSync(outputDir)) mkdirSync(outputDir);

    await test.step('Navigate to Product List page', async () => {
        await productListPage.navigateTo();
        await productListPage.productNameList.first().waitFor({ state: 'visible', timeout: TIMEOUTS.Default });
    });

    await test.step('Store product data in a json, reading up to 5 pages', async () => {
        const outputFilePath = `${outputDir}/productData.json`;
        let finalPageReached = false;

        for (let pageNumber = 0; pageNumber < 5 || finalPageReached; pageNumber++){
            await productListPage.productPriceList.first().waitFor({ state: 'visible', timeout: TIMEOUTS.Default });

            await productListPage.fillProductDataArrayFromCurrentPage(productDataArray);

            try {
                if (await productListPage.tryWaitForElementToBeHidden(productListPage.nextPageBtn)) {
                    finalPageReached = true;
                    console.log('Final page reached. No more product data to retrieve.');
                    break;
                }
            } catch (e) {
                console.warn('Error while checking if next page button is hidden:', { cause: e });
            }

            await productListPage.nextPageBtn.scrollIntoViewIfNeeded();
            await productListPage.selectNextBtn();
            
            // Wait for the pagination request to complete before proceeding to the next iteration.
            // I usually prefer waiting for the visibility of an element or some other change, but in this case
            // since this page doesn't show much signs of loading I used this approach just this time.
            // I could also wait for the product list to be updated, compare names or something.
            // But waiting for the network response seemed easier and more reliable in this particular case
            // What do you think? Would love your feedback on this.
            // Thanks for reading, by the way. I appreciate it.
            await page.waitForResponse(response =>
                response.url().includes('/pagination') &&
                response.request().method() === 'POST' &&
                response.status() === 200
            );

        }
        await writeFile(outputFilePath, JSON.stringify(productDataArray, null, 2));
        console.log('Product Data Array:', productDataArray);
    });

});