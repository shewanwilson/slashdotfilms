// tests/UI-pages/BoardMenuPage.ts

import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the Board Menu.
 *
 * Responsibilities:
 * - Select Board
 * - Navigation to boards, login/logout/, user profile, search bar, home icon
 *
 * No assertions live here.
 */
export class BoardMenuPage {
  readonly page: Page;

  // Locators
  readonly boardMenuHeader: Locator;
  readonly boardMenuUL: Locator;
  

  constructor(page: Page) {
    this.page = page;
  
    this.boardMenuHeader = page.getByTestId('board-menu-header');
    this.boardMenuUL = page.getByTestId('board-list');

  }

  async clickOnRandomMainBoard() {
    const links = this.page.getByRole('link');

    const count = await links.count();

    if (count === 0) {
      throw new Error('No boards available');
    }

    const randomIndex = Math.floor(Math.random() * count);

    const selected = links.nth(randomIndex);
    const boardName = (await selected.textContent())?.trim();

    await selected.click();

    return { boardName, index: randomIndex };
    }

async clickOnAutoTestBoard() {
  await this.page.getByRole('link', { name: 'Auto Test Board' }).click();
}
  
}
