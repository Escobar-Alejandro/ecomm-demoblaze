import { test } from '@fixtures/pageManager.fixture';
import { TIMEOUTS } from '@enums';
import { writeFile } from 'fs/promises';
import { mkdirSync, existsSync } from 'fs';


test('DEBL-1 | Retrieve and store product data from Home page',
    { tag: ['@DEBL-1', '@smoke', '@regression'] },
    async ({ homePage, page }) => {
        
    const productDataArray: { name: string; price: number; link: string }[] = [];
    const outputDir = './output';
    if (!existsSync(outputDir)) mkdirSync(outputDir);

    await test.step('Navigate to Home page', async () => {
        await homePage.navigateTo();
        await homePage.productNameList.first().waitFor({ state: 'visible', timeout: TIMEOUTS.Default });
    });

    await test.step('Store product data in a json, reading up to 5 pages', async () => {
        const outputFilePath = `${outputDir}/productData.json`;
        let finalPageReached = false;

        for (let pageNumber = 0; pageNumber < 5 || finalPageReached; pageNumber++){
            await homePage.productPriceList.first().waitFor({ state: 'visible', timeout: TIMEOUTS.Default });

            await homePage.fillProductDataArrayFromCurrentPage(productDataArray);

            try {
                if (await homePage.tryWaitForElementToBeHidden(homePage.nextPageBtn)) {
                    finalPageReached = true;
                    console.log('Final page reached. No more product data to retrieve.');
                    break;
                }
            } catch (e) {
                console.warn('Error while checking if next page button is hidden:', { cause: e });
            }

            await homePage.nextPageBtn.scrollIntoViewIfNeeded();
            await homePage.selectNextBtn();
            
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