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
export class ThreadPage {
  readonly page: Page;

  // Locators
  readonly breadcrumb: Locator;
  

  constructor(page: Page) {
    this.page = page;
  
    this.breadcrumb = page.getByTestId('thread-breadcrumb');   
   

  }

  
}
