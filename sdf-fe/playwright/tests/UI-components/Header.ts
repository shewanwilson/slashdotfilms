// tests/ui/components/Header.ts

import { Page, Locator } from '@playwright/test';

/**
 * Component Object for the global Header.
 *
 * Exposes locators and actions only.
 * Does NOT contain assertions.
 */
export class Header {
  readonly page: Page;
  readonly root: Locator;
  readonly profileAvatar: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Scope to header root for safety
    this.root = page.locator('header.header');

    // Use accessible selectors where possible
    this.profileAvatar = this.root.getByAltText('Profile');
    this.logoutButton = this.root.getByRole('button', { name: 'Logout' });
  }

  async logout() {
    await this.logoutButton.click();
  }
}
