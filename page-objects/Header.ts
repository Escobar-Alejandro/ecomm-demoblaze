import { Page, Locator } from '@playwright/test';
import { BasePage } from '@poms';
import { Environment } from '@enums';

export default class Header extends BasePage {

    cartBtn: Locator;
    contactBtn: Locator;
    logInBtn: Locator;
    signUpBtn: Locator;

    readonly headerLocators = {
        cartBtn: {
            [Environment.Prod]: this.page.locator('a.nav-link', { hasText: /Cart/i }),
            [Environment.Staging]: 'new-locator-for-staging',
        },
        contactBtn: this.page.locator('a.nav-link', { hasText: /Contact/i }),
        logInBtn: this.page.locator('a.nav-link', { hasText: /Log in/i }),
        signUpBtn: this.page.locator('a.nav-link', { hasText: /Sign up/i }),
    };

    constructor(page: Page) {
        super(page);
        this.cartBtn = this.getLocator(this.headerLocators.cartBtn).describe('Cart Button');
        this.contactBtn = this.getLocator(this.headerLocators.contactBtn).describe('Contact Button');
        this.logInBtn = this.getLocator(this.headerLocators.logInBtn).describe('Log In Button');
        this.signUpBtn = this.getLocator(this.headerLocators.signUpBtn).describe('Sign Up Button');
    }

}