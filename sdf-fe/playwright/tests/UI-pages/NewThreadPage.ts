// tests/UI-pages/NewThreadPage.ts

import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the Board.
 *
 * Responsibilities:
 * - Select Board
 * - Navigation to boards, login/logout/, user profile, search bar, home icon
 *
 * No assertions live here.
 */
export class NewThreadPage {
  readonly page: Page;

  // Locators
  readonly newThreadHeading: Locator;
  readonly newThreadTitle: Locator;
  readonly newThreadBody: Locator;
  readonly newThreadSubmitButton: Locator   

  constructor(page: Page) {
    this.page = page;
  
    this.newThreadHeading = page.getByTestId('new-thread-heading');
    this.newThreadTitle = page.getByTestId('new-thread-title');
    this.newThreadBody = page.getByTestId('new-thread-body');
    this.newThreadSubmitButton = page.getByTestId('new-thread-submit-button');

  }

  async clickOnPostThreadButton(){
    await this.newThreadSubmitButton.click();
  }
}
