import { test as base } from '@playwright/test';
import { ProductListPage, CartPage, ProductDetailsPage, Header } from '@poms';

interface PageFixtures {
    productListPage: ProductListPage;
    cartPage: CartPage;
    productDetailsPage: ProductDetailsPage;
    header: Header;
}

const base2 = base.extend<PageFixtures>({
    productListPage: async ({ page }, use) => {
        await use(new ProductListPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    },
    header: async ({ page }, use) => {
        await use(new Header(page));
    }
});

export const test = base2;

