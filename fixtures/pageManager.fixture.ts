import { test as base } from '@playwright/test';
import { HomePage, CartPage, ProductDetailsPage, Header } from '@poms';

interface PageFixtures {
    homePage: HomePage;
    cartPage: CartPage;
    productDetailsPage: ProductDetailsPage;
    header: Header;
}

const base2 = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
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

