import { Page, Locator } from '@playwright/test';
import { BasePage, Header } from '@poms';
import { Environment } from '@enums';

export default class ProductDetailsPage extends BasePage {
    //Page declarations
    header: Header;
    productName: Locator;
    productPrice: Locator;
    addToCartBtn: Locator;

    readonly productDetailsPageLocators = {
        productName: {
            [Environment.Prod]: 'h2.name',
            [Environment.Staging]: 'new-locator-for-staging',
        },
        productPrice: this.page.locator('h3.price-container'),
        addToCartBtn: this.page.getByText(/Add to cart/i),
    };

    constructor(page: Page) {
        super(page);
        this.header = new Header(page);
        this.productName = this.getLocator(this.productDetailsPageLocators.productName).describe('Product Name');
        this.productPrice = this.getLocator(this.productDetailsPageLocators.productPrice).describe('Product Price');
        this.addToCartBtn = this.getLocator(this.productDetailsPageLocators.addToCartBtn).describe('Add to Cart Button');
    }

}