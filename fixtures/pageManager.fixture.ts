import { test as base } from '@playwright/test';
import { ProductListPage } from '@poms';

interface PageFixtures {
    productListPage: ProductListPage;
}

const base2 = base.extend<PageFixtures>({
    productListPage: async ({ page }, use) => {
        await use(new ProductListPage(page));
    }
});

export const test = base2;

