// tests/UI-pages/BoardPage.ts

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
export class BoardPage {
  readonly page: Page;

  // Locators
  readonly boardMenuHeading: Locator;
  readonly addNewTopicLink: Locator;   

  constructor(page: Page) {
    this.page = page;
  
    this.boardMenuHeading = page.getByTestId('board-heading');
    this.addNewTopicLink = page.getByTestId('new-topic-link');

  }

  async clickOnNewTopicLink(){
    await this.page.getByRole('link', { name: 'Start New Topic' }).click();
  }
}
