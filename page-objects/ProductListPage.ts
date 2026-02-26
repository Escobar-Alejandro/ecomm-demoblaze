import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';
import { Environment } from '@enums';

export default class ProductListPage extends BasePage {

    productTitleList: Locator;

    readonly productListPageLocators = {
        productTitleList: {
            [Environment.Prod]: 'invalid',
            [Environment.Staging]: '.card-title',
        },
    };

    constructor(page: Page) {
        super(page);
        this.productTitleList = this.getLocator(this.productListPageLocators.productTitleList);
    }

}