// tests/UI-pages/LoginPage.ts

import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the Login route.
 *
 * Responsibilities:
 * - Navigate to /login
 * - Interact with login form
 *
 * No assertions live here.
 */
export class LoginPage {
  readonly page: Page;

  // Locators
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    this.page = page;

    /**
     * Use accessibility-first selectors.
     * Your DOM correctly wires <label for="...">,
     * so getByLabel() is ideal.
     */
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');

    this.submitButton = page.getByRole('button', { name: 'Log In' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
  }

  /**
   * Navigate to the login page.
   */
  async goto() {
    await this.page.goto('/login');
  }

  /**
   * Fill in credentials.
   */
  async fill(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  /**
   * Submit login form.
   */
  async submit() {
    await this.submitButton.click();
  }

  /**
   * Complete login flow.
   */
  async login(email: string, password: string) {
    await this.fill(email, password);
    await this.submit();
  }
}
